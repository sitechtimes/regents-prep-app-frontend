<template>
  <Transition name="join-menu-scale">
    <div v-if="showModal" class="join-menu-bg fixed left-0 top-0 z-[51] flex min-h-screen w-screen items-center justify-center bg-black/15">
      <div class="w-96 rounded-2xl bg-white p-6 text-center shadow-lg">
        <h2 class="mb-2 text-xl font-semibold">Password Reset Successful!</h2>
        <p class="mb-4 text-gray-600">Click OK to continue.</p>
        <div class="flex justify-center gap-4">
          <button class="du-btn du-btn-md text-white" type="button" @click="confirm">OK</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits<{ confirm: [void] }>();
const showModal = defineModel<boolean>();

function confirm() {
  emit("confirm");
  showModal.value = false;
}
</script>

<style scoped>
.join-menu-scale-enter-active,
.join-menu-scale-leave-active {
  transition: all 0.2s ease-in-out;
}

.join-menu-scale-enter-from,
.join-menu-scale-leave-to {
  opacity: 0;
}

.join-menu-scale-enter-from .join-menu,
.join-menu-scale-leave-to .join-menu {
  transform: scale(0.75);
}

.du-btn {
  @apply rounded-2xl;
}
</style>
