<template>
  <div class="flex h-full w-full flex-col items-center justify-start overflow-y-scroll">
    <div v-if="studentCurrentCourse && currentAssignment" class="flex h-full w-2/3 flex-col items-center justify-center gap-10">
      <Teleport to="body">
        <Transition name="menu-slide">
          <div v-if="assignmentInProgress" class="fixed left-0 top-0 z-50 flex h-dvh w-screen items-center justify-center bg-body">
            <StudentAssignmentSidebar :assignment="currentAssignment" :current-question-index="currentQuestionIndex" @close="assignmentInProgress = false" />
            <div class="mb-10 flex h-full w-full flex-col items-center justify-center overflow-y-auto px-24 py-12">
              <h2 class="mb-2 text-3xl font-semibold">Question {{ currentQuestionIndex + 1 }}</h2>
              <p class="overflow-y-auto text-neutral-100" v-html="currentQuestion?.question.text"></p>

              <!-- multiple choice selection -->
              <div v-if="currentQuestion?.question.answerType === 'Multiple Choice'" v-for="choice in currentQuestion?.question.answers" class="mt-4 flex w-full flex-col items-start space-y-3">
                <button
                  type="button"
                  class="w-full rounded-lg bg-neutral-200 px-6 py-3 text-left shadow-sm hover:bg-neutral-500/50 dark:bg-neutral-500/25 dark:hover:bg-neutral-500/50"
                  :class="{ 'bg-neutral-500/50 dark:bg-neutral-500/75': choice.selected }"
                  @click="selectChoice(choice)"
                  v-html="choice.text"
                ></button>
              </div>

              <!-- static assignment navigation -->
              <div v-if="currentAssignment.assignment.isStatic" class="mt-8 flex w-full items-center justify-between gap-6 px-10">
                <button
                  class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-16 py-2 text-xl hover:bg-neutral-200 dark:bg-neutral-600 hover:dark:bg-neutral-700"
                  type="button"
                  :disabled="currentQuestionIndex === 0"
                  :class="{ 'cursor-not-allowed opacity-50': currentQuestionIndex === 0 }"
                  @click="switchQuestion('previous')"
                >
                  <img class="size-5 group-hover:-translate-x-1" src="/ui/arrowLeft.svg" aria-hidden="true" />
                  Back
                </button>
                <button
                  class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-16 py-2 text-xl hover:bg-neutral-200 dark:bg-neutral-600 hover:dark:bg-neutral-700"
                  type="button"
                  :disabled="currentQuestionIndex === currentAssignment.assignment.numQuestions - 1"
                  :class="{ 'cursor-not-allowed opacity-50': currentQuestionIndex === currentAssignment.assignment.numQuestions - 1 }"
                  @click="switchQuestion('next')"
                >
                  Next
                  <img class="size-5 group-hover:translate-x-1" src="/ui/arrowRight.svg" aria-hidden="true" />
                </button>
              </div>

              <!-- dynamic assignments submit question button -->
              <div v-if="!currentAssignment.assignment.isStatic && !allQuestionsCompleted" class="" :class="{ 'du-tooltip': !selectedChoice }" data-tip="Complete all questions first!">
                <button
                  class="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-green-accent px-10 py-2 text-xl font-bold dark:text-white dark:hover:brightness-150"
                  type="button"
                  :disabled="!currentQuestion?.question.answers.some((answer) => answer.selected)"
                  :class="{ 'cursor-not-allowed grayscale': !currentQuestion?.question.answers.some((answer) => answer.selected) }"
                  @click="submitQuestion"
                >
                  Submit Question
                </button>
              </div>

              <!-- feedback messages -->
              <p v-if="feedbackMessage" class="group flex items-center justify-center gap-2 rounded-xl px-16 py-2 text-xl text-neutral-400">{{ feedbackMessage }}</p>
              <p v-if="errorMessage" class="group flex items-center justify-center gap-2 rounded-xl px-16 py-2 text-xl text-neutral-400">{{ errorMessage }}</p>
              <!-- all questions answered alert -->
              <div v-if="currentAssignment.assignment.numQuestions === currentAssignment.questionsCompleted" class="mb-6 w-full">
                <div class="flex items-center justify-center">
                  <p class="text-center text-lg font-medium text-black">All questions have been answered! You may now submit your assignment.</p>
                </div>
              </div>
            </div>
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

const feedbackMessage = ref("");
const errorMessage = ref("");

const selectedChoice = ref<Answer>();
let timestamp = Date.now();

const storedStaticAnswers = ref<Record<number, { selectedChoice: Answer }>>({});
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

const assignmentId = Number(route.params.assignmentId);
const currentAssignment = computed(() => studentCurrentCourse.value?.assignments.find((assignment) => assignment.id === assignmentId));

/**checks if all questions in assignment are completed */
const allQuestionsCompleted = computed(() => {
  if (!currentAssignment.value) return false;
  currentAssignment.value.assignment.numQuestions === currentAssignment.value.questionsCompleted + 1;
});

function selectChoice(choice: Answer) {
  if (!currentQuestion.value) return;
  currentQuestion.value?.question.answers.forEach((answer) => (answer.selected = false));
  choice.selected = true;
  selectedChoice.value = choice;
  currentQuestion.value.selectedAnswerId = choice.id;
  if (currentAssignment.value?.assignment.isStatic) {
    storedStaticAnswers.value[currentQuestionIndex.value] = {
      selectedChoice: { ...choice }
    };
  }
}

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

// increment time on index change. separate because immediate: true is not good for this
watch(currentQuestionIndex, async () => {
  if (!currentAssignment.value || !currentAssignment.value.assignment.isStatic || !currentQuestion.value) return;
  if (selectedChoice.value) {
    const { error } = await tryCatch(submitQuestionAnswer(currentQuestion.value.id, selectedChoice.value.id, getDeltaTime()));
    if (error) console.error(error);
  } else {
    incrementTime();
  }
});

watch(
  currentQuestionIndex,
  async () => {
    if (!currentAssignment.value) return;
    if (!currentAssignment.value.assignment.isStatic && currentQuestionIndex.value !== currentAssignment.value.questionsCompleted)
      return void changeRouteQuery({ q: currentAssignment.value.questionsCompleted + 1 });

    // load question
    let question = currentAssignment.value.assignment.questionInterfaces[currentQuestionIndex.value] as StaticQuestionInterface | DynamicQuestionInterface | undefined;
    if (!question) {
      const { data, error } = currentAssignment.value.assignment.isStatic
        ? await tryCatch(getNextStaticQuestion(currentAssignment.value.id, currentQuestionIndex.value + 1))
        : await tryCatch(getNextDynamicQuestion(currentAssignment.value.id));

      if (error) {
        console.error(error);
        errorMessage.value = "Error fetching question. Please try again.";
      } else {
        question = data;
        currentAssignment.value.assignment.questionInterfaces[currentQuestionIndex.value] = data;
      }
    }

    console.log(currentAssignment.value.assignment.questionInterfaces);

    // highlight selected answer
    currentQuestion.value = question;

    if (currentAssignment.value.assignment.isStatic) {
      const cachedAnswer = storedStaticAnswers.value[currentQuestionIndex.value];
      if (cachedAnswer && question) {
        question.selectedAnswerId = cachedAnswer.selectedChoice.id;
        question.question.answers.forEach((answer) => {
          answer.selected = answer.id === cachedAnswer.selectedChoice.id;
        });
        selectedChoice.value = question.question.answers.find((answer) => answer.id === cachedAnswer.selectedChoice.id);
      } else {
        selectedChoice.value = undefined;
      }
    }
  },
  { immediate: true }
);

async function switchQuestion(direction: "previous" | "next") {
  if (!currentAssignment.value) return;
  const newIndex = direction === "previous" ? currentQuestionIndex.value - 1 : currentQuestionIndex.value + 1;
  if (newIndex >= 0 && newIndex < currentAssignment.value.assignment.numQuestions) await changeRouteQuery({ q: newIndex + 1 });
}

async function submitQuestion() {
  if (!selectedChoice.value || !currentQuestion.value) return;

  const { data: response, error } = await tryCatch(submitQuestionAnswer(currentQuestion.value.id, selectedChoice.value.id, getDeltaTime()));
  if (error) return console.error("Error submitting question:", error);

  if (response.isCorrect) feedbackMessage.value = "Previous question correct! 🎉";
  else if (response.remainingAttempts === 0) feedbackMessage.value = "You've exceeded the maximum amount of attempts on the previous question. It has been marked incorrect.";
  else if (!response.remainingAttempts) feedbackMessage.value = `Incorrect. Try again!`;
  else feedbackMessage.value = `Incorrect. You have ${response.remainingAttempts} attempts left.`;

  if (response.isCorrect || response.remainingAttempts === 0) await switchQuestion("next");
}

onBeforeMount(() => {
  if (!route.query.q) void changeRouteQuery({ q: 1 });
});

function warnForUnsavedChanges(event: BeforeUnloadEvent) {
  event.preventDefault();
  // TODO: add api call to save progress
}

function handleVisibilityTime() {
  // tab just got hidden. increment time
  if (document.visibilityState === "hidden") incrementTime();
  // tab just got brought to foreground. don't count the time it was gone
  else timestamp = Date.now();
}

onMounted(() => {
  assignmentInProgress.value = true;
  window.addEventListener("beforeunload", warnForUnsavedChanges);
  window.addEventListener("visibilitychange", handleVisibilityTime);
});

// for navigating off but keeping page open
onBeforeUnmount(incrementTime);

onUnmounted(() => {
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
