<template>
  <NuxtLink
    :to="
      assignment.assignment.dueDate >= currentTime
        ? `/student/course/${course?.id ?? assignment.assignment.course?.id}/${assignment.id}`
        : `/student/course/${course?.id ?? assignment.assignment.course?.id}/${assignment.id}/stats`
    "
    class="flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-300 p-6 hover:border-neutral-600 hover:shadow-lg"
  >
    <div class="flex w-2/5 flex-col items-start justify-start pl-4">
      <h3 class="w-full overflow-hidden overflow-ellipsis text-nowrap text-2xl font-semibold">{{ assignment.assignment.name }}</h3>
      <ClientOnly>
        <p :title="assignment.assignment.dueDate.toLocaleString()">Due {{ formatDate(assignment.assignment.dueDate, currentTime) }}</p>
      </ClientOnly>
    </div>

    <div v-if="assignment.assignment" class="flex w-2/5 flex-col items-center justify-center gap-2">
      <p v-if="assignment.dateSubmitted !== null" class="text-xl font-medium">
        Your Grade: {{ assignment.questionsCorrect }}/{{ assignment.assignment.numOfQuestions }}
        <span class="text-sm">({{ Math.floor((assignment.questionsCorrect / assignment.assignment.numOfQuestions) * 100) }}%)</span>
      </p>
      <p v-else class="text-xl font-medium">
        Your Progress: {{ assignment.questionsCompleted }}/{{ assignment.assignment.numOfQuestions }}
        <span class="text-sm">({{ Math.floor((assignment.questionsCompleted / assignment.assignment.numOfQuestions) * 100) }}%)</span>
      </p>

      <div v-if="assignment.dateSubmitted !== null" class="h-4 w-full rounded-full border-[1.5px] border-gray-300">
        <div class="h-full rounded-full bg-green-500" :style="{ width: ((assignment.questionsCorrect ?? assignment.questionsCompleted) / assignment.assignment.numOfQuestions) * 100 + '%' }"></div>
      </div>
    </div>

    <div class="flex w-1/5 flex-col items-end justify-start gap-2">
      <div class="flex items-center justify-center gap-2">
        <p>{{ assignment.dateSubmitted ? "Submitted" : "Assigned" }}</p>
        <div class="h-2 w-2 rounded-full" :class="assignment.dateSubmitted ? 'bg-green-600' : 'bg-red-600'"></div>
      </div>

      <div v-if="assignment.dateSubmitted !== null" class="flex items-center justify-center gap-2">
        <p>{{ assignment.questionsCorrect > -1 ? "Graded" : "Ungraded" }}</p>
        <div class="h-2 w-2 rounded-full" :class="assignment.questionsCorrect === undefined ? 'bg-red-600' : 'bg-green-600'"></div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  course?: StudentCourse;
  assignment: StudentAssignment;
}>();
const currentTime = new Date();
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .assignment:hover {
    @apply cursor-pointer duration-200;
  }
}
</style>
