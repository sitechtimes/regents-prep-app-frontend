<template>
  <div class="flex w-full flex-col items-center justify-center gap-8 p-4">
    <div v-if="currentAssignment" class="flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold">{{ currentAssignment.name }}</h1>
      <p class="mt-3 text-neutral-700">Assigned {{ formatDate(currentAssignment.dateAssigned, currentDate) }}</p>
      <p class="text-neutral-700">Due {{ formatDate(currentAssignment.dueDate, currentDate) }}</p>
    </div>

    <div class="flex w-2/3 flex-col items-center justify-center gap-8">
      <div v-if="teacherCurrentCourse && currentAssignment" class="relative flex h-7 w-full items-center justify-center">
        <div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <div
            v-if="currentAssignment.numSubmitted !== teacherCurrentCourse.numStudents"
            class="du-tooltip z-[1] h-full rounded-full"
            :style="{ width: `${((teacherCurrentCourse.numStudents - currentAssignment.numSubmitted) / teacherCurrentCourse.numStudents) * 100}%` }"
            :data-tip="`${teacherCurrentCourse.numStudents - currentAssignment.numSubmitted} students did not submit`"
          ></div>
          <div
            v-if="currentAssignment.numSubmitted"
            class="du-tooltip z-[1] h-full rounded-full"
            :style="{ width: `${(currentAssignment.numSubmitted / teacherCurrentCourse.numStudents) * 100}%` }"
            :data-tip="`${currentAssignment.numSubmitted} students submitted`"
          ></div>
        </div>

        <div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-neutral-300">
          <div
            v-if="currentAssignment.numSubmitted !== teacherCurrentCourse.numStudents"
            class="flex h-full items-center justify-center bg-neutral-400"
            :style="{ width: `${((teacherCurrentCourse.numStudents - currentAssignment.numSubmitted) / teacherCurrentCourse.numStudents) * 100}%` }"
            :data-tip="`${teacherCurrentCourse.numStudents - currentAssignment.numSubmitted} students did not submit`"
          >
            <p class="text-bold text-xl">{{ teacherCurrentCourse.numStudents - currentAssignment.numSubmitted }}</p>
          </div>
          <div
            v-if="currentAssignment.numSubmitted"
            class="du-tooltip flex h-full items-center justify-center"
            :style="{ backgroundColor: subjectColors[teacherCurrentCourse.subject], width: `${(currentAssignment.numSubmitted / teacherCurrentCourse.numStudents) * 100}%` }"
            :data-tip="`${currentAssignment.numSubmitted} students submitted`"
          >
            <p class="text-bold text-xl">{{ currentAssignment.numSubmitted }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course"
});

const userStore = useUserStore();
const { teacherCourses, teacherCurrentCourse } = storeToRefs(userStore);
const route = useRoute();

const currentDate = new Date();

const assignmentId = Number(route.params.assignmentId);
const currentAssignment = computed(() => teacherCurrentCourse.value?.assignments.find((assignment) => assignment.id === assignmentId));
const currentAssignmentStats = ref<StaticTeacherAssignmentStatistic | DynamicTeacherAssignmentStatistic>();

onMounted(async () => {
  const { data, error } = await tryCatch(getTeacherQuestionStatistic(assignmentId));
  if (error) return console.error(error);
  currentAssignmentStats.value = data;
});
</script>

<style scoped></style>
