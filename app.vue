<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();

onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    userStore.theme = "dark";
  }
});

onMounted(async () => {
  await userStore.init();
  disableAuth.value = false;
  document.body.style.display = "block";
});
</script>

<style scoped></style>
