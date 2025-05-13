<template>
  <div class="min-h-dvh w-full">
    <div class="flex min-h-dvh w-full flex-col items-center justify-start">
      <TeacherDashboardHeader @toggle-side-menu="showSideMenu = !showSideMenu" />

      <div class="relative flex h-full w-full items-start justify-between">
        <TeacherDashboardSidebar :show-side-menu="showSideMenu" :loaded="loaded" />
        <div class="min-h-[calc(100vh-4rem)] w-full p-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const userStore = useUserStore();
const { showSideMenu } = storeToRefs(userStore);

const loaded = ref(false);

router.afterEach(() => {
  if (window.innerWidth < 540) showSideMenu.value = false;
});

onMounted(() => (loaded.value = true));

// for vitest
defineExpose({ loaded, showSideMenu });
</script>

<style scoped></style>
