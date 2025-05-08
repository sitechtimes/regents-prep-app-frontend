<template>
  <div class="min-h-dvh w-full">
    <div class="flex min-h-dvh w-full flex-col items-center justify-start">
      <StudentDashboardHeader @toggle-side-menu="showSideMenu = !showSideMenu" />

      <div class="relative flex h-full w-full items-start justify-between">
        <StudentDashboardSidebar :show-side-menu="showSideMenu" :loaded="loaded" class="flex-none overflow-x-hidden" />
        <div class="h-full min-h-[calc(100dvh-4rem)] min-w-0 flex-grow p-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { showSideMenu } = storeToRefs(userStore);

const loaded = ref(false);

const checkScreenSize = () => {
  if (window.innerWidth < 768) {
    showSideMenu.value = false; // Start closed on small screens
  } else {
    showSideMenu.value = true; // Start open on larger screens
  }
};

onMounted(() => {
  loaded.value = true;
  checkScreenSize(); // Initial check to set the sidebar state
  window.addEventListener("resize", checkScreenSize); // Listen for window resize
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize); // Clean up the event listener
});
// for vitest
defineExpose({ loaded, showSideMenu });
</script>

<style scoped></style>
