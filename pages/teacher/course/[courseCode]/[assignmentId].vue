<template>
  <div class="flex min-h-screen items-center justify-center">
    <img src="https://bigrat.monster/media/bigrat.png" />
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

const assignmentId = Number(route.params.assignmentId);
const currentAssignment = computed(() => teacherCurrentCourse.value?.assignments.find((assignment) => assignment.id === assignmentId));

onMounted(async () => {
  const a = await getTeacherQuestionStatistic(assignmentId);
  // a.statisticsData.
  console.log(a);
});
</script>

<style scoped></style>
