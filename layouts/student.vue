<template>
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
</script>

<style scoped></style>
