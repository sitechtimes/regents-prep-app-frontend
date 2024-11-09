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
const route = useRoute();
const userStore = useUserStore();

const { isDarkMode } = storeToRefs(userStore);
const loaded = ref(false);

watch(isDarkMode, () => {
  document.body.classList.toggle("dark", isDarkMode.value);
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
});

onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") isDarkMode.value = true;
});

onMounted(async () => {
  document.body.style.display = "block";
  await userStore.init();
  if (!userStore.isAuth && route.meta.requiresAuth) router.push("/login");
  else if (userStore.isAuth && ["/login", "/"].includes(route.path)) router.push(`/${userStore.userType}/dashboard`);
  loaded.value = true;
});

// for vitest
defineExpose({ loaded, isDarkMode });
</script>

<style scoped></style>
