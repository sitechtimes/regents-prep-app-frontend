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
// let userSelectedTheme = ref(false);

const { isDarkMode, showSideMenu } = storeToRefs(userStore);

// const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
// mediaQuery.addEventListener("change", (e) => {
//   if (userSelectedTheme.value) return; // it follows what user chose before if they did
//   isDarkMode.value = e.matches;
// });

watch(isDarkMode, () => {
  // userSelectedTheme.value = true;
  document.body.classList.toggle("dark", isDarkMode.value);

  const theme = isDarkMode.value ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});
onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") isDarkMode.value = true;
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
