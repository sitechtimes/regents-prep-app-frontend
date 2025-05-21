<template>
  <Teleport to="body">
    <Transition :name="transitionName">
      <div v-if="showModal" class="fixed left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-black/50" @click="emit('close')">
        <div class="menu relative flex flex-col items-center justify-center gap-4 rounded-xl bg-body p-8" :class="customWidthClass ?? 'w-80 xs:w-96 sm:w-125'" @click.stop>
          <button class="absolute right-2 top-2" type="button" @click="emit('close')">
            <img class="size-8 dark:invert" src="/ui/close.svg" aria-hidden="true" />
          </button>

          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  transitionName: "scale-75" | "slide-up-screen";
  /** When to trigger the modal. */
  showModal: boolean;
  /** Override the default width scale with a custom class. */
  customWidthClass?: string;
}>();
const emit = defineEmits<{ close: [void] }>();
</script>

<style scoped>
.scale-75-enter-from .menu,
.scale-75-leave-to .menu,
.slide-up-screen-enter-from .menu,
.slide-up-screen-leave-to .menu {
  transition: all 0.2s ease-in-out;
}

.scale-75-enter-active,
.scale-75-leave-active,
.slide-up-screen-enter-active,
.slide-up-screen-leave-active {
  transition: all 0.2s ease-in-out;
}

.scale-75-enter-from,
.scale-75-leave-to,
.slide-up-screen-enter-from,
.slide-up-screen-leave-to {
  opacity: 0;
}

.scale-75-enter-from .menu,
.scale-75-leave-to .menu {
  transform: scale(0.75);
}

.slide-up-screen-enter-from .menu,
.slide-up-screen-leave-to .menu {
  transform: translateY(100dvh);
}
</style>
