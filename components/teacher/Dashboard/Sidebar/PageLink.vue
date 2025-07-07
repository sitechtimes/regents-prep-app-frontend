<template>
  <NuxtLink
    :to="to"
    class="flex h-12 w-full items-center justify-start gap-3 rounded-xl pl-4 text-xl hover:bg-neutral-200/50 dark:hover:bg-neutral-500/25"
    :class="{ 'bg-neutral-200 dark:bg-neutral-500/25': matched }"
  >
    <img class="h-8 w-8 select-none p-1 dark:invert" :src="imgSrc" aria-hidden="true" draggable="false" />
    <p class="translate-y-px">{{ text }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string;
  imgSrc: string;
  text: string;
}>();

const route = useRoute();

const matched = computed(() => {
  if (route.name !== "teacher-create-assignment") return route.path === props.to;

  // handle print vs create
  if (route.query.print === "true") return route.fullPath === props.to;
  return route.path === props.to;
});
</script>

<style scoped></style>
