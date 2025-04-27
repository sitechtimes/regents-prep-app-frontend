<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const { isDarkMode } = storeToRefs(userStore);

watch(isDarkMode, () => {
  document.body.classList.toggle("dark", isDarkMode.value);

  const theme = isDarkMode.value ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});

onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") isDarkMode.value = true;
});

const userTypes: Readonly<Record<string, string>> = {
  student: "/teacher",
  teacher: "/student"
};

onMounted(() => {
  if (route.path.includes(userTypes[userStore.userType])) void router.replace(`/${userStore.userType}/dashboard`);
  document.body.style.display = "block";
});

// for vitest
defineExpose({ isDarkMode });
</script>

<style scoped></style>
