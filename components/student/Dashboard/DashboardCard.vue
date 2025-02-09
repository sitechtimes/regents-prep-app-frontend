<template>
  <NuxtLink
    :to="`/student/course/${course.id}`"
    class="hover:border-border-neutral-500 bg-body flex w-80 flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-300 transition hover:shadow-lg"
    type="button"
  >
    <div class="flex h-24 w-full flex-col items-center justify-end p-2" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="w-72 overflow-hidden overflow-ellipsis text-nowrap text-center text-2xl font-semibold">{{ course.name }}</h2>
      <p class="text-sm">Period {{ course.period }}</p>
      <p>{{ course.teacher }}</p>
    </div>

    <div class="flex h-full min-h-36 w-full flex-col items-center justify-start p-2">
      <h3 class="pb-2 pt-1 text-xl font-bold">Assignments</h3>

      <div v-if="assignments.length > 0" class="flex h-full w-full flex-wrap items-start justify-around gap-3 px-3 pb-3">
        <NuxtLink
          v-for="assignment in assignments"
          :key="assignment.id"
          :to="`/student/course/${course.id}/${assignment.id}`"
          class="flex h-full w-full flex-col items-center justify-center rounded-xl border border-neutral-300 p-3 hover:shadow-lg"
          @click.stop
        >
          <p class="text-center text-sm text-neutral-700" :title="assignment.assignment.dueDate.toLocaleString()">Due {{ formatDate(assignment.assignment.dueDate, currentTime) }}</p>

          <div class="flex h-full w-full flex-col items-center justify-start gap-3">
            <p class="w-64 overflow-hidden overflow-ellipsis text-nowrap text-center text-xl font-semibold">{{ assignment.assignment.name }}</p>

            <div class="flex w-full items-center justify-between gap-2">
              <span class="shrink-0">Progress: {{ assignment.questionsCompleted }}/{{ assignment.assignment.numOfQuestions }}</span>
              <div class="flex h-4 w-full items-start overflow-hidden rounded-full bg-neutral-300">
                <div class="h-full" :style="{ width: (assignment.questionsCompleted / assignment.assignment.numOfQuestions) * 100 + '%', backgroundColor: subjectColors[course.subject] }"></div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <p v-else>No assignments</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ course: StudentCourse }>();

const currentTime = new Date();

const assignments = computed(() =>
  [...props.course.assignments]
    .filter((assignment) => assignment.dateSubmitted === null && assignment.assignment.dueDate >= currentTime)
    .sort((a, b) => a.assignment.dueDate.getTime() - b.assignment.dueDate.getTime())
    .slice(0, 2)
);
</script>

<style scoped>
.assignment {
  display: grid;
  gap: 0.8ch;
  grid-template-columns: min-content auto;
  padding: 2px 0;
}
</style>
