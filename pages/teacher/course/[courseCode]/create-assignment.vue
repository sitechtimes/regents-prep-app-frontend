<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="">Create Assignment</h2>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course"
});
</script>

<style scoped></style>
