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
const assignmentId = ref(Number(route.params.assignmentId)) ;

onMounted(async () => {
  console.log(assignmentId)
  console.log(await getAssignmentResults(assignmentId.value));
});

</script>

<style scoped></style>
