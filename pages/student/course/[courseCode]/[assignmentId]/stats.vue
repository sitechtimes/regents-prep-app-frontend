<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <!-- <h3 class="mt-6 text-2xl">Assignment Statistics</h3>
    <p class="mb-5 py-1 text-xl font-medium">Grade: {{ ((questionsCorrect / numOfQuestions) * 100).toFixed(2) }}%</p>
    <div class="relative mb-20 h-8 w-full max-w-lg overflow-hidden rounded-full border-[1.5px] border-gray-300">
      <div class="absolute inset-0 w-full bg-red-500"></div>
      <div class="absolute h-full bg-green-500" :style="{ width: (questionsCorrect / numOfQuestions) * 100 + '%' }"></div>
      <div class="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">{{ questionsCorrect }} / {{ numOfQuestions }}</div>
    </div>
    <div></div> -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "student-get-course",
  requiresAuth: true
});

const route = useRoute();
const assignmentId = Number(route.params.assignmentId);

onMounted(async () => {
  try {
    // const res = await submitAssignment(assignmentId);
    const results = await getAssignmentResults(assignmentId);
    console.log(results);
  } catch (error) {
    console.error("Error fetching assignment results:", error);
  }
});
</script>

<style scoped></style>
