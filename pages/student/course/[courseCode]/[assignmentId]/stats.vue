<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h2>hi!!</h2>
    <p>does this work?</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "auth",
  requiresAuth: true
});

const route = useRoute();
const userStore = useUserStore();
const assignmentId = route.params.assignmentId;
const apiURL = `/courses/student/assignment-results/${assignmentId}`

onMounted(() => {
  console.log(assignmentId)
  getAssignmentStats();
});

userStore.$subscribe(async () => {
  getAssignmentStats();
});

function getAssignmentStats() {
  //just need to replace assignment instance id for what we need
  fetch(apiURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
    console.log(apiURL)
  });
}
</script>

<style scoped></style>
