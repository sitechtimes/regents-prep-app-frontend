<template>
  <!--   <div class="min-h-screen w-screen">
    <div class="flex min-h-screen w-screen flex-col items-center justify-start">
      <header class="sticky top-0 z-[100] flex h-16 w-full items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-color)] px-5">
        <div class="flex items-center justify-start gap-3">
          <button type="button" @click="showSideMenu = !showSideMenu">
            <img class="h-12 w-12 dark:invert" src="/ui/hamburger.svg" alt="Open navigation menu" />
          </button>
          <NuxtLink
            v-if="loaded && studentCurrentCourse"
            :to="`/student/course/${studentCurrentCourse.id}`"
            class="hidden flex-col items-start justify-center hover:underline hover:underline-offset-1 sm:block"
          >
            <h4 class="text-xl font-medium">{{ studentCurrentCourse.name }}</h4>
            <p class="text-sm">Period {{ studentCurrentCourse.period }}</p>
          </NuxtLink>
        </div>
        <div class="flex w-[40px] items-center justify-center">
          <NuxtLink to="/student/dashboard" class="flex content-center border-b-2 border-transparent text-3xl transition-all duration-500 ease-in-out hover:border-current">
            <div class="flex items-center justify-center p-1 text-3xl sm:text-5xl">SITHS</div>
            <div class="flex items-center justify-center p-1 text-3xl sm:text-5xl">|</div>
            <div class="flex items-center justify-center p-1 text-base sm:text-2xl">Regents Prep</div>
          </NuxtLink>
        </div>
        <div class="flex items-center justify-end gap-3">
          <StudentJoinClass :show="showJoinClass" @close="showJoinClass = false" />
          <button v-show="route.path === '/student/dashboard'" id="join-button" type="button" @click="showJoinClass = !showJoinClass">
            <img class="h-8 w-8 dark:invert" src="/ui/plus.svg" alt="Join a new course" />
          </button>
          <ToggleTheme />
          <AccountSettings class="mr-3" />
        </div>
      </header> -->
  <div class="min-h-dvh w-full">
    <div class="flex min-h-dvh w-full flex-col items-center justify-start">
      <StudentDashboardHeader @toggle-side-menu="showSideMenu = !showSideMenu" />

      <div class="relative flex h-full w-full items-start justify-between">
        <StudentDashboardSidebar :show-side-menu="showSideMenu" :loaded="loaded" />
        <div class="h-full min-h-[calc(100dvh-4rem)] w-full p-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loaded = ref(false);
const showSideMenu = ref(true);

onMounted(() => (loaded.value = true));

// for vitest
defineExpose({ loaded, showSideMenu });
</script>

<style scoped></style>
