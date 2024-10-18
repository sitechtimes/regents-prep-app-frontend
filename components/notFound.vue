<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <h1 class="text-xl font-medium text-black">This isn't the class you're looking for!</h1>
    <h3 class="text-center text-black">(Class not found.)</h3>
    <NuxtLink to="/student/dashboard" class="text-black">Go Back</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const loaded = ref(false);

onMounted(() => {
  loaded.value = true;
});
</script>

<style scoped></style>
