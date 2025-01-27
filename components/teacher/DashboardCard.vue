<template>
  <div
    class="flex w-[45rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-[var(--faded-bg-color)] transition-all duration-300 ease-in-out hover:border-[var(--primary)] hover:shadow-lg hover:dark:shadow-[var(--gray)]"
  >
    <div class="flex h-24 w-full flex-col items-center justify-end p-2 drop-shadow-md" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="w-full overflow-hidden overflow-ellipsis text-nowrap text-center text-2xl font-semibold">{{ course.name }}</h2>
      <p class="text-sm">Period {{ course.period }}</p>
      <p>{{ course.teacher }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ course: TeacherCourse }>();
</script>

<style scoped>
.assignment {
  display: grid;
  gap: 0.8ch;
  grid-template-columns: min-content auto;
  padding: 2px 0;
}
</style>
