<template>
  <component
    :is="type === 'link' ? NuxtLink : 'button'"
    class="flex h-9 select-none items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white p-0 px-4 hover:border-neutral-400 hover:transition lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-700"
    :to="to"
    type="button"
    @click="emit('onClick')"
  >
    <img class="size-5 dark:invert" :src="img" aria-hidden="true" draggable="false" />
    <p class="hidden grow translate-y-px lg:block">{{ text }}</p>
  </component>
</template>

<script setup lang="ts">
// https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
import { NuxtLink } from "#components";

defineProps<{
  type: "button" | "link";
  to?: string;
  img: string;
  text: string;
}>();
const emit = defineEmits<{ onClick: [void] }>();
</script>

<style scoped></style>
