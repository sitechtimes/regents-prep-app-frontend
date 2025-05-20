<template>
  <button
    class="flex h-full w-full items-center justify-center rounded-lg border border-neutral-300 dark:border-neutral-300/50"
    :class="student.timeStarted ? 'hover:shadow-lg' : 'cursor-not-allowed select-none bg-neutral-300 py-2'"
    :disabled="!student.timeStarted"
    type="button"
  >
    <!-- TODO: card looks kinda bad -->
    <div v-if="student.timeStarted" class="mb-2 h-full w-full flex-col items-center justify-center p-0">
      <div class="flex h-full grow flex-col items-start justify-start p-4">
        <h3 class="text-xl font-semibold lg:text-2xl">{{ student.student.firstName }} {{ student.student.lastName }}</h3>

        <div class="my-1 flex w-full flex-col items-center lg:my-4 lg:flex-row lg:justify-between">
          <!-- time stats -->
          <div class="flex w-full flex-col items-start">
            <p class="text-left text-sm lg:text-lg" :title="student.timeStarted.toLocaleString()">Started {{ formatDate(student.timeStarted, currentDate) }}</p>
            <p v-if="student.dateSubmitted" class="text-left text-sm lg:text-lg" :title="student.dateSubmitted.toLocaleString()">Submitted {{ formatDate(student.dateSubmitted, currentDate) }}</p>
            <p v-else class="text-left text-sm lg:text-lg">Not submitted</p>
          </div>

          <!-- average stats -->
          <div class="flex w-full flex-col items-start justify-center lg:items-end">
            <!-- <img class="size-5 -translate-y-0.5" src="/ui/timer.svg" aria-hidden="true" /> -->
            <p class="mt-2 text-left text-sm lg:mt-0 lg:text-right lg:text-lg">Average time per question: {{ formatTime(student.timeSpent / (student.questionsCompleted || 1)) }}</p>
            <!-- <img class="size-5 -translate-y-0.5" src="/ui/clock.svg" aria-hidden="true" /> -->
            <p class="text-left text-sm lg:text-right lg:text-lg">Total time: {{ formatTime(student.timeSpent) }}</p>
          </div>
        </div>
        <!-- progress bar -->
        <h3 class="text-md font-semibold lg:mb-2 lg:text-lg">Progress: {{ ((student.questionsCorrect / numQuestions) * 100).toFixed(0) }}%</h3>
        <div class="du-tooltip du-tooltip-right h-3 w-full cursor-help" :data-tip="`${student.questionsCorrect} correct out of ${student.questionsCompleted} completed`">
          <div class="relative h-full w-full overflow-hidden rounded-full border border-neutral-300 bg-neutral-400 dark:border-neutral-600">
            <div class="absolute bottom-0 left-0 z-[1] w-full bg-green-500" :style="{ height: `${(student.questionsCorrect / numQuestions) * 100}%` }"></div>
            <div class="absolute bottom-0 left-0 w-full bg-red-500" :style="{ height: `${(student.questionsCompleted / numQuestions) * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <h3 v-else class="w-full px-4 text-left font-semibold lg:text-2xl">{{ student.student.firstName }} {{ student.student.lastName }} - Not started yet</h3>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentAssignment: TeacherAssignment | undefined;
  student: StudentStatistic;
}>();

const currentDate = new Date();
const numQuestions = computed(() => props.currentAssignment?.numQuestions ?? 1);
</script>

<style scoped></style>
