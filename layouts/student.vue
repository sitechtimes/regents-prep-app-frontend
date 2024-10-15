<template>
  <div class="w-screen min-h-screen">
    <Transition name="join-menu-scale">
      <div @click="openJoinMenu = false" v-show="openJoinMenu" class="join-menu-bg fixed top-0 left-0 bg-[rgba(0,0,0,0.25)] w-screen min-h-screen flex items-center justify-center z-[51]">
        <div @click="$event.stopPropagation()" class="join-menu bg-white p-6 rounded-lg flex flex-col items-center justify-center">
          <h2 class="text-xl">join a class</h2>
          <form id="joinCodeForm" class="flex flex-col mb-4" @submit="joinCourse" @submit.prevent>
            <label class="du-label" for="joinCode">join code</label>
            <input class="du-input bg-gray-200" id="joinCode" type="text" v-model="joinCode" placeholder="enter the 6 digit join code" />
          </form>
          <div class="flex w-full justify-end gap-2">
            <button class="du-btn du-btn-sm" @click="openJoinMenu = false">cancel</button>
            <button class="du-btn du-btn-sm bg-green-accent" form="joinCodeForm" type="submit">join</button>
          </div>
        </div>
      </div>
    </Transition>

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
          <button @click="toggleTheme">toggle theme</button>
          <button v-show="route.path === '/student/dashboard'" @click="openJoinMenu = true" class="text-5xl"><img class="w-8 h-8 dark:invert" src="/ui/plus.svg" alt="Join a new course" /></button>
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
const openJoinMenu = ref(false);
const joinCode = ref("");
watch(joinCode, (input) => {
  if (input.length > 6) return (joinCode.value = String(input).slice(0, 6));

  joinCode.value = [...String(input)].filter((char) => !isNaN(Number(char))).join("");
  // if (input.length == 6) joinCourse(); // i don't like this
});

onMounted(() => {
  loaded.value = true;
});

function joinCourse() {
  if (!joinCode.value) return;
  alert("you are now enrolled in jail!");
  // make it join a class 👍
  // no way really? i think it should join a course instead
}

function toggleTheme() {
  const wasLight = store.theme === "light";
  store.theme = wasLight ? "dark" : "light";
  document.body.classList[wasLight ? "add" : "remove"]("dark");
  localStorage.setItem("theme", store.theme);
}
</script>

<style scoped>
.join-menu-scale-enter-active,
.join-menu-scale-leave-active {
  transition: all 0.2s ease-in-out;
}

.join-menu-scale-enter-from,
.join-menu-scale-leave-to {
  opacity: 0;
}

.join-menu-scale-enter-from .join-menu,
.join-menu-scale-leave-to .join-menu {
  transform: scale(0.75);
}

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
