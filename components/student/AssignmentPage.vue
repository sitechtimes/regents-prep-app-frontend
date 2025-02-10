<template>
  <Teleport to="body">
    <Transition name="menu-scale">
      <div v-show="show" class="fixed left-0 top-0 z-50 flex h-dvh w-screen items-center justify-center bg-body">
        <div class="flex h-full w-100 flex-col items-start justify-start border-r border-neutral-300 bg-neutral-100/50">
          <button class="my-4 ml-4 flex items-center justify-center gap-2 rounded-xl px-5 py-2 hover:bg-neutral-200" type="button">
            <img class="size-4" src="/ui/arrowLeft.svg" aria-hidden="true" />
            Back to dashboard
          </button>
        </div>
        <div class="h-full w-full"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>();
</script>

<style scoped>
.menu-scale-enter-active,
.menu-scale-leave-active {
  transition: all 0.2s ease-in-out;
}

.menu-scale-enter-from,
.menu-scale-leave-to {
  opacity: 0;
  transform: scale(0.75);
}
</style>
