<template>
  <div class="fo-input-group max-w-sm">
    <label class="fo-input-group-text capitalize" :for="label">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<style scoped></style>
