<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const userStore = useStore();

onBeforeMount(() => {
  // get theme and shit
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    user.theme = "dark";
  }
});

onMounted(() => {
  userStore.init();
  document.body.style.display = "block";
});
</script>

<style scoped></style>
