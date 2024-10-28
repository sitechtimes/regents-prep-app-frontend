<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const store = useUserStore();

onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    store.theme = "dark";
  }
});

onMounted(() => {
  document.body.style.display = "block";
});
</script>

<style scoped></style>
