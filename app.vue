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
const route = useRoute();

onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    userStore.theme = "dark";
  }
});

onMounted(async () => {
  await userStore.init();
  userStore.disableAuth = false;
  if (!userStore.isAuth && route.meta.requiresAuth) router.push("/login");
  else if (userStore.isAuth && ["/login", "/"].includes(route.path)) router.push("/student/dashboard");
  document.body.style.display = "block";
});
</script>

<style scoped></style>
