<template>
  <button
    class="translate-y-0.5 border-b-4 p-2 px-8 text-2xl font-semibold capitalize transition"
    :class="{ 'text-neutral-500 grayscale hover:grayscale-[.66]': currentTab !== tabName }"
    :style="{ borderColor: subjectColors[course.subject] }"
    type="button"
    @click="emit('switchTab', tabName)"
  >
    {{ tabName }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  tabName: string;
  currentTab: string;
  course: TeacherCourse;
}>();
const emit = defineEmits<{ switchTab: [string] }>();
</script>

<style scoped></style>
