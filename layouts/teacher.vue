<template>
  <div class="min-h-screen w-screen">
    <div class="flex min-h-screen w-screen flex-col items-center justify-start">
      <header class="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-color)] px-5">
        <div class="flex w-1/3 items-center justify-start gap-3">
          <button @click="showSideMenu = !showSideMenu"><img class="h-12 w-12 dark:invert" src="/ui/hamburger.svg" alt="Open navigation menu" /></button>
          <NuxtLink v-if="currentCourse" :to="`/teacher/course/${currentCourse.id}`" class="flex flex-col items-start justify-center hover:underline hover:underline-offset-1">
            <h4 class="text-xl font-medium">{{ currentCourse.name }}</h4>
            <p class="text-sm">Period {{ currentCourse.period }}</p>
          </NuxtLink>
        </div>
        <div class="flex w-1/3 items-center justify-center">
          <NuxtLink to="/teacher/dashboard" class="border-b-2 border-transparent text-3xl transition-all duration-500 ease-in-out hover:border-current"> SITHS Regents Prep</NuxtLink>
        </div>
        <div class="flex w-1/3 items-center justify-end gap-3">
          <ToggleTheme></ToggleTheme>
          <button id="create-button" v-show="route.path === '/teacher/dashboard'" @click="showCreateClass = true"   class="text-5xl">
            <img class="h-6 w-6 dark:invert" src="/ui/plus.svg" alt="Create a new course" />
          </button>
          <TeacherCreateClass :show="showCreateClass" @close="showCreateClass = false" />
          <AccountSettings class="mr-3" />
        </div>
      </header>

      <div class="flex h-full w-full items-start justify-between">
        <Transition name="slide-right">
          <div id="side-menu" v-show="showSideMenu" class="flex h-[calc(100vh-4rem)] w-[23rem] flex-col items-start justify-start bg-[var(--bg-color)]">
            <div class="fixed h-[calc(100vh-4rem)] w-72 border-r border-r-[var(--border-color)] bg-[var(--bg-color)] pt-4">
              <div class="flex w-full flex-col items-center justify-center px-2">
                <NuxtLink
                  to="/teacher/dashboard"
                  class="flex h-12 w-full items-center justify-start gap-3 rounded-xl pl-4 text-xl duration-300 hover:bg-[var(--hover-background)]"
                  :class="{ 'bg-green-accent': route.path === '/teacher/dashboard' }"
                >
                  <img class="h-8 w-8 p-1 dark:invert" src="/ui/home.svg" aria-hidden="true" />
                  <p>Dashboard</p>
                </NuxtLink>
              </div>

              <div class="my-4 h-px w-full rounded-full bg-[var(--border-color)]"></div>

              <div class="flex h-full w-full flex-col items-center justify-start px-2" v-if="loaded">
                <NuxtLink
                  class="flex h-14 w-full items-center justify-start gap-3 rounded-xl pl-4 text-lg duration-300 hover:bg-[var(--hover-background)]"
                  :style="{ backgroundColor: route.path.includes(`/teacher/course/${course.id}`) ? `var(--${course.subject.toLowerCase()}-faded)` : '' }"
                  v-for="course in courses"
                  :key="course.id"
                  :to="`/teacher/course/${course.id}`"
                >
                  <div class="flex h-8 w-2 items-center justify-center rounded-full text-xl font-medium hover:bg-black" :style="{ backgroundColor: subjectColors[course.subject] }"></div>
                  <div class="flex w-full flex-col items-start justify-start">
                    <p class="w-56 overflow-hidden overflow-ellipsis text-nowrap">{{ course.name }}</p>
                    <p class="text-xs">Period {{ course.period }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>

        <div class="h-full min-h-[calc(100vh-6rem)] w-full p-4">
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
