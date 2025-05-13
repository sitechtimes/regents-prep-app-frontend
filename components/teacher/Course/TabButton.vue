<template>
  <button
    class="border-b-4 px-4 text-lg font-semibold capitalize transition lg:text-2xl"
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
