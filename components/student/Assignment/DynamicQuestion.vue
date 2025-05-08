<template>
  <div class="mb-10 flex h-full w-full flex-col items-center justify-center overflow-y-auto px-24 py-12">
    <p v-if="currentAssignment.assignment.attemptsAllowed !== 0" class="w-full text-right">Attempt {{ currentAttempt }} out of {{ currentAssignment.assignment.attemptsAllowed }}</p>

    <h2 class="mb-8 text-3xl font-semibold">Question {{ currentQuestionIndex + 1 }}</h2>
    <p class="answer-choice mb-3 overflow-y-auto text-neutral-100" v-html="currentQuestion?.question.text"></p>

    <div class="relative flex w-full flex-col">
      <!-- multiple choice selection -->
      <div v-if="currentQuestion?.question.answerType === 'Multiple Choice'" v-for="choice in currentQuestion?.question.answers" class="mt-4 flex w-full flex-col items-start space-y-3">
        <button
          type="button"
          class="w-full rounded-lg bg-neutral-200 px-6 py-3 text-left shadow-sm hover:bg-neutral-500/50 dark:bg-neutral-500/25 dark:hover:bg-neutral-500/50"
          :class="{
            'bg-neutral-500/50 dark:bg-neutral-500/75': choice.selected && choice.isCorrect === undefined,
            'bg-green-500/50 dark:bg-green-500/75': choice.isCorrect,
            'bg-red-500/50 dark:bg-red-500/75': choice.isCorrect === false
          }"
          @click="selectChoice(choice)"
          v-html="choice.text"
        ></button>
      </div>

      <!-- dynamic assignments submit question button -->
      <div class="mt-8 flex w-full items-center justify-between gap-6 px-10">
        <button
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-accent px-10 py-2 text-xl font-bold dark:bg-green-600 dark:text-white"
          type="button"
          :disabled="mode !== 'answering' || !currentQuestion?.question.answers.some((answer) => answer.selected)"
          :class="
            mode !== 'answering' || !currentQuestion?.question.answers.some((answer) => answer.selected)
              ? 'cursor-not-allowed opacity-50 brightness-75 grayscale'
              : 'hover:brightness-110 dark:hover:bg-green-700'
          "
          @click="submitQuestion"
        >
          Submit Question
        </button>

        <button
          class="flex items-center justify-center gap-2 rounded-xl bg-green-accent px-8 py-2 sm:px-16 dark:bg-green-600"
          type="button"
          :disabled="mode !== 'viewing' || currentQuestionIndex === currentAssignment.assignment.numQuestions - 1"
          :class="
            mode !== 'viewing' || currentQuestionIndex === currentAssignment.assignment.numQuestions - 1
              ? 'cursor-not-allowed opacity-50 brightness-75 grayscale'
              : 'group hover:brightness-110 hover:dark:bg-green-700'
          "
          @click="nextQuestion"
        >
          <span class="hidden text-xl xs:block">Next</span>
          <img class="size-5 shrink-0 group-hover:translate-x-1 dark:invert" src="/ui/arrowRight.svg" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- all questions answered alert -->
    <div v-if="currentAssignment.assignment.numQuestions === currentAssignment.questionsCompleted" class="mb-6 w-full">
      <div class="flex items-center justify-center">
        <p class="text-center text-lg font-medium text-black">All questions have been answered! You may now submit your assignment.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentAssignment: StudentAssignment;
  currentQuestionIndex: number;
  timestamp: number;
}>();
const emit = defineEmits<{
  changeTimestamp: [number];
  goNextQuestion: [void];
  submitAssignment: [void];
}>();

const userStore = useUserStore();
const { currentQuestion } = storeToRefs(userStore);

const currentAttempt = ref(1);
const selectedChoice = defineModel<Answer>();
/** viewing mode is when the student is done with the question (used all attempts or got it correct) and needs to move on */
const mode = ref<"answering" | "viewing">("answering");

function nextQuestion() {
  mode.value = "answering";
  emit("goNextQuestion");
}

function selectChoice(choice: Answer) {
  if (!currentQuestion.value) return;
  if (choice.selected) choice.selected = false;
  else {
    currentQuestion.value?.question.answers.forEach((answer) => (answer.selected = false));
    choice.selected = true;
  }
  selectedChoice.value = choice;
}

async function submitQuestion() {
  if (!selectedChoice.value || !currentQuestion.value) return;

  const [newTimestamp, diff] = getDeltaTime(props.timestamp);
  emit("changeTimestamp", newTimestamp);

  const { data: response, error } = await tryCatch(submitQuestionAnswer(currentQuestion.value.id, selectedChoice.value.id, diff));
  if (error) return console.error("Error submitting question:", error);

  currentQuestion.value.question.answers.forEach((answer) => (answer.selected = false));

  if (response.isCorrect || response.remainingAttempts === 0) {
    selectedChoice.value.isCorrect = response.isCorrect; // if isCorrect is false then remainingAttempts must be 0 so it should be false anyways
    props.currentAssignment.questionsCompleted += 1;
    mode.value = "viewing";
    if (props.currentQuestionIndex === props.currentAssignment.assignment.numQuestions - 1) emit("submitAssignment");
    return;
  }

  if (response.remainingAttempts !== null) currentAttempt.value = props.currentAssignment.assignment.attemptsAllowed - response.remainingAttempts + 1;
  selectedChoice.value.isCorrect = false;
}

watch(
  () => props.currentQuestionIndex,
  async () => {
    if (!props.currentAssignment) return;
    if (props.currentQuestionIndex !== props.currentAssignment.questionsCompleted) return void changeRouteQuery({ q: props.currentAssignment.questionsCompleted + 1 });

    // load question
    let question = props.currentAssignment.assignment.questionInterfaces[props.currentQuestionIndex] as DynamicQuestionInterface | undefined;
    if (!question) {
      const { data, error } = await tryCatch(getNextDynamicQuestion(props.currentAssignment.id));

      if (error) return console.error(error);

      data.question.answers.forEach((answer) => (answer.selected = false));
      question = data;
      props.currentAssignment.assignment.questionInterfaces[props.currentQuestionIndex] = data;
    }

    currentQuestion.value = question;
  },
  { immediate: true }
);
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20dvh);
}

.answer-choice img {
  @apply dark:invert;
}
</style>
