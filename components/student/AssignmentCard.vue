<template>
  <div class="w-full p-6 rounded-2xl flex items-center justify-center gap-2 border-2 border-gray-accent" :class="{ assignment: clickable }">
    <div class="flex flex-col items-start justify-start w-2/5">
      <h3 class="text-2xl font-semibold overflow-hidden overflow-ellipsis w-full text-nowrap">{{ assignment.name }}</h3>
      <p :title="assignment.assigned.toLocaleString()">Assigned {{ formatDate(assignment.assigned, currentTime) }}</p>
      <p :title="assignment.due.toLocaleString()">Due {{ formatDate(assignment.due, currentTime) }}</p>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 w-2/5" v-if="assignment.type === 'student'">
      <p class="text-xl font-medium">Your progress: {{ assignment.questionsCompleted }}/{{ assignment.questionsLength }}</p>
      <div class="w-full h-4 bg-gray-800 rounded-full">
        <div class="min-w-[5%] h-full bg-green-500 rounded-full" :style="{ width: (assignment.questionsCompleted / assignment.questionsLength) * 100 + '%' }"></div>
      </div>
      <button
        v-if="!clickable"
        @click="submitAssignment"
        class="px-8 py-2 text-xl font-medium rounded-full bg-green-300"
        :class="{
          'brightness-50': assignment.questionsCompleted !== assignment.questionsLength,
          grayscale: assignment.questionsCompleted !== assignment.questionsLength,
          'cursor-not-allowed': assignment.questionsCompleted !== assignment.questionsLength,
          'cursor-pointer': assignment.questionsCompleted === assignment.questionsLength
        }"
        :disabled="assignment.questionsCompleted !== assignment.questionsLength"
      >
        Submit
      </button>
    </div>

    <div class="flex flex-col items-end justify-start gap-2 w-1/5">
      <div class="flex items-center justify-center gap-2">
        <p>{{ assignment.submitted ? "Submitted" : "Assigned" }}</p>
        <div class="w-2 h-2 rounded-full" :class="{ 'bg-red-600': !assignment.submitted, 'bg-green-600': assignment.submitted }"></div>
      </div>

      <div class="flex items-center justify-center gap-2">
        <p>{{ assignment.questionsCorrect ? `Graded: ${Math.round(assignment.questionsCorrect / assignment.questionsLength)}%` : "Ungraded" }}</p>
        <div class="w-2 h-2 rounded-full" :class="{ 'bg-red-600': !assignment.questionsCorrect, 'bg-green-600': assignment.questionsCorrect }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  assignment: StudentAssignmentOverview;
  clickable: boolean;
}>();
const currentTime = ref(new Date());

async function submitAssignment() {
  // submit assignment
}
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .assignment:hover {
    @apply bg-gray-accent duration-200 cursor-pointer;
  }
}
</style>
