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
const loaded = ref(false);
const showSideMenu = ref(true);

onMounted(() => (loaded.value = true));

// for vitest
defineExpose({ loaded, showSideMenu });
</script>

<style scoped></style>
