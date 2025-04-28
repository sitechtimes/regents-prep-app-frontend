<template>
  <NuxtLink
    class="flex h-9 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white p-0 transition duration-300 hover:border-neutral-400 lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-700"
    :to="to"
  >
    <img class="size-5 transition duration-300 dark:invert" :src="img" aria-hidden="true" />
    <p class="hidden grow translate-y-px transition duration-300 lg:block">{{ text }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  img: string;
  text: string;
}>();
</script>

<style scoped></style>
