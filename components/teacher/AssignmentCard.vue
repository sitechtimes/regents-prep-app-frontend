<template>
  <div class="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-gray-100 dark:bg-gray-900 shadow-md transition duration-500 hover:scale-105 mb-2 cursor-pointer">
    <p class="font-medium text-center">{{ assignment.name }}</p>
    <p class="text-center">Due: {{ formatDate(assignment.dueDate, currentDate) }}</p>
    <div class="text-center mt-2">
      <span class="font-semibold mr-1">Class Submissions:</span>
      <div class="border border-gray-400 dark:border-gray-500 rounded-full px-2 py-1 inline-block mt-1">{{ assignment.numSubmitted }}/{{ (course as TeacherCourse).students ?? 0 }} Students</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  course: StudentCourse | TeacherCourse;
  assignment: TeacherAssignment;
  currentDate: Date;
}>();
</script>

<style scoped></style>
