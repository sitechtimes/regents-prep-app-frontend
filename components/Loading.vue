<template>
  <Transition name="opacity">
    <div v-if="show" class="pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-color)] bg-opacity-85">
      <div class="flex space-x-3">
        <div class="loading delay-1 h-6 w-6 rounded-full bg-green-accent"></div>
        <div class="loading delay-2 h-6 w-6 rounded-full bg-green-accent"></div>
        <div class="loading delay-3 h-6 w-6 rounded-full bg-green-accent"></div>
      </div>
      <p class="mt-4 text-2xl font-bold text-[var(--text-color)] opacity-90">Loading...</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  /** When to show the loading screen */
  show: boolean;
}>();
</script>

<style scoped>
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-50%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.delay-1 {
  animation-delay: 0s;
}

.delay-2 {
  animation-delay: 0.2s;
}

.delay-3 {
  animation-delay: 0.4s;
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation: bounce 1s infinite;
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.5s ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
