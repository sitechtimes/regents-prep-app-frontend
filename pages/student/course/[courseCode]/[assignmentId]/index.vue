<template>
  <div v-if="studentCurrentCourse && currentAssignment && assignmentInProgress" class="flex h-dvh w-full items-center justify-start gap-10 overflow-y-scroll">
    <StudentAssignmentSidebar
      :assignment="currentAssignment"
      :current-question-index="currentQuestionIndex"
      :trigger-submit="triggerSubmit"
      :is-saved="isSaved"
      @close="assignmentInProgress = false"
      @submitted="saveProgress"
    />

    <div class="fixed right-0 top-4 flex items-center justify-center gap-4 pr-10">
      <ToggleTheme />
    </div>

    <div class="grow xl:px-20 2xl:px-36">
      <StudentAssignmentStaticQuestion
        v-if="currentAssignment.assignment.isStatic && currentQuestion && 'staticUserAnswer' in currentQuestion"
        v-model="selectedChoice"
        :current-assignment="currentAssignment"
        :current-question-index="currentQuestionIndex"
        @change-current-question="(question) => (currentQuestion = question)"
        @switch-question="(direction) => switchQuestion(direction)"
      />
      <StudentAssignmentDynamicQuestion
        v-else-if="!currentAssignment.assignment.isStatic && currentQuestion && !('staticUserAnswer' in currentQuestion)"
        v-model="selectedChoice"
        :current-assignment="currentAssignment"
        :current-question-index="currentQuestionIndex"
        :timestamp="timestamp"
        @change-timestamp="(newTimestamp) => (timestamp = newTimestamp)"
        @go-next-question="switchQuestion('next')"
        @submit-assignment="triggerSubmit = true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "student-get-course",
  requiresAuth: true,
  redirectIfAuth: false
});

const route = useRoute();
const router = useRouter();

const triggerSubmit = ref(false);
watch(triggerSubmit, async (val) => {
  if (val) {
    await nextTick();
    triggerSubmit.value = false;
  }
});

const userStore = useUserStore();
const { studentCurrentCourse, currentQuestion } = storeToRefs(userStore);
onBeforeMount(() => (currentQuestion.value = undefined));

const assignmentId = Number(route.params.assignmentId);
const currentAssignment = computed(() => studentCurrentCourse.value?.assignments.find((assignment) => assignment.id === assignmentId));

useSeoMeta({
  title: () => `${studentCurrentCourse.value?.name ?? "Class Details"} - ${currentAssignment.value?.assignment.name ?? "Assignment"}`
});

const assignmentInProgress = ref(false);
watch(assignmentInProgress, (val) => {
  if (!val) void router.push(`/student/course/${studentCurrentCourse.value?.id}`);
});

let lastQuestionIndex = 0;
const currentQuestionIndex = computed(() => {
  const query = Math.max(0, Number(route.query.q) - 1);
  const index = Number.isNaN(query) ? lastQuestionIndex : query;
  lastQuestionIndex = index;
  return index;
});

async function getQuestionByIndex(index: number) {
  if (!currentAssignment.value) return;

  // load question
  let question = currentAssignment.value.assignment.questionInterfaces[index] as StaticQuestionInterface | DynamicQuestionInterface | undefined;
  if (!question) {
    const { data, error } = currentAssignment.value.assignment.isStatic
      ? await tryCatch(getNextStaticQuestion(currentAssignment.value.id, index + 1))
      : await tryCatch(getNextDynamicQuestion(currentAssignment.value.id));
    if (error) return;

    data.question.answers.forEach((answer) => (answer.selected = answer.id === ("staticUserAnswer" in data && data.staticUserAnswer ? data.staticUserAnswer : false)));
    question = data;
    currentAssignment.value.assignment.questionInterfaces[index] = data;
  }

  return question;
}

async function fetchQuestionOnMounted() {
  if (!currentAssignment.value) return;

  if (!currentAssignment.value.assignment.isStatic && currentQuestionIndex.value !== currentAssignment.value.questionsCompleted) {
    await changeRouteQuery({ q: currentAssignment.value.questionsCompleted + 1 });
    return void fetchQuestionOnMounted();
  }

  const questionIndicesToGet = Array.from(
    new Set([
      currentQuestionIndex.value, // current
      currentQuestionIndex.value - 1 > 0 ? currentQuestionIndex.value - 1 : 0, // before
      currentQuestionIndex.value + 1 < currentAssignment.value.assignment.numQuestions ? currentQuestionIndex.value + 1 : currentAssignment.value.assignment.numQuestions - 1 // next
    ])
  );

  const question = currentAssignment.value.assignment.isStatic ? await questionIndicesToGet.map(async (index) => getQuestionByIndex(index))[0] : await getQuestionByIndex(currentQuestionIndex.value);

  if (question) currentQuestion.value = question;
}
onMounted(fetchQuestionOnMounted);

const selectedChoice = ref<Answer>();
const timestamp = ref(Date.now());

/** increments time spent on current question */
function incrementTime() {
  if (!currentQuestion.value) return;

  const [newTimestamp, diff] = getDeltaTime(timestamp.value);
  timestamp.value = newTimestamp;

  if (diff < 1) return;
  void tryRequestEndpoint(`courses/student/increment-question-time/${currentQuestion.value.id}/${diff}/`, "POST");
}

/** for sidebar submit */
const isSaved = ref(false);
watch(isSaved, async (val) => {
  await nextTick();
  if (val) isSaved.value = false;
});
async function saveProgress() {
  if (!currentAssignment.value || !currentAssignment.value.assignment.isStatic || !currentQuestion.value) return;
  if (selectedChoice.value) {
    const [newTimestamp, diff] = getDeltaTime(timestamp.value);
    timestamp.value = newTimestamp;

    const { error } = await tryCatch(submitQuestionAnswer(currentQuestion.value.id, selectedChoice.value.id, diff));
    if (error) console.error(error);
    isSaved.value = true;
    console.log(isSaved.value);
  } else {
    incrementTime();
    isSaved.value = true;
  }
}
// increment time on index change
watch(currentQuestionIndex, async () => {
  if (!currentAssignment.value || !currentAssignment.value.assignment.isStatic || !currentQuestion.value) return;
  await saveProgress();
});

async function switchQuestion(direction: "previous" | "next") {
  if (!currentAssignment.value) return;
  const newIndex = direction === "previous" ? currentQuestionIndex.value - 1 : currentQuestionIndex.value + 1;
  if (newIndex >= 0 && newIndex < currentAssignment.value.assignment.numQuestions) await changeRouteQuery({ q: newIndex + 1 });
}

onBeforeMount(() => {
  if (!route.query.q) void changeRouteQuery({ q: 1 });
});

function warnForUnsavedChanges(event: BeforeUnloadEvent) {
  event.preventDefault();
  void saveProgress();
}

function handleVisibilityTime() {
  // tab just got hidden. increment time
  if (document.visibilityState === "hidden") incrementTime();
  // tab just got brought to foreground. don't count the time it was gone
  else timestamp.value = Date.now();
}

let unguardRoute: () => void;
onMounted(() => {
  unguardRoute = router.beforeEach(() => void saveProgress());
  assignmentInProgress.value = true;
  window.addEventListener("beforeunload", warnForUnsavedChanges);
  window.addEventListener("visibilitychange", handleVisibilityTime);
});

// for navigating off but keeping page open
onBeforeUnmount(incrementTime);

onUnmounted(() => currentQuestion.value?.question.answers.forEach((answer) => (answer.selected = false)));

onUnmounted(() => {
  unguardRoute();
  window.removeEventListener("visibilitychange", handleVisibilityTime);
  window.removeEventListener("beforeunload", warnForUnsavedChanges);
});
</script>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.2s ease-in-out;
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(5rem);
}
</style>
