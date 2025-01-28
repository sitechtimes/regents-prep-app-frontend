<template>
  <div
    class="hover:[scale-[1.02]] mb-2 cursor-pointer rounded-lg border border-gray-200 bg-gray-100 p-2 shadow-sm transition duration-500 hover:shadow-lg hover:shadow-[var(--gray)] dark:border-dark-border dark:bg-dark-hover"
  >
    <p class="text-center font-medium">{{ assignment.name }}</p>
    <p class="text-center">Due: {{ formatDate(assignment.dueDate, currentDate) }}</p>
    <div class="mt-2 text-center">
      <span class="mr-1 font-semibold">Class Submissions:</span>
      <div class="mt-1 inline-block rounded-full border border-gray-400 px-2 py-1 dark:border-gray-500">{{ assignment.numSubmitted }}/{{ course.students ?? 0 }} Students</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  course: TeacherCourse;
  assignment: TeacherAssignment;
  currentDate: Date;
}>();
</script>

<style scoped></style>
