<template>
  <div class="flex flex-col items-center justify-center">
    <p>{{ route.params.courseCode }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
