<template>
  <div class="w-screen min-h-screen">
    <div class="w-screen min-h-screen flex flex-col items-center justify-start">
      <header class="px-5 sticky top-0 z-50 bg-[var(--bg-color)] w-full h-16 border-b border-b-[var(--faded-bg-color)] flex items-center justify-between">
        <div class="flex items-center justify-start gap-3 w-1/3">
          <button @click="showSideMenu = !showSideMenu"><img class="w-12 h-12 dark:invert" src="/ui/hamburger.svg" alt="Open navigation menu" /></button>
          <NuxtLink v-if="currentCourse" :to="`/student/course/${currentCourse.id}`" class="hover:underline hover:underline-offset-1 flex flex-col items-start justify-center">
            <h4 class="text-xl font-medium">{{ currentCourse.name }}</h4>
            <p class="text-sm">Period {{ currentCourse.period }}</p>
          </NuxtLink>
        </div>
        <div class="flex items-center justify-center w-1/3">
          <NuxtLink to="/student/dashboard" class="text-3xl">SITHS Regents Prep</NuxtLink>
        </div>
        <div class="flex items-center justify-end gap-3 w-1/3">
          <!-- make this look better -->
          <p>Toggle Theme</p>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" @click="toggleTheme" :checked="isDarkMode" />
            <div
              class="w-11 h-6 peer bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white-300 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"
            ></div>
          </label>
          <button v-show="route.path === '/student/dashboard'" @click="openTheJoin" class="text-5xl"><img class="w-8 h-8 dark:invert" src="/ui/plus.svg" alt="Join a new course" /></button>
          <StudentJoinClass :show="showJoinClass" @close="showJoinClass = false" />
          <!-- make this look better and add account settings -->
          <button class="w-8 h-8 rounded-full flex items-center justify-center border-2 border-black"><img class="w-6 h-6 dark:invert" src="/ui/user.svg" alt="Open account settings" /></button>
        </div>
      </header>

      <div class="w-full h-full flex items-start justify-between">
        <Transition name="slide-right">
          <div v-show="showSideMenu" class="w-[23rem] h-[calc(100vh-4rem)] bg-[var(--bg-color)] flex flex-col items-start justify-start">
            <div class="fixed pt-4 w-72 h-[calc(100vh-4rem)] bg-[var(--bg-color)] border-r border-r-[var(--faded-bg-color)]">
              <div class="w-full flex flex-col items-center justify-center px-2">
                <NuxtLink
                  to="/student/dashboard"
                  class="hover:bg-gray-accent duration-200 w-full pl-4 h-12 rounded-xl text-xl flex items-center justify-start gap-3"
                  :class="{ 'bg-green-accent': route.path === '/student/dashboard' }"
                >
                  <img class="w-8 h-8 p-1 dark:invert" src="/ui/home.svg" aria-hidden="true" />
                  <p>Dashboard</p>
                </NuxtLink>
                <NuxtLink
                  to="/student/todo"
                  class="hover:bg-gray-accent duration-200 w-full pl-4 h-12 rounded-xl text-xl flex items-center justify-start gap-3"
                  :class="{ 'bg-green-accent': route.path === '/student/todo' }"
                >
                  <img class="w-8 h-8 p-1 dark:invert" src="/ui/todo.svg" aria-hidden="true" />
                  <p>Assignments</p>
                </NuxtLink>
              </div>

              <div class="w-full h-px my-4 dark:invert bg-[var(--faded-bg-color)] rounded-full"></div>

              <div class="w-full h-full flex flex-col items-center justify-start px-2" v-if="loaded">
                <NuxtLink
                  class="hover:bg-gray-accent duration-200 w-full pl-4 h-14 rounded-xl text-lg flex items-center justify-start gap-3"
                  :style="{ backgroundColor: route.path.includes(`/student/course/${course.id}`) ? `var(--${course.subject.toLowerCase()}-faded)` : '' }"
                  v-for="course in courses"
                  :key="course.id"
                  :to="`/student/course/${course.id}`"
                >
                  <div
                    class="w-2 h-8 rounded-full flex items-center justify-center text-xl font-medium hover:bg-black"
                    :style="{ backgroundColor: subjectColors[course.subject as keyof typeof subjectColors] }"
                  ></div>
                  <div class="w-full flex flex-col items-start justify-start">
                    <p class="text-nowrap overflow-ellipsis w-56 overflow-hidden">{{ course.name }}</p>
                    <p class="text-xs">Period {{ course.period }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>

        <div class="w-full h-full p-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const route = useRoute();

const { courses, currentCourse } = storeToRefs(userStore);

const loaded = ref(false);
const showSideMenu = ref(true);
const showJoinClass = ref(false);

const isDarkMode = ref(false);

function openTheJoin() {
  console.log("HELP");
  showJoinClass.value = true;
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark" || savedTheme === "light") {
    userStore.theme = savedTheme;
    isDarkMode.value = savedTheme === "dark";
    document.body.classList.toggle("dark", isDarkMode.value);
  }
  loaded.value = true;
});

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  userStore.theme = isDarkMode.value ? "dark" : "light";
  document.body.classList.toggle("dark", isDarkMode.value);
  localStorage.setItem("theme", userStore.theme);
}
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.35s ease-in-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-24rem);
  width: 0;
}
</style>
