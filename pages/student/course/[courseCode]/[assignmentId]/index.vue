<template>
  <div class="flex h-full w-full flex-col items-center justify-start overflow-y-scroll">
    <div v-if="studentCurrentCourse && currentAssignment" class="flex h-full w-2/3 flex-col items-center justify-center gap-10">
      <Teleport to="body">
        <Transition name="menu-slide">
          <div v-if="assignmentInProgress" class="fixed left-0 top-0 z-50 flex h-dvh w-screen items-center justify-center bg-body">
            <StudentAssignmentSidebar :assignment="currentAssignment" :current-question-index="currentQuestionIndex" @close="assignmentInProgress = false" />

            <StudentAssignmentStaticQuestion
              v-if="currentAssignment.assignment.isStatic && currentQuestion && 'staticUserAnswer' in currentQuestion"
              :current-assignment="currentAssignment"
              :current-question="currentQuestion"
              :current-question-index="currentQuestionIndex"
              :all-questions-completed="allQuestionsCompleted"
              :selected-choice="selectedChoice"
              @change-current-question="(question) => (currentQuestion = question)"
              @submit-question="submitQuestion"
              @switch-question="(direction) => switchQuestion(direction)"
              @select-choice="(choice) => (selectedChoice = choice)"
            />
            <StudentAssignmentDynamicQuestion
              v-else-if="!currentAssignment.assignment.isStatic && currentQuestion && !('staticUserAnswer' in currentQuestion)"
              :current-assignment="currentAssignment"
              :current-question="currentQuestion"
              :current-question-index="currentQuestionIndex"
              @submit-question="submitQuestion"
              @select-choice="(choice) => (selectedChoice = choice)"
            />
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "student-get-course"
});

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { studentCurrentCourse, currentQuestion } = storeToRefs(userStore);

const assignmentId = Number(route.params.assignmentId);
const currentAssignment = computed(() => studentCurrentCourse.value?.assignments.find((assignment) => assignment.id === assignmentId));

/**checks if all questions in assignment are completed */
const allQuestionsCompleted = computed(() => currentAssignment.value && currentAssignment.value.assignment.numQuestions === currentAssignment.value.questionsCompleted + 1);

const assignmentInProgress = ref(false);
watch(assignmentInProgress, (val) => {
  if (!val) setTimeout(() => void router.push(`/student/course/${studentCurrentCourse.value?.id}`), 200);
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

  console.log(currentAssignment.value);
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
let timestamp = Date.now();
/**
 * gets time spent on current question
 * @returns how many seconds since last update
 */
function getDeltaTime() {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  timestamp = Date.now();
  return diff;
}

/** increments time spent on current question */
function incrementTime() {
  if (!currentQuestion.value) return;
  void incrementQuestionTime(currentQuestion.value.id, getDeltaTime());
}

async function saveProgress() {
  if (!currentAssignment.value || !currentAssignment.value.assignment.isStatic || !currentQuestion.value) return;
  if (selectedChoice.value) {
    const { error } = await tryCatch(submitQuestionAnswer(currentQuestion.value.id, selectedChoice.value.id, getDeltaTime()));
    if (error) console.error(error);
  } else {
    incrementTime();
  }
}
// increment time on index change. separate because immediate: true is not good for this
watch(currentQuestionIndex, async () => {
  if (!currentAssignment.value || !currentAssignment.value.assignment.isStatic || !currentQuestion.value) return;
  await saveProgress();
});

async function switchQuestion(direction: "previous" | "next") {
  if (!currentAssignment.value) return;
  const newIndex = direction === "previous" ? currentQuestionIndex.value - 1 : currentQuestionIndex.value + 1;
  if (newIndex >= 0 && newIndex < currentAssignment.value.assignment.numQuestions) await changeRouteQuery({ q: newIndex + 1 });
}

async function submitQuestion() {
  if (!selectedChoice.value || !currentQuestion.value) return;

  const { error } = await tryCatch(submitQuestionAnswer(currentQuestion.value.id, selectedChoice.value.id, getDeltaTime()));
  if (error) return console.error("Error submitting question:", error);

  // if (response.isCorrect) feedbackMessage.value = "Previous question correct! 🎉";
  // else if (response.remainingAttempts === 0) feedbackMessage.value = "You've exceeded the maximum amount of attempts on the previous question. It has been marked incorrect.";
  // else if (!response.remainingAttempts) feedbackMessage.value = `Incorrect. Try again!`;
  // else feedbackMessage.value = `Incorrect. You have ${response.remainingAttempts} attempts left.`;
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
  else timestamp = Date.now();
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
