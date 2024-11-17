<template>
  <div class="w-full p-6 rounded-2xl flex items-center justify-center gap-2 border border-[var(--border-color)]"
    :class="{ assignment: clickable }">
    <div class="flex flex-col items-start justify-start w-2/5 pl-4">
      <h3 class="text-2xl font-semibold overflow-hidden overflow-ellipsis w-full text-nowrap">{{ assignment.name }}</h3>
      <p :title="assignment.dateAssigned.toLocaleString()">Assigned {{ formatDate(assignment.dateAssigned, currentTime)
        }}</p>
      <p :title="assignment.dueDate.toLocaleString()">Due {{ formatDate(assignment.dueDate, currentTime) }}</p>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 w-2/5" v-if="assignment.instanceInfo">
      <p class="text-xl font-medium" v-if="assignment.instanceInfo.questionsCorrect !== undefined">
        Your Grade: {{ assignment.instanceInfo.questionsCorrect }}/{{ assignment.numOfQuestions }}
        <span class="text-sm">({{ Math.floor((assignment.instanceInfo.questionsCorrect / assignment.numOfQuestions) *
          100) }}%)</span>
      </p>
      <p class="text-xl font-medium" v-else>
        Your Progress: {{ assignment.instanceInfo.questionsCompleted }}/{{ assignment.numOfQuestions }}
        <span class="text-sm">({{ Math.floor((assignment.instanceInfo.questionsCompleted / assignment.numOfQuestions) *
          100) }}%)</span>
      </p>

      <div class="w-full h-4 border-[1.5px] border-gray-300 rounded-full">
        <div class="h-full bg-green-500 rounded-full"
          :style="{ width: ((assignment.instanceInfo.questionsCorrect ?? assignment.instanceInfo.questionsCompleted) / assignment.numOfQuestions) * 100 + '%' }">
        </div>
      </div>
      <button v-if="!clickable" @click="submitAssignment"
        class="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--text-color)]" :class="{
          'brightness-60 grayscale cursor-not-allowed': assignment.instanceInfo.questionsCompleted !== assignment.numOfQuestions,
          'cursor-pointer': assignment.instanceInfo.questionsCompleted === assignment.numOfQuestions
        }" :disabled="assignment.instanceInfo.questionsCompleted !== assignment.numOfQuestions">
        Submit
      </button>
    </div>

    <div class="flex flex-col items-end justify-start gap-2 w-1/5">
      <div class="flex items-center justify-center gap-2">
        <p>{{ assignment.instanceInfo.dateSubmitted ? "Submitted" : "Assigned" }}</p>
        <div class="w-2 h-2 rounded-full"
          :class="assignment.instanceInfo.dateSubmitted ? 'bg-green-600' : 'bg-red-600'"></div>
      </div>

      <div class="flex items-center justify-center gap-2">
        <p>{{ assignment.instanceInfo.questionsCorrect > -1 ? "Graded" : "Ungraded" }}</p>
        <div class="w-2 h-2 rounded-full"
          :class="assignment.instanceInfo.questionsCorrect === undefined ? 'bg-red-600' : 'bg-green-600'"></div>
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
    @apply bg-gray-accent duration-200 cursor-pointer dark:bg-dark-hover;
  }
}
</style>
