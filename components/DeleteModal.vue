<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-96 rounded-2xl bg-white p-6 text-center shadow-lg">
        <h2 class="mb-2 text-xl font-semibold">Confirm Deletion</h2>
        <p class="mb-4 text-gray-600">{{ step === 1 ? "Are you sure you want to delete this?" : "Are you really sure?" }}</p>
        <div class="flex justify-center gap-4">
          <button v-if="step === 1" class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" type="button" @click="step++">Confirm</button>
          <button v-if="step === 2" class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" type="button" @click="confirm">Yes, Delete</button>
          <button class="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400" type="button" @click="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "confirm"): void;
}>();

const step = ref(1);

function confirm() {
  emit("confirm");
  emit("update:modelValue", false);
  step.value = 1;
}

function cancel() {
  emit("update:modelValue", false);
  step.value = 1;
}
</script>
