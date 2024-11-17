<template>
  <div class="w-screen min-h-screen">
    <div class="w-screen min-h-screen flex flex-col items-center justify-start">
      <header
        class="px-5 sticky top-0 z-50 bg-[var(--bg-color)] w-full h-16 border-b border-[var(--border-color)] flex items-center justify-between">
        <div class="flex items-center justify-start gap-3 w-1/3">
          <button @click="showSideMenu = !showSideMenu"><img class="w-12 h-12 dark:invert" src="/ui/hamburger.svg"
              alt="Open navigation menu" /></button>
          <NuxtLink v-if="currentCourse" :to="`/student/course/${currentCourse.id}`"
            class="hover:underline hover:underline-offset-1 flex flex-col items-start justify-center">
            <h4 class="text-xl font-medium">{{ currentCourse.name }}</h4>
            <p class="text-sm">Period {{ currentCourse.period }}</p>
          </NuxtLink>
        </div>
        <div class="flex items-center justify-center w-1/3">
          <NuxtLink to="/student/dashboard"
            class="text-3xl border-b-2 border-transparent hover:border-current duration-500 transition-all ease-in-out">
            SITHS Regents
            Prep</NuxtLink>
        </div>
        <div class="flex items-center justify-end gap-3 w-1/3">
          <StudentJoinClass :show="showJoinClass" @close="showJoinClass = false" />
          <button id="join-button" v-show="route.path === '/student/dashboard'" @click="showJoinClass = !showJoinClass">
            <img class="w-8 h-8 dark:invert" src="/ui/plus.svg" alt="Join a new course" />
          </button>
          <ToggleTheme />
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
                <NuxtLink to="/student/dashboard"
                  class="hover:bg-[var(--hover-background)] duration-300 w-full pl-4 h-12 rounded-xl text-xl flex items-center justify-start gap-3"
                  :class="{ 'bg-green-accent': route.path === '/student/dashboard' }">
                  <img class="w-8 h-8 p-1 dark:invert" src="/ui/home.svg" aria-hidden="true" />
                  <p>Dashboard</p>
                </NuxtLink>
                <NuxtLink to="/student/todo"
                  class="hover:bg-[var(--hover-background)] dark:hover:text-black duration-300 w-full pl-4 h-12 rounded-xl text-xl flex items-center justify-start gap-3"
                  :class="{ 'bg-green-accent': route.path === '/student/todo' }">
                  <img class="w-8 h-8 p-1 dark:invert" src="/ui/todo.svg" aria-hidden="true" />
                  <p>Assignments</p>
                </NuxtLink>
              </div>

              <div class="w-full h-px my-4 dark:bg-dark-border bg-[var(--border-color)]"></div>

              <div class="w-full h-full flex flex-col items-center justify-start px-2" v-if="loaded">
                <NuxtLink
                  class="hover:bg-[var(--hover-background)] duration-300 w-full pl-4 h-14 rounded-xl text-lg flex items-center justify-start gap-3"
                  :style="{ backgroundColor: route.path.includes(`/student/course/${course.id}`) ? `var(--${course.subject.toLowerCase()}-faded)` : '' }"
                  v-for="course in courses" :key="course.id" :to="`/student/course/${course.id}`">
                  <div class="w-2 h-8 rounded-full flex items-center justify-center text-xl font-medium hover:bg-black"
                    :style="{ backgroundColor: subjectColors[course.subject as keyof typeof subjectColors] }"></div>
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
const router = useRouter();

const { courses, currentCourse } = storeToRefs(userStore);

watch(currentCourse, (course) => {
  console.log(course);
});

const loaded = ref(false);
const showSideMenu = ref(true);
const showJoinClass = ref(false);

const openDropdown = ref(false);

onMounted(() => {
  currentCourse.value = undefined;
  loaded.value = true;
});

// for vitest
defineExpose({ courses, currentCourse, loaded, showSideMenu, showJoinClass });
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
