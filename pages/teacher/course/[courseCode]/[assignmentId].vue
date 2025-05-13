<template>
  <div v-if="teacherCurrentCourse" class="flex w-full flex-col items-center justify-center gap-8 p-4">
    <div v-if="currentAssignment" class="flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold">{{ currentAssignment.name }}</h1>
      <p class="text-neutral- mt-3 dark:text-neutral-300">Assigned {{ formatDate(currentAssignment.dateAssigned, currentDate) }}</p>
      <p class="text-neutral-700 dark:text-neutral-300">Due {{ formatDate(currentAssignment.dueDate, currentDate) }}</p>
    </div>

    <div class="flex w-2/3 flex-col items-center justify-center gap-8">
      <TeacherAssignmentStatsCompletionBar :current-assignment="currentAssignment" />

      <div v-if="currentAssignmentStats" class="flex w-full items-start justify-start border-b border-neutral-300">
        <TeacherCourseTabButton :course="teacherCurrentCourse" tab-name="students" :current-tab="currentTab" @switch-tab="(tab) => (currentTab = tab as 'students' | 'questions')" />
        <TeacherCourseTabButton
          :disabled="!currentAssignmentStats.guaranteedQuestions.length"
          :class="{ 'du-tooltip': !currentAssignmentStats.guaranteedQuestions.length }"
          data-tip="Only enabled for assignments with guaranteed questions"
          :course="teacherCurrentCourse"
          tab-name="questions"
          :current-tab="currentTab"
          @switch-tab="(tab) => (currentTab = tab as 'students' | 'questions')"
        />
      </div>

      <TeacherAssignmentStatsStudentsTab v-show="currentTab === 'students'" :current-assignment="currentAssignment" :assignment-id="assignmentId" />
      <TeacherAssignmentStatsQuestionsTab v-show="currentTab === 'questions'" :current-assignment-stats="currentAssignmentStats" />
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
// * .assignments?.find needs to be optionally chained cuz who knows
const currentAssignment = computed(() => teacherCurrentCourse.value?.assignments?.find((assignment) => assignment.id === assignmentId));
const currentAssignmentStats = ref<TeacherAssignmentStatistic>();

const currentTab = ref<"students" | "questions">("students");
watch(currentTab, (tab) => void changeRouteQuery({ t: tab }));
watch(
  () => route.query,
  (query) => (currentTab.value = String(query.t) === "questions" ? "questions" : "students")
);

useSeoMeta({
  title: () => `${teacherCurrentCourse.value?.name ?? "Class Details"} - ${currentAssignment.value?.name ?? "Assignment"}`
});

onMounted(async () => {
  const { data, error } = await tryCatch(getTeacherQuestionStatistic(assignmentId, true));
  if (error) return console.error(error);

  if (data.guaranteedQuestions.length && String(route.query.t) === "questions") currentTab.value = "questions";
  else await changeRouteQuery({ t: "students" });
  currentAssignmentStats.value = data;
});
</script>

<style scoped></style>
