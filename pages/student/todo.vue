<template>
  <div class="w-full h-full">
    <h1>make a todo page that totally isnt inspired by google classroom</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "auth",
  requiresAuth: true
});
</script>

<style scoped></style>
