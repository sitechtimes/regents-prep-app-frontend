<template>
  <div>
    <h1>course info</h1>
    <p>{{ route.params.courseCode }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
