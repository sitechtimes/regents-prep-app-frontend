<template>
  <div
    class="group flex break-inside-avoid flex-col items-center justify-around gap-5 rounded-xl border border-neutral-300 bg-neutral-100 p-6 dark:border-neutral-600 dark:bg-neutral-600/50"
    :class="isExcluded ? 'bg-neutral-200 dark:bg-neutral-800/50' : ''"
  >
    <div class="flex w-full items-center justify-end gap-2 lg:justify-start">
      <TeacherAssignmentCatalogQuestionButton
        v-if="!viewOnly"
        :disable="isExcluded"
        :img="`/ui/${isExactlyInAssignment ? 'minus' : 'plus'}.svg`"
        :text="`${isExactlyInAssignment ? 'Remove from' : 'Add to'} assignment`"
        @click="emit('select')"
      />
      <div :class="{ 'du-tooltip': showAnswerOverride }" data-tip="Hide all questions first!">
        <TeacherAssignmentCatalogQuestionButton
          :disable="showAnswerOverride"
          :img="`/ui/${showAnswer ? 'eye-hide' : 'eye-show'}.svg`"
          :text="!showAnswerOverride ? `${showAnswer ? 'Hide' : 'Show'} Answer` : ''"
          @click="showAnswer = !showAnswer"
        />
      </div>
      <TeacherAssignmentCatalogQuestionButton
        v-if="isInAssignment"
        :img="`/ui/${isExcluded ? 'square-filled' : 'square-outline'}.svg`"
        :text="`${isExcluded ? 'Unexclude' : 'Exclude'} Question`"
        @click="emit('toggleQuestionExclusion', props.question.id)"
      />
    </div>

    <span class="question-text space-y-3" v-html="question?.text"></span>

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
  // used to see if we can exclude
  isInAssignment: boolean;
  isExcluded: boolean;
}>();
const emit = defineEmits<{
  select: [void];
  toggleQuestionExclusion: [question: number];
}>();

const showAnswer = ref(false);
const isExactlyInAssignment = computed(() => props.currentQuestions.find((question) => props.question.id === question.questionId));
</script>

<style scoped></style>
