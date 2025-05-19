<template>
  <div class="grow">
    <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" :class="{ invisible: !label }" :for="kebabLabel"
      >{{ label }} <span v-if="required" title="Required" class="text-red-500">*</span></label
    >
    <div class="w-full" :class="{ 'du-tooltip': warn }" :data-tip="warn">
      <input
        :id="kebabLabel"
        v-model="model"
        required
        :type="type"
        class="du-input w-full border-neutral-400 bg-neutral-200 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
        :class="{ 'border-red-500 hover:border-red-500 focus:border-red-500 dark:border-red-600 dark:hover:border-red-500': warn }"
        :placeholder="placeholder"
        :min="min"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: "text" | "number" | "date" | "time";
  label?: string;
  required?: boolean;
  placeholder?: string;
  min?: string | number;
  step?: string | number;
  warn?: string | null;
  disabled?: boolean;
}>();

const model = defineModel();
const kebabLabel = computed(() =>
  props.label
    ?.toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll(/[\(\)]/g, "")
); // replace spaces with hyphens and remove parantheses
</script>

<style scoped></style>
