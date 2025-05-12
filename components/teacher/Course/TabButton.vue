<template>
  <button
    class="w-1/2 translate-y-0.5 border-b-4 p-2 px-8 text-lg font-semibold capitalize transition md:text-2xl"
    :class="{ 'text-neutral-500 grayscale hover:grayscale-[.66]': currentTab !== tabName }"
    :style="{ borderColor: subjectColors[course.subject] }"
    type="button"
    @click="emit('switchTab', tabName)"
  >
    {{ tabName }}
  </button>
</template>

<script setup lang="ts">
type TabName = "current" | "past";

defineProps<{
  tabName: TabName;
  currentTab: TabName;
  course: TeacherCourse;
}>();
const emit = defineEmits<{ switchTab: [TabName] }>();
</script>

<style scoped></style>
