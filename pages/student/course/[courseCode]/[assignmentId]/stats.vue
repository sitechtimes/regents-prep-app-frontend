<template>
  <div class="flex h-full w-full flex-col items-center justify-center"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const assignmentResults = ref<any>(null);
const loaded = ref(false);

const assignmentId = route.params.assignmentId;

async function fetchAssignmentResults() {
  try {
    const response = await fetch('/courses/student/assignment-results/${assignmentId}', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch assignment results');
    }
    const data = await response.json();
    assignmentResults.value = data;
    loaded.value = true;
  } catch (error) {
    console.error('Error fetching assignment results:', error);
    loaded.value = true; 
  }
  console.log(assignmentResults.value)
}

onMounted(() => {
  if (assignmentId) {
    fetchAssignmentResults();
  }
});
</script>


<style scoped></style>
