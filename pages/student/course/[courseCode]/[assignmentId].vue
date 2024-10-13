<template>
  <div class="w-full h-full">
    <h1>assignment info</h1>
    <p>{{ route.params.assignmentId }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: ["auth", "add-course"],
  requiresAuth: true
});

const route = useRoute();
</script>

<style scoped></style>
