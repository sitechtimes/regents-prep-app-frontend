<template>
  <div class="group flex w-[45%] max-w-[50%] grow flex-col items-center justify-around gap-6 self-baseline rounded-xl bg-neutral-100 p-6">
    <div class="flex w-full items-center justify-start gap-3">
      <TeacherAssignmentCatalogQuestionButton
        v-if="!viewOnly"
        :click-function="() => emit('select')"
        :img="`/ui/${isInAssignment ? 'minus' : 'plus'}.svg`"
        :text="`${isInAssignment ? 'Remove from' : 'Add to'} assignment`"
      />
      <div :class="{ 'du-tooltip': showAnswerOverride }" data-tip="Hide all questions first!">
        <TeacherAssignmentCatalogQuestionButton
          :click-function="() => (showAnswer = !showAnswer)"
          :disable="showAnswerOverride"
          :img="`/ui/${showAnswer ? 'eyeHide' : 'eyeShow'}.svg`"
          :text="`${showAnswer ? 'Hide' : 'Show'} Answer`"
        />
      </div>
    </div>

    <span class="question-text space-y-3 text-neutral-100" v-html="question?.text"></span>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <div
        v-if="question?.answerType === 'Multiple Choice'"
        v-for="choice in question?.answers"
        class="text-nowrap rounded-lg px-6 py-2 shadow-sm"
        :class="(showAnswerOverride || showAnswer) && choice.isCorrect ? 'bg-green-400' : 'bg-neutral-200'"
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
</script>

<style scoped></style>
