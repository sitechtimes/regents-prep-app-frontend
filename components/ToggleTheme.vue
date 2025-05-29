<template>
  <div
    class="du-tooltip du-tooltip-bottom flex size-9 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
    :data-tip="isDarkMode ? 'Dark' : 'Light'"
  >
    <label class="du-swap du-swap-rotate">
      <input type="checkbox" class="theme-controller" value="synthwave" :checked="isDarkMode" @click="toggleTheme(name)" />
      <img class="du-swap-off size-9 fill-current p-1 dark:invert" src="/ui/sun.svg" alt="Switch to dark mode" draggable="false" />
      <img class="du-swap-on size-9 fill-current p-1 dark:invert" src="/ui/moon.svg" alt="Switch to light mode" draggable="false" />
    </label>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { isDarkMode, name } = storeToRefs(userStore);
const { toggleTheme, initTheme, listenToThemeChanges } = userStore;

onMounted(() => {
  initTheme(name.value);
  listenToThemeChanges();
});
</script>

<style scoped></style>
