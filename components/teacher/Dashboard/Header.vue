<template>
  <header class="sticky top-0 z-20 grid h-16 w-full grid-cols-3 border-b border-neutral-300 bg-body px-5 dark:border-neutral-600">
    <div class="flex items-center justify-start gap-3">
      <button
        type="button"
        class="group du-tooltip du-tooltip-bottom flex size-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
        data-tip="Menu"
        @click="emit('toggleSideMenu')"
      >
        <img class="size-8 transition group-active:scale-95 dark:invert" src="/ui/hamburger.svg" alt="Open navigation menu" />
      </button>
    </div>

    <div class="flex items-center justify-center">
      <NuxtLink to="/teacher/dashboard" class="group flex items-center justify-center gap-2">
        <span class="text-2xl font-semibold transition duration-300 group-hover:-translate-x-0.5">Regents</span>
        <img class="size-12 rounded-full transition duration-300 group-hover:shadow-md group-active:scale-95" src="/siths.png" aria-hidden="true" />
        <span class="text-2xl font-semibold transition duration-300 group-hover:translate-x-0.5">Prep</span>
      </NuxtLink>
    </div>

    <div class="flex items-center justify-end gap-3">
      <StudentDashboardJoinClass :show="showClassModal" @close="showClassModal = false" />
      <button
        v-show="route.path === '/teacher/dashboard'"
        id="join-button"
        type="button"
        class="group du-tooltip du-tooltip-bottom flex size-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
        data-tip="Join a class"
        @click="showClassModal = !showClassModal"
      >
        <img class="size-7 transition group-active:scale-90 dark:invert" src="/ui/plus.svg" alt="Join a new course" />
      </button>
      <ToggleTheme />
      <AccountSettings />
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{ toggleSideMenu: [void] }>();

const route = useRoute();

const showClassModal = ref(false);
</script>

<style scoped></style>
