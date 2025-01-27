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

const userTypes: Readonly<Record<string, string>> = {
  student: "/teacher",
  teacher: "/student"
};

onMounted(() => {
  if (route.path.includes(userTypes[userStore.userType])) void router.replace(`/${userStore.userType}/dashboard`);
  document.body.style.display = "block";
  loaded.value = true;
});

// for vitest
defineExpose({ loaded, isDarkMode });
</script>

<style scoped></style>
