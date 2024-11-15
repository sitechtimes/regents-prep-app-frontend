<template>
  <div class="w-screen min-h-screen">
    <div class="w-screen min-h-screen flex flex-col items-center justify-start">
      <header class="px-5 sticky top-0 z-50 bg-[var(--bg-color)] w-full h-16 border-b border-b-[var(--faded-bg-color)] flex items-center justify-between">
        <button @click="toggleSideMenu">
          <img class="w-12 h-12 dark:invert" src="/ui/hamburger.svg" alt="Open navigation menu" />
        </button>

        <div class="flex items-center justify-center w-1/3">
          <NuxtLink v-if="currentCourse" :to="`/student/course/${currentCourse.id}`" class="hover:underline hover:underline-offset-1 flex flex-col items-start justify-center">
            <h4 class="text-xl font-medium">{{ currentCourse.name }}</h4>
            <p class="text-sm">Period {{ currentCourse.period }}</p>
          </NuxtLink>
        </div>

        <div class="flex items-center justify-center w-1/3">
          <NuxtLink to="/student/dashboard" class="text-3xl">SITHS Regents Prep</NuxtLink>
        </div>

        <div class="flex items-center justify-end gap-3 w-1/3">
          <label class="relative inline-flex items-center du-flex cursor-pointer gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input type="checkbox" class="du-toggle theme-controller dark:invert" @click="isDarkMode = !isDarkMode" :checked="isDarkMode" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
          <button id="join-button" v-show="route.path === '/student/dashboard'" @click="openTheJoin" class="text-5xl">
            <img class="w-8 h-8 dark:invert" src="/ui/plus.svg" alt="Join a new course" />
          </button>
          <StudentJoinClass :show="showJoinClass" @close="showJoinClass = false" />
          <button class="w-8 h-8 rounded-full flex items-center justify-center border-2 border-black">
            <img class="w-6 h-6 dark:invert" src="/ui/user.svg" alt="Open account settings" />
          </button>
          <button
            @click="userStore.logout()"
            class="w-24 h-10 bg-red-600 hover:bg-red-500 text-white dark:bg-red-500 dark:hover:bg-red-400 rounded-lg text-lg font-medium flex items-center justify-center duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      <div class="w-full h-full flex items-start justify-between">
        <Transition name="slide-right">
          <div
            id="side-menu"
            v-show="showSideMenu"
            :class="{ 'lg:block': true, 'lg:w-[23rem] w-full': showSideMenu }"
            class="fixed top-0 left-0 h-full bg-black bg-opacity-70 lg:bg-opacity-0 lg:bg-transparent z-40 lg:z-0 transition-all duration-500"
            :style="{ transform: showSideMenu ? 'translateX(0)' : 'translateX(-100%)', opacity: showSideMenu ? 1 : 0 }"
          >
            <div class="pt-4 w-72 h-full bg-[var(--bg-color)] border-r border-r-[var(--faded-bg-color)]">
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

const { courses, currentCourse, isDarkMode } = storeToRefs(userStore);

watch(currentCourse, (course) => {
  console.log(course);
});

const loaded = ref(false);
const showSideMenu = ref(false);
const showJoinClass = ref(false);

const openDropdown = ref(false);

function toggleSideMenu() {
  showSideMenu.value = !showSideMenu.value;
}

function openTheJoin() {
  console.log("HELP");
  showJoinClass.value = true;
}

watchEffect(() => {
  if (window.innerWidth <= 1024) {
    showSideMenu.value = false;
  } else {
    showSideMenu.value = true;
  }
});

onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 1100);
});
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.5s ease;
}
.fade-overlay-enter,
.fade-overlay-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

#side-menu {
  z-index: 40;
}

@media (min-width: 1024px) {
  #side-menu {
    display: block !important;
  }
}
</style>
