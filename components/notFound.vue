<template>
  <div class="w-full flex flex-col items-start justify-center">
    <h1>This isn't the assignment you're looking for!</h1>
    <h3>(Assignment not found.)</h3>
    <NuxtLink to="/student/dashboard">Go Back</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: ["auth", "add-course"],
  requiresAuth: true
});

const loaded = ref(false);

onMounted(() => {
  loaded.value = true;
});
</script>

<style scoped></style>
