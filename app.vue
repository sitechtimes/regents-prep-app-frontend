<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  // get theme and shit
  document.body.style.display = "flex";
});
</script>

<style scoped></style>
