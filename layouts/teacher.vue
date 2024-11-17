<template>
  <div class="w-screen min-h-screen">
    <div class="w-screen min-h-screen flex flex-col items-center justify-start">
      <header
        class="px-5 sticky top-0 z-50 bg-[var(--bg-color)] w-full h-16 border-b border-[var(--border-color)] flex items-center justify-between">
        <div class="flex items-center justify-start gap-3 w-1/3">
          <button @click="showSideMenu = !showSideMenu"><img class="w-12 h-12 dark:invert" src="/ui/hamburger.svg"
              alt="Open navigation menu" /></button>
          <NuxtLink v-if="currentCourse" :to="`/teacher/course/${currentCourse.id}`"
            class="hover:underline hover:underline-offset-1 flex flex-col items-start justify-center">
            <h4 class="text-xl font-medium">{{ currentCourse.name }}</h4>
            <p class="text-sm">Period {{ currentCourse.period }}</p>
          </NuxtLink>
        </div>
        <div class="flex items-center justify-center w-1/3">
          <NuxtLink to="/teacher/dashboard"
            class="text-3xl border-b-2 border-transparent hover:border-current duration-500 transition-all ease-in-out">
            SITHS Regents Prep</NuxtLink>
        </div>
        <div class="flex items-center justify-end gap-3 w-1/3">
          <ToggleTheme></ToggleTheme>
          <button id="create-button" v-show="route.path === '/teacher/dashboard/'" @click="showCreateClass = true"
            class="text-5xl">
            <img class="w-6 h-6 dark:invert" src="/ui/plus.svg" alt="Create a new course" />
          </button>
          <TeacherCreateClass :show="showCreateClass" @close="showCreateClass = false" />
          <AccountSettings class="mr-3" />
        </div>
      </header>

      <div class="w-full h-full flex items-start justify-between">
        <Transition name="slide-right">
          <div id="side-menu" v-show="showSideMenu"
            class="w-[23rem] h-[calc(100vh-4rem)] bg-[var(--bg-color)] flex flex-col items-start justify-start">
            <div
              class="fixed pt-4 w-72 h-[calc(100vh-4rem)] bg-[var(--bg-color)] border-r border-r-[var(--border-color)]">
              <div class="w-full flex flex-col items-center justify-center px-2">
                <NuxtLink to="/teacher/dashboard"
                  class="hover:bg-[var(--hover-background)] duration-300 w-full pl-4 h-12 rounded-xl text-xl flex items-center justify-start gap-3"
                  :class="{ 'bg-green-accent': route.path === '/teacher/dashboard' }">
                  <img class="w-8 h-8 p-1 dark:invert" src="/ui/home.svg" aria-hidden="true" />
                  <p>Dashboard</p>
                </NuxtLink>
              </div>

              <div class="w-full h-px my-4 bg-[var(--border-color)] rounded-full"></div>

              <div class="w-full h-full flex flex-col items-center justify-start px-2" v-if="loaded">
                <NuxtLink
                  class="hover:bg-[var(--hover-background)] duration-300 w-full pl-4 h-14 rounded-xl text-lg flex items-center justify-start gap-3"
                  :style="{ backgroundColor: route.path.includes(`/teacher/course/${course.id}`) ? `var(--${course.subject.toLowerCase()}-faded)` : '' }"
                  v-for="course in courses" :key="course.id" :to="`/teacher/course/${course.id}`">
                  <div class="w-2 h-8 rounded-full flex items-center justify-center text-xl font-medium hover:bg-black"
                    :style="{ backgroundColor: subjectColors[course.subject] }"></div>
                  <div class="w-full flex flex-col items-start justify-start">
                    <p class="text-nowrap overflow-ellipsis w-56 overflow-hidden">{{ course.name }}</p>
                    <p class="text-xs">Period {{ course.period }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>

        <div class="w-full h-full min-h-[calc(100vh-6rem)] p-4">
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
const showCreateClass = ref(false);

onMounted(() => {
  loaded.value = true;
});

// for vitest
defineExpose({ courses, currentCourse, loaded, showSideMenu });
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
