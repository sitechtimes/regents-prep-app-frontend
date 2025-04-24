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
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
});

onBeforeMount(() => {
  if (localStorage.getItem("theme") === "dark") isDarkMode.value = true;
});

onMounted(() => {
  console.warn(
    `%c⠀⠀⠀⠀⠀⠀⠀⠀⡠⠂⣉⠉⠉⠉⠉⠉⢉⣀⣐⡒⠢⢀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡠⢊⠴⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⠢⣍⠒⢄⡀⠀⠀⠀⠀
⠀⠀⠀⠀⡠⢪⠔⢁⠀⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠢⣈⠒⠄⡀⠀
⠀⠀⢀⢊⠞⢀⠖⠁⠀⠀⠀⡹⠀⠀⣀⠤⠔⢆⠀⠀⠀⡎⠉⠐⠒⢤⡁⠢⡈⡆
⠀⣰⠕⠁⡔⠁⢰⠊⠉⣑⠪⠔⠂⠁⠀⠀⠀⢸⠀⠀⠀⡇⠀⠀⠀⠀⢱⠀⡇⡇
⡌⢘⠀⢰⠀⠀⠘⡄⠘⡄⠀⠀⠀⠀⠀⡖⢈⠅⠒⠢⡀⡇⠀⢨⠑⡄⢈⠀⠇⠇
⠃⢸⠀⠘⢄⠀⠀⠘⢄⠙⠒⠒⡄⠀⠀⣇⠎⠀⣀⡀⡇⠀⠀⢸⠀⡇⢸⠀⠀⢀
⢠⠘⡀⠀⠀⠉⠢⢄⠀⠱⠀⠀⡇⠀⢠⣹⠀⠸⠴⠁⠇⠀⠀⠈⠚⠁⡎⠀⡇⢸
⠸⠀⠇⠀⠀⠀⠀⠈⡆⠀⡆⠀⠇⠀⢸⢠⠀⠀⠀⡜⢰⠀⠀⡠⠤⠚⠁⠀⡇⢸
⠀⢇⠸⠀⠁⠀⠀⠈⠀⡰⠀⢰⠀⠀⢸⠘⣄⢀⠔⠁⠸⠀⠀⡇⠀⠀⠀⢀⠇⢸
⠀⠸⡄⢧⡑⠒⠠⠀⠊⠁⠀⡎⠀⠀⠸⠀⠀⠀⠀⠀⡄⠀⠀⢁⠀⠀⡠⠋⡔⠁
⠀⠀⠈⠓⢌⠢⢄⠀⠀⠀⠀⠇⠀⣀⡇⠀⠀⠀⠀⠀⠓⠒⠂⠉⡠⠞⡡⠊⠀⠀
⠀⠀⠀⠀⠀⠑⢄⠙⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠊⢀⠞⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⢦⣉⣀⣉⣉⣉⣉⣉⣉⣉⡉⠉⠉⠁⠤⠔⠁⠀⠀⠀⠀⠀


%cPlease do not paste anything into the console unless you know what you're doing!

%cDO NOT UNREGENT YOUR PREP!

%c*If you do know what you're doing, please apply to Advanced Computer Science Applications/Development with Mr. Whalen`,
    "color: red;",
    "color: blue; font-weight: bold; font-size: 16px;",
    "color: red; font-weight: 900; font-size: 32px;",
    "color: orange; font-weight: 200; font-size: 10px; font-family: Comic Sans MS;"
  );
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
