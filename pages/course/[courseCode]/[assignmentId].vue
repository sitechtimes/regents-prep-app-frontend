<template>
  <div>
    <h1>assignment info</h1>
    <p>{{ route.params.assignmentId }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
