<template>
  <div class="min-h-screen w-screen">
    <div class="flex min-h-screen w-screen flex-col items-center justify-start">
      <header class="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-color)] px-5">
        <div class="flex w-1/3 items-center justify-start gap-3">
          <button type="button" @click="showSideMenu = !showSideMenu"><img class="h-12 w-12 dark:invert" src="/ui/hamburger.svg" alt="Open navigation menu" /></button>
          <NuxtLink v-if="loaded && studentCurrentCourse" :to="`/student/course/${studentCurrentCourse.id}`" class="flex flex-col items-start justify-center hover:underline hover:underline-offset-1">
            <h4 class="text-xl font-medium">{{ studentCurrentCourse.name }}</h4>
            <p class="text-sm">Period {{ studentCurrentCourse.period }}</p>
          </NuxtLink>
        </div>
        <div class="flex w-1/3 items-center justify-center">
          <NuxtLink to="/student/dashboard" class="border-b-2 border-transparent text-3xl transition-all duration-500 ease-in-out hover:border-current">SITHS Regents Prep</NuxtLink>
        </div>
        <div class="flex w-1/3 items-center justify-end gap-3">
          <StudentJoinClass :show="showJoinClass" @close="showJoinClass = false" />
          <button v-show="route.path === '/student/dashboard'" id="join-button" type="button" @click="showJoinClass = !showJoinClass">
            <img class="h-8 w-8 dark:invert" src="/ui/plus.svg" alt="Join a new course" />
          </button>
          <ToggleTheme />
          <AccountSettings class="mr-3" />
        </div>
      </header>

      <div class="flex h-full w-full items-start justify-between">
        <Transition name="slide-right">
          <div v-show="showSideMenu" id="side-menu" class="flex h-[calc(100vh-4rem)] w-[23rem] flex-col items-start justify-start bg-[var(--bg-color)]">
            <div class="fixed h-[calc(100vh-4rem)] w-72 border-r border-r-[var(--border-color)] bg-[var(--bg-color)] pt-4">
              <div class="flex w-full flex-col items-center justify-center px-2">
                <NuxtLink
                  to="/student/dashboard"
                  class="flex h-12 w-full items-center justify-start gap-3 rounded-xl pl-4 text-xl duration-300 hover:bg-[var(--hover-background)]"
                  :class="{ 'bg-green-accent': route.path === '/student/dashboard' }"
                >
                  <img class="h-8 w-8 p-1 dark:invert" src="/ui/home.svg" aria-hidden="true" />
                  <p>Dashboard</p>
                </NuxtLink>
                <NuxtLink
                  to="/student/todo"
                  class="flex h-12 w-full items-center justify-start gap-3 rounded-xl pl-4 text-xl duration-300 hover:bg-[var(--hover-background)] dark:hover:text-black"
                  :class="{ 'bg-green-accent': route.path === '/student/todo' }"
                >
                  <img class="h-8 w-8 p-1 dark:invert" src="/ui/todo.svg" aria-hidden="true" />
                  <p>Assignments</p>
                </NuxtLink>
              </div>

              <div class="my-4 h-px w-full bg-[var(--border-color)] dark:bg-dark-border"></div>

              <div v-if="loaded" class="flex h-full w-full flex-col items-center justify-start px-2">
                <NuxtLink
                  v-for="course in studentCourses"
                  :key="course.id"
                  class="flex h-14 w-full items-center justify-start gap-3 rounded-xl pl-4 text-lg duration-300 hover:bg-[var(--hover-background)]"
                  :style="{ backgroundColor: route.path.includes(`/student/course/${course.id}`) ? `var(--${course.subject.toLowerCase()}-faded)` : '' }"
                  :to="`/student/course/${course.id}`"
                >
                  <div
                    class="flex h-8 w-2 items-center justify-center rounded-full text-xl font-medium hover:bg-black"
                    :style="{ backgroundColor: subjectColors[course.subject as keyof typeof subjectColors] }"
                  ></div>
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
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const route = useRoute();

const { studentCourses, studentCurrentCourse } = storeToRefs(userStore);

const loaded = ref(false);
const showSideMenu = ref(true);
const showJoinClass = ref(false);

onMounted(() => (loaded.value = true));

// for vitest
defineExpose({ studentCourses, studentCurrentCourse, loaded, showSideMenu, showJoinClass });
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
