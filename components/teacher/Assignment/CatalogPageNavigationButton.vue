<template>
  <button
    class="flex items-center justify-center rounded-xl bg-neutral-200 p-1 hover:bg-neutral-300"
    :class="{ 'cursor-not-allowed bg-neutral-400 hover:bg-neutral-400': disable }"
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
