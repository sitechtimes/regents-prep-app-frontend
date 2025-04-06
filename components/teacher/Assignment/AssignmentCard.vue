<template>
  <div class="relative w-full">
    <NuxtLink
      class="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-300 py-4 hover:border-neutral-600 hover:shadow-lg sm:flex-row sm:p-6 dark:border-neutral-600 dark:hover:border-neutral-300"
      :to="`/teacher/course/${course.id}/${assignment.id}`"
    >
      <div class="flex w-5/6 flex-col items-start justify-start">
        <h3 class="w-full overflow-hidden overflow-ellipsis text-nowrap text-2xl font-semibold">
          {{ assignment.name }}
        </h3>
        <ClientOnly>
          <p :title="assignment.dueDate.toLocaleString()">Due {{ formatDate(assignment.dueDate, currentDate) }}</p>
        </ClientOnly>
      </div>

      <div class="flex w-5/6 flex-col items-center justify-center gap-1">
        <p class="text-xl font-medium">
          Submissions: {{ assignment.numSubmitted }}/{{ course.numStudents }}
          <span class="text-sm">students</span>
        </p>
        <div class="relative h-2 w-full overflow-hidden rounded-full border border-neutral-300 bg-neutral-100/25">
          <div class="absolute left-0 top-0 h-full" :style="{ width: `${(assignment.numSubmitted / course.numStudents) * 100}%`, backgroundColor: subjectColors[course.subject] }"></div>
        </div>
      </div>
    </NuxtLink>

    <div class="absolute right-2 top-2 z-10 scale-[0.75]">
      <TeacherAssignmentCatalogQuestionButton img="/ui/trash.svg" text="Delete" :click-function="() => onDelete(assignment.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  course: TeacherCourse;
  assignment: TeacherAssignment;
  currentDate: Date;
  onDelete: (assignmentId: number) => void;
}>();
</script>

<style scoped></style>
