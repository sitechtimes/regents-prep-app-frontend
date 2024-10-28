<template>
  <div class="w-screen min-h-screen">
    <div class="w-screen min-h-screen flex flex-col items-center justify-start">
      <header class="px-5 sticky top-0 z-50 bg-[var(--bg-color)] w-full h-16 border-b border-b-[var(--faded-bg-color)] flex items-center justify-between">
        <div class="flex items-center justify-start gap-3 w-1/3">
          <button @click="showSideMenu = !showSideMenu"><img class="w-12 h-12 dark:invert" src="/ui/hamburger.svg" alt="Open navigation menu" /></button>
          <NuxtLink v-if="currentCourse" :to="`/teacher/course/${currentCourse.id}`" class="hover:underline hover:underline-offset-1 flex flex-col items-start justify-center">
            <h4 class="text-xl font-medium">{{ currentCourse.name }}</h4>
            <p class="text-sm">Period {{ currentCourse.period }}</p>
          </NuxtLink>
        </div>
        <div class="flex items-center justify-center w-1/3">
          <NuxtLink to="/teacher/dashboard" class="text-3xl">SITHS Regents Prep</NuxtLink>
        </div>
        <div class="flex items-center justify-end gap-3 w-1/3">
          <!-- make this look better -->
          <button @click="toggleTheme">toggle theme</button>
          <button class="w-8 h-8 rounded-full flex items-center justify-center border-2 border-black"><img class="w-6 h-6 dark:invert" src="/ui/user.svg" alt="Open account settings" /></button>
        </div>
      </header>

      <div class="w-full h-full flex items-start justify-between">
        <Transition name="slide-right">
          <div v-show="showSideMenu" class="w-[23rem] h-[calc(100vh-4rem)] bg-[var(--bg-color)] flex flex-col items-start justify-start">
            <div class="fixed pt-4 w-72 h-[calc(100vh-4rem)] bg-[var(--bg-color)] border-r border-r-[var(--faded-bg-color)]">
              <div class="w-full flex flex-col items-center justify-center px-2">
                <NuxtLink
                  to="/teacher/dashboard"
                  class="hover:bg-gray-accent duration-200 w-full pl-4 h-12 rounded-xl text-xl flex items-center justify-start gap-3"
                  :class="{ 'bg-green-accent': route.path === '/teacher/dashboard' }"
                >
                  <img class="w-8 h-8 p-1 dark:invert" src="/ui/home.svg" aria-hidden="true" />
                  <p>Dashboard</p>
                </NuxtLink>
                <NuxtLink
                  to="/teacher/todo"
                  class="hover:bg-gray-accent duration-200 w-full pl-4 h-12 rounded-xl text-xl flex items-center justify-start gap-3"
                  :class="{ 'bg-green-accent': route.path === '/teacher/todo' }"
                >
                  <img class="w-8 h-8 p-1 dark:invert" src="/ui/todo.svg" aria-hidden="true" />
                  <p>Assignments</p>
                </NuxtLink>
              </div>

              <div class="w-full h-px my-4 dark:invert bg-[var(--faded-bg-color)] rounded-full"></div>

              <div class="w-full h-full flex flex-col items-center justify-start px-2" v-if="loaded">
                <NuxtLink
                  class="hover:bg-gray-accent duration-200 w-full pl-4 h-14 rounded-xl text-lg flex items-center justify-start gap-3"
                  :style="{ backgroundColor: route.path.includes(`/teacher/course/${course.id}`) ? `var(--${course.subject.toLowerCase()}-faded)` : '' }"
                  v-for="course in courses"
                  :key="course.id"
                  :to="`/teacher/course/${course.id}`"
                >
                  <div class="w-2 h-8 rounded-full flex items-center justify-center text-xl font-medium hover:bg-black" :style="{ backgroundColor: subjectColors[course.subject] }"></div>
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
const store = useUserStore();
const route = useRoute();

const { courses, currentCourse } = storeToRefs(store);

const loaded = ref(false);
const showSideMenu = ref(true);

onMounted(() => {
  loaded.value = true;
});

function toggleTheme() {
  const wasLight = store.theme === "light";
  store.theme = wasLight ? "dark" : "light";
  document.body.classList[wasLight ? "add" : "remove"]("dark");
  localStorage.setItem("theme", store.theme);
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
