<template>
  <div class="flex w-full flex-col items-center justify-center gap-8 p-4">
    <div v-if="currentAssignment" class="flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold">{{ currentAssignment.name }}</h1>
      <p class="mt-3 text-neutral-700">Assigned {{ formatDate(currentAssignment.dateAssigned, currentDate) }}</p>
      <p class="text-neutral-700">Due {{ formatDate(currentAssignment.dueDate, currentDate) }}</p>
    </div>

    <div class="flex w-2/3 flex-col items-center justify-center gap-8">
      <TeacherAssignmentStatsCompletionBar :current-assignment="currentAssignment" />

      <div v-if="currentAssignmentStats" class="flex w-full items-center justify-center">
        <!-- TODO: make it like a tab thing -->
        <button type="button" @click="currentTab = 'students'">Students</button>
        <div :class="{ 'du-tooltip': !currentAssignmentStats.guaranteedQuestions.length }" data-tip="Only enabled for assignments with guaranteed questions">
          <button type="button" :disabled="!currentAssignmentStats.guaranteedQuestions.length" @click="currentTab = 'questions'">Questions</button>
        </div>
      </div>

      <TeacherAssignmentStatsStudentsTab v-if="currentTab === 'students'" />
      <TeacherAssignmentStatsQuestionsTab v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course"
});

const userStore = useUserStore();
const { teacherCurrentCourse } = storeToRefs(userStore);
const route = useRoute();

const currentDate = new Date();

const assignmentId = Number(route.params.assignmentId);
const currentAssignment = computed(() => teacherCurrentCourse.value?.assignments.find((assignment) => assignment.id === assignmentId));
const currentAssignmentStats = ref<StaticTeacherAssignmentStatistic | DynamicTeacherAssignmentStatistic>();

const currentTab = ref<"students" | "questions">("students");

onMounted(async () => {
  const { data, error } = await tryCatch(getTeacherQuestionStatistic(assignmentId));
  if (error) return console.error(error);
  console.log(data);
  currentAssignmentStats.value = data;
});
</script>

<style scoped></style>
