<template>
  <button
    class="flex size-9 select-none items-center justify-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 p-0 hover:bg-white lg:size-fit lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-300/50 dark:bg-neutral-700 dark:hover:bg-neutral-600"
    :class="{ 'cursor-not-allowed bg-neutral-200 opacity-50 dark:bg-neutral-700/50 hover:dark:bg-neutral-700/50': disable }"
    type="button"
    :disabled="disable"
    :title="text"
  >
    <!-- without h-0 and w-0, the page layout explodes. i don't know why. -->
    <span class="sr-only h-0 w-0">{{ text }}</span>
    <img v-if="img" class="size-5 dark:invert" :src="img" :aria-hidden="true" draggable="false" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  img?: string;
  text?: string;
  disable?: boolean;
}>();
</script>

<style scoped></style>
