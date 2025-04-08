<template>
  <div class="relative w-full">
    <NuxtLink
      class="flex h-fit w-full flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-300 py-4 hover:border-neutral-600 hover:shadow-lg sm:flex-row sm:p-6 dark:border-neutral-600 dark:hover:border-neutral-300"
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

    <div class="absolute right-2 top-1 z-10 flex items-center gap-2">
      <div v-if="showDelete" class="scale-[0.75]">
        <TeacherAssignmentCatalogQuestionButton img="/ui/trash.svg" text="Delete" :click-function="() => emit('deleteAssignment', assignment.id)" />
      </div>
      <button class="rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700" type="button" @click="showDelete = !showDelete">
        <img src="/ui/ellipsisVertical.svg" alt="More options" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  course: TeacherCourse;
  assignment: TeacherAssignment;
  currentDate: Date;
}>();
const emit = defineEmits<{ deleteAssignment: [number] }>();
const showDelete = ref(false);
</script>

<style scoped></style>
