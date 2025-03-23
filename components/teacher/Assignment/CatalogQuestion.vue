<template>
  <button class="group flex w-1/4 max-w-[33%] grow items-center justify-between gap-6 self-stretch rounded-xl bg-neutral-100 px-12 py-3 hover:bg-neutral-200" type="button"></button>
</template>

<script setup lang="ts">
defineProps<{
  question: QuestionInterface;
}>();
</script>

<style scoped></style>
