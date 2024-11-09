<template>
  <div class="p-6 max-w-md mx-auto bg-[var(--bg-color)] border border-[var(--faded-bg-color))] shadow-md rounded-xl flex flex-col items-center space-y-4">
    <h1 class="text-xl font-medium text-[var(--text-color)] text-center" id="not-found">Sorry, we couldn't find the {{ message }} you were asking for!</h1>
    <h3 class="text-center text-[var(--text-color)]">We'll keep looking for who asked.</h3>
    <button class="px-8 py-2 text-xl font-medium rounded-full bg-green-accent cursor-pointer" @click="emit('close')">Continue</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: "student" | "teacher";
  message: "class" | "assignment";
}>();

const emit = defineEmits<{
  close: [void];
}>();
</script>

<style scoped></style>
