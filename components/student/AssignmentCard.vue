<template>
  <div class="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-color)] p-6" :class="{ assignment: clickable }">
    <div class="flex w-2/5 flex-col items-start justify-start pl-4">
      <h3 class="w-full overflow-hidden overflow-ellipsis text-nowrap text-2xl font-semibold">{{ assignment.assignment.name }}</h3>
      <!--       <p :title="assignment.dateAssigned.toLocaleString()">Assigned {{ formatDate(assignment.dateAssigned, currentTime) }}</p> -->
      <p :title="assignment.assignment.dueDate.toLocaleString()">Due {{ formatDate(assignment.assignment.dueDate, currentTime) }}</p>
    </div>

    <div v-if="assignment.assignment" class="flex w-2/5 flex-col items-center justify-center gap-2">
      <p v-if="assignment.questionsCorrect !== undefined" class="text-xl font-medium">
        Your Grade: {{ assignment.questionsCorrect }}/{{ assignment.assignment.numOfQuestions }}
        <span class="text-sm">({{ Math.floor((assignment.questionsCorrect / assignment.assignment.numOfQuestions) * 100) }}%)</span>
      </p>
      <p v-else class="text-xl font-medium">
        Your Progress: {{ assignment.questionsCompleted }}/{{ assignment.assignment.numOfQuestions }}
        <span class="text-sm">({{ Math.floor((assignment.questionsCompleted / assignment.assignment.numOfQuestions) * 100) }}%)</span>
      </p>

      <div v-if="assignment.questionsCorrect" class="h-4 w-full rounded-full border-[1.5px] border-gray-300">
        <div class="h-full rounded-full bg-green-500" :style="{ width: ((assignment.questionsCorrect ?? assignment.questionsCompleted) / assignment.assignment.numOfQuestions) * 100 + '%' }"></div>
      </div>
      <button
        v-if="!clickable"
        class="rounded-lg bg-[var(--primary)] px-4 py-2 text-[var(--text-color)]"
        :class="{
          'brightness-60 cursor-not-allowed grayscale': assignment.questionsCompleted !== assignment.assignment.numOfQuestions,
          'cursor-pointer': assignment.questionsCompleted === assignment.assignment.numOfQuestions
        }"
        :disabled="assignment.questionsCompleted !== assignment.assignment.numOfQuestions"
        type="button"
        @click="submitAssignment"
      >
        Submit
      </button>
    </div>

    <div class="flex w-1/5 flex-col items-end justify-start gap-2">
      <div class="flex items-center justify-center gap-2">
        <p>{{ assignment.dateSubmitted ? "Submitted" : "Assigned" }}</p>
        <div class="h-2 w-2 rounded-full" :class="assignment.dateSubmitted ? 'bg-green-600' : 'bg-red-600'"></div>
      </div>

      <div v-if="assignment.questionsCorrect" class="flex items-center justify-center gap-2">
        <p>{{ assignment.questionsCorrect > -1 ? "Graded" : "Ungraded" }}</p>
        <div class="h-2 w-2 rounded-full" :class="assignment.questionsCorrect === undefined ? 'bg-red-600' : 'bg-green-600'"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  assignment: StudentAssignment;
  clickable?: boolean;
}>();
const currentTime = ref(new Date());

async function submitAssignment() {
  // submit assignment
}
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .assignment:hover {
    @apply cursor-pointer bg-gray-accent duration-200 dark:bg-dark-hover;
  }
}
</style>
