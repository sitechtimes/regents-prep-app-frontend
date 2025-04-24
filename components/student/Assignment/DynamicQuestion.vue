<template>
  <div class="mb-10 flex h-full w-full flex-col items-center justify-center overflow-y-auto px-24 py-12">
    <h2 class="mb-2 text-3xl font-semibold">Question {{ currentQuestionIndex + 1 }}</h2>
    <p class="overflow-y-auto text-neutral-100" v-html="currentQuestion?.question.text"></p>

    <div class="relative flex w-full flex-col">
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

      <!-- dynamic assignments submit question button -->
      <Transition name="slide-up">
        <button
          v-show="currentQuestion?.question.answers.some((answer) => answer.selected)"
          class="absolute -bottom-20 flex w-full items-center justify-center gap-2 rounded-lg bg-green-accent px-10 py-2 text-xl font-bold dark:text-white dark:hover:brightness-150"
          type="button"
          :disabled="!currentQuestion?.question.answers.some((answer) => answer.selected)"
          :class="{ 'cursor-not-allowed grayscale': !currentQuestion?.question.answers.some((answer) => answer.selected) }"
          @click="emit('submitQuestion')"
        >
          Submit Question
        </button>
      </Transition>
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
  currentQuestion: DynamicQuestionInterface | undefined;
  currentQuestionIndex: number;
}>();
const emit = defineEmits<{
  submitQuestion: [void];
  selectChoice: [Answer | undefined];
}>();

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

      if (error) {
        console.error(error);
        errorMessage.value = "Error fetching question. Please try again.";
      } else {
        data.question.answers.forEach((answer) => (answer.selected = false));
        question = data;
        props.currentAssignment.assignment.questionInterfaces[props.currentQuestionIndex] = data;
      }
    }
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
</style>
