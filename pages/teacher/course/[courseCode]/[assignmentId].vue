<template>
  <div>
    <h1>teacher assignment view</h1>
    <p>{{ route.params.assignmentId }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
