<template>
  <div class="mb-10 flex h-full max-h-[80lvh] w-full flex-col items-center justify-center overflow-y-auto px-6 xs:px-24 xs:py-12 sm:max-h-fit">
    <h2 class="mb-8 text-3xl font-semibold">Question {{ currentQuestionIndex + 1 }}</h2>
    <p class="answer-choice overflow-y-auto text-neutral-100" v-html="currentQuestion?.question.text"></p>

    <!-- multiple choice selection -->
    <div v-if="currentQuestion?.question.answerType === 'Multiple Choice'" v-for="choice in currentQuestion?.question.answers" class="mt-4 flex w-full flex-col items-start space-y-3">
      <button
        type="button"
        class="w-full rounded-lg bg-neutral-200 px-2 py-1 text-left shadow-sm hover:bg-neutral-500/50 sm:px-6 sm:py-3 dark:bg-neutral-500/25 dark:hover:bg-neutral-500/50"
        :class="{ 'bg-neutral-500/50 dark:bg-neutral-500/75': choice.selected }"
        @click="selectChoice(choice)"
        v-html="choice.text"
      ></button>
    </div>

    <!-- static assignment navigation -->
    <div class="mt-8 flex w-full items-center justify-between gap-1 px-3 xs:gap-6 xs:px-10">
      <button
        class="flex items-center justify-center gap-2 rounded-xl bg-green-accent px-8 py-2 sm:px-16 dark:bg-green-600"
        type="button"
        :disabled="currentQuestionIndex === 0"
        :class="currentQuestionIndex === 0 ? 'cursor-not-allowed opacity-50 brightness-75 grayscale' : 'group hover:brightness-110 hover:dark:bg-green-700'"
        @click="emit('switchQuestion', 'previous')"
      >
        <img class="size-5 group-hover:-translate-x-1 dark:invert" src="/ui/arrow-left.svg" aria-hidden="true" />
        <span class="hidden translate-y-px text-xl xs:block">Back</span>
      </button>
      <button
        class="flex items-center justify-center gap-2 rounded-xl bg-green-accent px-8 py-2 sm:px-16 dark:bg-green-600"
        type="button"
        :disabled="currentQuestionIndex === currentAssignment.assignment.numQuestions - 1"
        :class="currentQuestionIndex === currentAssignment.assignment.numQuestions - 1 ? 'cursor-not-allowed opacity-50 brightness-75 grayscale' : 'group hover:brightness-110 hover:dark:bg-green-700'"
        @click="emit('switchQuestion', 'next')"
      >
        <span class="hidden translate-y-px text-xl xs:block">Next</span>
        <img class="size-5 group-hover:translate-x-1 dark:invert" src="/ui/arrow-right.svg" aria-hidden="true" />
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
</template>

<script setup lang="ts">
const props = defineProps<{
  currentAssignment: StudentAssignment;
  currentQuestionIndex: number;
}>();
const emit = defineEmits<{
  changeCurrentQuestion: [StaticQuestionInterface];
  switchQuestion: ["previous" | "next"];
}>();

const userStore = useUserStore();
const { currentQuestion } = storeToRefs(userStore);

const storedStaticAnswers = ref<Record<number, { selectedChoice: Answer }>>({});
const selectedChoice = defineModel<Answer>();

const feedbackMessage = ref("");
const errorMessage = ref("");

function selectChoice(choice: Answer) {
  if (!currentQuestion.value) return;
  if (choice.selected) choice.selected = false;
  else {
    currentQuestion.value?.question.answers.forEach((answer) => (answer.selected = false));
    choice.selected = true;
  }
  selectedChoice.value = choice;
  (currentQuestion.value as StaticQuestionInterface).staticUserAnswer = choice.id;
  storedStaticAnswers.value[props.currentQuestionIndex] = {
    selectedChoice: { ...choice }
  };
}

async function getQuestionByIndex(index: number) {
  if (!props.currentAssignment) return;

  // load question
  let question = props.currentAssignment.assignment.questionInterfaces[index] as StaticQuestionInterface | undefined;
  if (!question) {
    const { data, error } = await tryCatch(getNextStaticQuestion(props.currentAssignment.id, index + 1));

    if (error) {
      console.error(error);
      errorMessage.value = "Error fetching question. Please try again.";
    } else {
      data.question.answers.forEach((answer) => (answer.selected = answer.id === (data.staticUserAnswer ?? false)));
      question = data;
      props.currentAssignment.assignment.questionInterfaces[index] = data;
    }
  }

  return question;
}

watch(
  () => props.currentQuestionIndex,
  async () => {
    if (!props.currentAssignment) return;

    const questionIndicesToGet = Array.from(
      new Set([
        props.currentQuestionIndex, // current
        props.currentQuestionIndex - 1 > 0 ? props.currentQuestionIndex - 1 : 0, // before
        props.currentQuestionIndex + 1 < props.currentAssignment.assignment.numQuestions ? props.currentQuestionIndex + 1 : props.currentAssignment.assignment.numQuestions - 1 // next
      ])
    );

    const question = await questionIndicesToGet.map(async (index) => getQuestionByIndex(index))[0];

    if (question) emit("changeCurrentQuestion", question);

    const cachedAnswer = storedStaticAnswers.value[props.currentQuestionIndex];
    if (cachedAnswer && question) {
      question.question.answers.forEach((answer) => (answer.selected = answer.id === cachedAnswer.selectedChoice.id));
      selectedChoice.value = question.question.answers.find((answer) => answer.id === cachedAnswer.selectedChoice.id);
    } else selectedChoice.value = undefined;
  }
);
</script>

<style scoped>
.answer-choice img {
  @apply dark:invert;
}
</style>
