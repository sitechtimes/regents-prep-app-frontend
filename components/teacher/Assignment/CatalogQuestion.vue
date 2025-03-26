<template>
  <div
    class="group flex w-[45%] max-w-[50%] grow flex-col items-center justify-around gap-5 place-self-stretch rounded-xl border border-neutral-300 bg-neutral-100 p-6 dark:border-neutral-600 dark:bg-neutral-600/50"
  >
    <div class="flex w-full items-center justify-start gap-2">
      <TeacherAssignmentCatalogQuestionButton
        v-if="!viewOnly"
        :click-function="emitSelect"
        :img="`/ui/${isInAssignment ? 'minus' : 'plus'}.svg`"
        :text="`${isInAssignment ? 'Remove from' : 'Add to'} assignment`"
      />
      <div :class="{ 'du-tooltip': showAnswerOverride }" data-tip="Hide all questions first!">
        <TeacherAssignmentCatalogQuestionButton
          :click-function="toggleAnswer"
          :disable="showAnswerOverride"
          :img="`/ui/${showAnswer ? 'eyeHide' : 'eyeShow'}.svg`"
          :text="`${showAnswer ? 'Hide' : 'Show'} Answer`"
        />
      </div>
    </div>

    <span class="question-text space-y-3 text-neutral-100" v-html="question?.text"></span>

    <!-- answer choices -->
    <div class="items-left flex flex-wrap justify-center gap-2">
      <div
        v-if="question?.answerType === 'Multiple Choice'"
        v-for="choice in question?.answers"
        class="rounded-lg px-6 py-2 shadow-sm"
        :class="(showAnswerOverride || showAnswer) && choice.isCorrect ? 'bg-green-500' : 'bg-neutral-300 dark:bg-neutral-900'"
        v-html="choice.text"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  viewOnly: boolean;
  question: TopicQuestionInterface;
  showAnswerOverride: boolean;
  currentQuestions: CreateAssignmentQuestion[];
}>();
const emit = defineEmits<{ select: [void] }>();

const showAnswer = ref(false);
const isInAssignment = computed(() => props.currentQuestions.find((_question) => props.question.id === _question.questionId));

// * these are better for performance probably
// if these werent used then we would need to do `() => emit('select')` in the `@click-function`,
// which would make a new function for each component instance i think (which is bad)
function emitSelect() {
  emit("select");
}
function toggleAnswer() {
  showAnswer.value = !showAnswer.value;
}
</script>

<style scoped></style>
