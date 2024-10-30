<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const userStore = useUserStore();

onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    userStore.theme = "dark";
  }
});

onMounted(async () => {
  await userStore.init();
  userStore.disableAuth = false;
  if (!userStore.isAuth && router.currentRoute.meta.requiresAuth) router.push("/login");
});
  document.body.style.display = "block";
});
</script>

<style scoped></style>
