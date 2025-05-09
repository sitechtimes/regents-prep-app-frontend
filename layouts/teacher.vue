<template>
  <div class="min-h-dvh w-full">
    <div class="flex min-h-dvh w-full flex-col items-center justify-start">
      <TeacherDashboardHeader @toggle-side-menu="showSideMenu = !showSideMenu" />

      <div class="relative flex h-full w-full items-start justify-between">
        <TeacherDashboardSidebar :show-side-menu="showSideMenu" :loaded="loaded" />
        <div class="h-full min-h-[calc(100dvh-4rem)] w-full p-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const userStore = useUserStore();
const { showSideMenu } = storeToRefs(userStore);

const loaded = ref(false);
const router = useRouter();

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

  router.afterEach(() => {
    checkScreenSize();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize); // Clean up the event listener
});

// for vitest
defineExpose({ loaded, showSideMenu });
</script>

<style scoped></style>
