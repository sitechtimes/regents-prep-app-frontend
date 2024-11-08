<template>
  <div>
    <NuxtLayout>
      <Loading :show="!loaded" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const loaded = ref(false);

onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    userStore.theme = "dark";
  }
});

onMounted(async () => {
  document.body.style.display = "block";
  await userStore.init();
  if (!userStore.isAuth && route.meta.requiresAuth) router.push("/login");
  else if (userStore.isAuth && ["/login", "/"].includes(route.path)) router.push(`/${userStore.userType}/dashboard`);
  loaded.value = true;
});
</script>

<style scoped></style>
