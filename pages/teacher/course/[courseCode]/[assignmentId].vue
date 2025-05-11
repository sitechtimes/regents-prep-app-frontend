<template>
  <div class="flex w-full flex-col items-center justify-center gap-8 p-4">
    <div v-if="currentAssignment" class="flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold">{{ currentAssignment.name }}</h1>
      <p class="mt-3 text-neutral-700">Assigned {{ formatDate(currentAssignment.dateAssigned, currentDate) }}</p>
      <p class="text-neutral-700">Due {{ formatDate(currentAssignment.dueDate, currentDate) }}</p>
    </div>

    <div class="flex w-2/3 flex-col items-center justify-center gap-8">
      <TeacherAssignmentStatsCompletionBar :current-assignment="currentAssignment" />

      <div v-if="currentAssignmentStats" class="flex w-full items-center justify-start">
        <!-- TODO: make it like a tab thing -->
        <button type="button" :class="['px-2 text-lg transition-all duration-300 ease-in-out', { underline: currentTab === 'students' }]" @click="currentTab = 'students'">Students</button>
        <div :class="{ 'du-tooltip': !currentAssignmentStats.guaranteedQuestions.length }" data-tip="Only enabled for assignments with guaranteed questions">
          <button
            type="button"
            :disabled="!currentAssignmentStats.guaranteedQuestions.length"
            :class="['px-2 text-lg transition-all duration-300 ease-in-out', { underline: currentTab === 'questions' }]"
            @click="currentTab = 'questions'"
          >
            Questions
          </button>
        </div>
      </div>

      <TeacherAssignmentStatsStudentsTab v-if="currentTab === 'students'" :current-assignment="currentAssignment" :assignment-id="assignmentId" />
      <TeacherAssignmentStatsQuestionsTab v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course",
  requiresAuth: true,
  redirectIfAuth: false
});

const userStore = useUserStore();
const { teacherCurrentCourse } = storeToRefs(userStore);
const route = useRoute();

const currentDate = new Date();

const assignmentId = Number(route.params.assignmentId);
const currentAssignment = computed(() => teacherCurrentCourse.value?.assignments.find((assignment) => assignment.id === assignmentId));
const currentAssignmentStats = ref<StaticTeacherAssignmentStatistic | DynamicTeacherAssignmentStatistic>();

const currentTab = ref<"students" | "questions">("students");

useSeoMeta({
  title: () => `${teacherCurrentCourse.value?.name ?? "Class Details"} - ${currentAssignment.value?.name ?? "Assignment"}`
});

onMounted(async () => {
  const { data, error } = await tryCatch(getTeacherQuestionStatistic(assignmentId, true));
  if (error) return console.error(error);
  currentAssignmentStats.value = data;
});
</script>

<style scoped></style>
