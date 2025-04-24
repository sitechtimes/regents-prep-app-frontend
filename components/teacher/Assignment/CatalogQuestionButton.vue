<template>
  <div class="du-tooltip" :data-tip="text">
    <button
      class="flex size-9 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 p-0 transition duration-500 hover:bg-white lg:size-fit lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-300/50 dark:bg-neutral-700 dark:hover:bg-neutral-600"
      :class="{ 'cursor-not-allowed bg-neutral-200 opacity-50 dark:bg-neutral-700/50 hover:dark:bg-neutral-700/50': disable }"
      type="button"
      :disabled="disable"
      @click="clickFunction"
    >
      <img v-if="img" class="size-5 transition duration-500 dark:invert" :src="img" aria-hidden="true" />
    </button>
  </div>
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
