<template>
  <button
    class="flex h-9 items-center justify-center gap-2 rounded-full border border-neutral-300 p-0 transition duration-500 hover:border-neutral-400 lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-700"
    :class="disable ? 'cursor-not-allowed bg-neutral-300 opacity-50' : 'bg-white'"
    type="button"
    :disabled="disable"
    @click="clickFunction"
  >
    <img v-if="img" class="size-5 transition duration-500 dark:invert" :src="img" aria-hidden="true" />
    <p v-if="text" class="hidden grow translate-y-px transition duration-500 lg:block">{{ text }}</p>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  clickFunction: () => any;
  img?: string;
  text?: string;
  disable?: boolean;
}>();
</script>

<style scoped></style>
