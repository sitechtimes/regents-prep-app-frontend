<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-full max-w-sm rounded-lg bg-white p-6">
      <h2 class="mb-4 text-xl font-semibold">{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="mt-4 flex justify-end gap-4">
        <button type="button" class="rounded-md bg-gray-500 px-4 py-2 text-white" @click="cancel">Cancel</button>
        <button type="button" class="rounded-md bg-red-500 px-4 py-2 text-white" @click="confirmAction">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isVisible: boolean;
  title: string;
  message: string;
  action?: () => void;
}

const props = defineProps<Props>();

const action =
  props.action ??
  (() => {
    console.warn("No action provided for DeleteModal");
  });

const emit = defineEmits<(event: "update:isVisible", value: boolean) => void>();

function cancel() {
  emit("update:isVisible", false);
}

function confirmAction() {
  action();
  emit("update:isVisible", false);
}
</script>

<style scoped>
/* Modal styles */
</style>
