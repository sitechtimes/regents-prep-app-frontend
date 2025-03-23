<template>
  <button
    class="group flex w-1/4 max-w-[33%] grow items-center justify-between gap-6 self-stretch rounded-xl bg-neutral-100 px-12 py-3 hover:bg-neutral-200"
    type="button"
    @click="emit('select', topic)"
  >
    <p class="text-left text-xl font-semibold" v-html="loadedTopics[typeof topic === 'number' ? topic : topic.id].name"></p>
    <img class="size-7 group-hover:translate-x-1.5" src="/ui/chevronRight.svg" alt="Click to expand" />
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
