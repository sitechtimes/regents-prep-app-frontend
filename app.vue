<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { origin } = useRequestURL();
useSeoMeta({
  ogImage: () => `${origin}/seagull.png`,
  twitterCard: "summary_large_image",
  twitterImage: () => `${origin}/banner.png`
});

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const { isDarkMode, showSideMenu } = storeToRefs(userStore);

watch(isDarkMode, () => {
  document.body.classList.toggle("dark", isDarkMode.value);

  const theme = isDarkMode.value ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});
onBeforeMount(() => {
  const savedTheme = localStorage.getItem("theme");
  isDarkMode.value = savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
});

const userTypes = {
  student: "/teacher",
  teacher: "/student"
} as const;

onBeforeMount(() => (showSideMenu.value = window.innerWidth >= 540));

onMounted(() => {
  if (route.path.includes(userTypes[userStore.userType])) void router.replace(`/${userStore.userType}/dashboard`);
  document.body.style.display = "block";
});

// for vitest
defineExpose({ isDarkMode });
</script>

<style scoped></style>
