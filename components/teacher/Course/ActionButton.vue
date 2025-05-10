<template>
  <NuxtLink
    v-if="type === 'link'"
    class="flex h-9 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white p-0 px-4 transition duration-500 hover:border-neutral-400 lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-700"
    :to="to"
  >
    <img class="size-5 transition duration-500 dark:invert" :src="img" aria-hidden="true" />
    <p class="hidden grow translate-y-px transition duration-500 lg:block">{{ text }}</p>
  </NuxtLink>

  <button
    v-else
    class="flex h-9 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white p-0 px-4 transition duration-500 hover:border-neutral-400 lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-700"
    type="button"
    @click="emit('onClick')"
  >
    <img class="size-5 transition duration-500 dark:invert" :src="img" aria-hidden="true" />
    <p class="hidden grow translate-y-px transition duration-500 lg:block">{{ text }}</p>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type: "button" | "link";
  to?: string;
  img: string;
  text: string;
}>();
const emit = defineEmits<{ onClick: [void] }>();
</script>

<style scoped></style>
