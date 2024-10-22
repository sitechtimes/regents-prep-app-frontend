<template>
  <div class="w-full p-6 rounded-2xl flex items-center justify-center gap-2 border-2 border-gray-accent" :class="{ assignment: clickable }">
    <div class="flex flex-col items-start justify-start w-2/5 pl-4">
      <h3 class="text-2xl font-semibold overflow-hidden overflow-ellipsis w-full text-nowrap">{{ assignment.name }}</h3>
      <p :title="assignment.assigned.toLocaleString()">Assigned {{ formatDate(assignment.assigned, currentTime) }}</p>
      <p :title="assignment.due.toLocaleString()">Due {{ formatDate(assignment.due, currentTime) }}</p>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 w-2/5" v-if="assignment.type === 'student'">
      <p class="text-xl font-medium" v-if="!assignment.questionsCorrect">
        Your progress: {{ assignment.questionsCompleted }}/{{ assignment.questionsLength }}
        <span class="text-sm">({{ Math.floor((assignment.questionsCompleted / assignment.questionsLength) * 100) }}%)</span>
      </p>
      <p class="text-xl font-medium" v-else>
        Your grade: {{ assignment.questionsCorrect }}/{{ assignment.questionsLength }}
        <span class="text-sm">({{ Math.floor((assignment.questionsCorrect / assignment.questionsLength) * 100) }}%)</span>
      </p>
      <div class="w-full h-4 bg-gray-800 rounded-full">
        <div class="min-w-[5%] h-full bg-green-500 rounded-full" :style="{ width: ((assignment.questionsCorrect ?? assignment.questionsCompleted) / assignment.questionsLength) * 100 + '%' }"></div>
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
      <!--       <button
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        id="menu-button"
      >
        Assignment Description
      </button>
      <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">License</a>

      </div>
      <p>Late Submissions Accepted:</p>
      <NuxtLink :to="`/student/course/${currentCourse.id}/${assignment.id}/assignmentStats`"/>
      <button>Start Assignment</button> -->
    </div>

    <div class="flex flex-col items-end justify-start gap-2 w-1/5">
      <div class="flex items-center justify-center gap-2">
        <p>{{ assignment.submitted ? "Submitted" : "Assigned" }}</p>
        <div class="w-2 h-2 rounded-full" :class="{ 'bg-red-600': !assignment.submitted, 'bg-green-600': assignment.submitted }"></div>
      </div>

      <div class="flex items-center justify-center gap-2">
        <p>{{ assignment.questionsCorrect ? `Graded: ${Math.round((assignment.questionsCorrect / assignment.questionsLength) * 100)}%` : "Ungraded" }}</p>
        <div class="w-2 h-2 rounded-full" :class="{ 'bg-red-600': !assignment.questionsCorrect, 'bg-green-600': assignment.questionsCorrect }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  assignment: StudentAssignmentOverview;
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
    @apply bg-gray-accent duration-200 cursor-pointer;
  }
}
</style>
