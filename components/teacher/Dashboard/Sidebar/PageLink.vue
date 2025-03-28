<template>
  <NuxtLink
    :to="to"
    class="flex h-12 w-full items-center justify-start gap-3 rounded-xl pl-2 lg:text-xl md:text-xl text-l hover:bg-neutral-100 dark:hover:bg-neutral-700"
    :class="{ 'bg-neutral-100 dark:bg-neutral-600': route.path === to }"
  >
    <img class="h-8 w-8 p-1 dark:invert" :src="imgSrc" aria-hidden="true" />
    <p>{{ text }}</p>
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
