<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const router = useRouter();

onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    userStore.theme = "dark";
  }
});

onMounted(() => {
  userStore.init();
  document.body.style.display = "block";
});
</script>

<style scoped></style>
