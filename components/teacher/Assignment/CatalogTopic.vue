<template>
  <button
    class="group flex w-full grow items-center justify-between gap-6 self-stretch rounded-xl border border-neutral-300 bg-neutral-100 px-5 py-2 dark:border-neutral-600 dark:bg-neutral-600/50 dark:hover:border-neutral-300/50"
    type="button"
    @click="emit('select', topic)"
  >
    <p class="text-left text-xl font-semibold" v-html="loadedTopics[typeof topic === 'number' ? topic : topic.id]?.name"></p>
    <img class="size-7 group-hover:translate-x-1.5 dark:invert" src="/ui/chevronRight.svg" alt="Click to expand" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  loadedTopics: Record<number, TopicMapped>;
  topic: number | Topic;
}>();
const emit = defineEmits<{ select: [number | Topic] }>();
</script>

<style scoped></style>
