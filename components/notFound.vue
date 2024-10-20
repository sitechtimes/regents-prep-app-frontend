<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4">
    <h1 class="text-xl font-medium text-black">This isn't the {{ message }} you're looking for!</h1>
    <h3 class="text-center text-black">({{ capitalize(message) }} not found.)</h3>
    <NuxtLink to="/student/dashboard" class="px-8 py-2 text-xl font-medium rounded-full bg-green-accent cursor-pointer">Go Back</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const loaded = ref(false);
const props = defineProps<{
  message: string;
}>();

onMounted(() => {
  loaded.value = true;
});

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<style scoped></style>
