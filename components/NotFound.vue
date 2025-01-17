<template>
  <div class="border-[var(--faded-bg-color))] mx-auto flex max-w-md flex-col items-center space-y-4 rounded-xl border bg-[var(--bg-color)] p-6 shadow-md">
    <h1 id="not-found" class="text-center text-xl font-medium text-[var(--text-color)]">Sorry, we couldn't find the {{ message }} you were asking for!</h1>
    <p class="text-center text-[var(--text-color)]">We'll keep looking for who asked.</p>
    <button class="cursor-pointer rounded-full bg-green-accent px-8 py-2 text-xl font-medium" type="button" @click="emit('close')">Continue</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: "class" | "assignment";
}>();

const emit = defineEmits<{
  close: [void];
}>();
</script>

<style scoped></style>
