<template>
  <NuxtLink
    :to="to"
    class="-pl-4 flex h-12 w-full items-center justify-start gap-3 rounded-xl text-xs hover:bg-neutral-200/50 md:pl-2 md:text-lg lg:pl-4 dark:hover:bg-neutral-500/25"
    :class="{ 'bg-neutral-200 dark:bg-neutral-500/25': route.path === to }"
  >
    <img class="h-8 w-8 p-1 dark:invert" :src="imgSrc" aria-hidden="true" />
    <p class="-ml-3 md:-ml-1">{{ text }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  imgSrc: string;
  text: string;
}>();

const route = useRoute();
</script>

<style scoped></style>
