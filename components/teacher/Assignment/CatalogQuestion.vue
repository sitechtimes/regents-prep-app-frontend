<template>
  <div class="group flex w-[45%] max-w-[50%] grow flex-col items-center justify-around gap-6 self-baseline rounded-xl bg-neutral-100 px-12 py-3">
    <button
      v-if="!viewOnly"
      class="flex h-9 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white p-0 transition duration-500 hover:border-neutral-400 lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-700"
      type="button"
      @click="emit('select')"
    >
      <img class="size-5 transition duration-500 dark:invert" src="/ui/plus.svg" aria-hidden="true" />
      <p class="hidden grow translate-y-px transition duration-500 lg:block">Add to assignment</p>
    </button>

    <span class="question-text space-y-3 text-neutral-100" v-html="question?.text"></span>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <div
        v-if="question?.answerType === 'Multiple Choice'"
        v-for="choice in question?.answers"
        class="text-nowrap rounded-lg bg-neutral-200 px-6 py-2 shadow-sm"
        :class="{ 'bg-neutral-400': choice.isCorrect }"
        v-html="choice.text"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  viewOnly: boolean;
  question: TopicQuestionInterface;
}>();
const emit = defineEmits<{ select: [void] }>();
</script>

<!-- eslint-disable-next-line vue/enforce-style-attribute -->
<style>
.question-text em {
  @apply italic;
}
</style>
