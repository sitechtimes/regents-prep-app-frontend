<template>
  <div class="du-tooltip du-tooltip-bottom flex size-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-neutral-200 dark:hover:bg-neutral-700" data-tip="Theme">
    <label class="du-swap du-swap-rotate">
      <input type="checkbox" class="theme-controller" value="synthwave" @click="isDarkMode = !isDarkMode" />
      <img class="du-swap-off size-9 fill-current p-1" src="/ui/sun.svg" alt="Switch to dark mode" />
      <img class="du-swap-on size-9 fill-current p-1 invert" src="/ui/moon.svg" alt="Switch to light mode" />
    </label>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { isDarkMode } = storeToRefs(userStore);
</script>

<style scoped></style>
