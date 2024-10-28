<template>
  <div class="w-full p-6 rounded-2xl flex items-center justify-center gap-2 border-2 border-gray-accent" :class="{ assignment: clickable }">
    <div class="flex flex-col items-start justify-start w-2/5 pl-4">
      <h3 class="text-2xl font-semibold overflow-hidden overflow-ellipsis w-full text-nowrap">{{ assignment.name }}</h3>
      <p :title="assignment.dateAssigned.toLocaleString()">Assigned {{ formatDate(assignment.dateAssigned, currentTime) }}</p>
      <p :title="assignment.dueDate.toLocaleString()">Due {{ formatDate(assignment.dueDate, currentTime) }}</p>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 w-2/5" v-if="assignment.instanceInfo">
      <p class="text-xl font-medium" v-if="!assignment.instanceInfo.questionsCorrect">
        Your progress: {{ assignment.instanceInfo.questionsCompleted }}/{{ assignment.numOfQuestions }}
        <span class="text-sm">({{ Math.floor((assignment.instanceInfo.questionsCompleted / assignment.numOfQuestions) * 100) }}%)</span>
      </p>
      <p class="text-xl font-medium" v-else>
        Your grade: {{ assignment.instanceInfo.questionsCorrect }}/{{ assignment.numOfQuestions }}
        <span class="text-sm">({{ Math.floor((assignment.instanceInfo.questionsCorrect / assignment.numOfQuestions) * 100) }}%)</span>
      </p>
      <div class="w-full h-4 bg-gray-800 rounded-full">
        <div
          class="min-w-[5%] h-full bg-green-500 rounded-full"
          :style="{ width: ((assignment.instanceInfo.questionsCorrect ?? assignment.instanceInfo.questionsCompleted) / assignment.numOfQuestions) * 100 + '%' }"
        ></div>
      </div>
      <button
        v-if="!clickable"
        @click="submitAssignment"
        class="px-8 py-2 text-xl font-medium rounded-full bg-green-300"
        :class="{
          'brightness-50': assignment.instanceInfo.questionsCompleted !== assignment.numOfQuestions,
          grayscale: assignment.instanceInfo.questionsCompleted !== assignment.numOfQuestions,
          'cursor-not-allowed': assignment.instanceInfo.questionsCompleted !== assignment.numOfQuestions,
          'cursor-pointer': assignment.instanceInfo.questionsCompleted === assignment.numOfQuestions
        }"
        :disabled="assignment.instanceInfo.questionsCompleted !== assignment.numOfQuestions"
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
        <p>{{ assignment.instanceInfo.dateSubmitted ? "Submitted" : "Assigned" }}</p>
        <div class="w-2 h-2 rounded-full" :class="{ 'bg-red-600': !assignment.instanceInfo.dateSubmitted, 'bg-green-600': assignment.instanceInfo.dateSubmitted }"></div>
      </div>

      <div class="flex items-center justify-center gap-2">
        <p>{{ assignment.instanceInfo.questionsCorrect ? `Graded: ${Math.round((assignment.instanceInfo.questionsCorrect / assignment.numOfQuestions) * 100)}%` : "Ungraded" }}</p>
        <div class="w-2 h-2 rounded-full" :class="{ 'bg-red-600': !assignment.instanceInfo.questionsCorrect, 'bg-green-600': assignment.instanceInfo.questionsCorrect }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
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
    @apply bg-gray-accent duration-200 cursor-pointer;
  }
}
</style>
