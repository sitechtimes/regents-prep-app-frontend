<template>
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
    <div class="mt-8 flex w-full items-center justify-between gap-6 px-10">
      <button
        class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-16 py-2 text-xl hover:bg-neutral-200 dark:bg-neutral-600 hover:dark:bg-neutral-700"
        type="button"
        :disabled="currentQuestionIndex === 0"
        :class="{ 'cursor-not-allowed opacity-50': currentQuestionIndex === 0 }"
        @click="emit('switchQuestion', 'previous')"
      >
        <img class="size-5 group-hover:-translate-x-1" src="/ui/arrowLeft.svg" aria-hidden="true" />
        Back
      </button>
      <button
        class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-16 py-2 text-xl hover:bg-neutral-200 dark:bg-neutral-600 hover:dark:bg-neutral-700"
        type="button"
        :disabled="currentQuestionIndex === currentAssignment.assignment.numQuestions - 1"
        :class="{ 'cursor-not-allowed opacity-50': currentQuestionIndex === currentAssignment.assignment.numQuestions - 1 }"
        @click="emit('switchQuestion', 'next')"
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
        @click="emit('submitQuestion')"
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
</template>

<script setup lang="ts">
const props = defineProps<{
  currentAssignment: StudentAssignment;
  currentQuestion: StaticQuestionInterface | undefined;
  currentQuestionIndex: number;
  allQuestionsCompleted: boolean | undefined;
  selectedChoice: Answer | undefined;
}>();
const emit = defineEmits<{
  changeCurrentQuestion: [StaticQuestionInterface];
  submitQuestion: [void];
  selectChoice: [Answer | undefined];
  switchQuestion: ["previous" | "next"];
}>();

const storedStaticAnswers = ref<Record<number, { selectedChoice: Answer }>>({});

const feedbackMessage = ref("");
const errorMessage = ref("");

function selectChoice(choice: Answer) {
  if (!props.currentQuestion) return;
  if (choice.selected) choice.selected = false;
  else {
    props.currentQuestion?.question.answers.forEach((answer) => (answer.selected = false));
    choice.selected = true;
  }
  emit("selectChoice", choice);
  props.currentQuestion.staticUserAnswer = choice.id;
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
      emit(
        "selectChoice",
        question.question.answers.find((answer) => answer.id === cachedAnswer.selectedChoice.id)
      );
    } else {
      emit("selectChoice", undefined);
    }
  }
);
</script>

<style scoped></style>
