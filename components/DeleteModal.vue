<template>
  <Transition name="join-menu-scale">
    <div v-if="showModal" class="join-menu-bg fixed left-0 top-0 z-[51] flex min-h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.15)]">
      <div class="w-96 rounded-2xl bg-white p-6 text-center shadow-lg">
        <h2 class="mb-2 text-xl font-semibold">Confirm Deletion</h2>
        <p class="mb-4 text-gray-600">{{ step === 1 ? "Are you sure you want to delete this?" : "Are you really sure?" }}</p>
        <div class="flex justify-center gap-4">
          <button v-if="step === 1" class="du-btn du-btn-md bg-red-500 px-4 py-2 text-white hover:bg-red-600" type="button" @click="step++">Confirm</button>
          <button v-else class="du-btn du-btn-md bg-red-500 text-white hover:bg-red-600" type="button" @click="confirm">Yes, Delete</button>
          <button class="du-btn du-btn-md" type="button" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const step = ref<1 | 2>(1);
const emit = defineEmits<{ confirm: [void] }>();
const showModal = defineModel<boolean>();

function closeModal() {
  showModal.value = false;
  step.value = 1;
}

function confirm() {
  emit("confirm");
  closeModal();
}
</script>
