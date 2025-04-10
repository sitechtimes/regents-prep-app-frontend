<template>
  <button
    class="ml-4 flex h-full grow items-center justify-center rounded-xl border border-neutral-300 p-4 px-10 dark:border-neutral-600"
    :class="student.timeStarted ? 'hover:shadow-lg' : 'cursor-not-allowed select-none bg-neutral-300'"
    :disabled="!student.timeStarted"
    type="button"
  >
    <!-- TODO: card looks kinda bad -->
    <div v-if="student.timeStarted" class="flex h-full w-full items-center justify-center">
      <div class="flex h-full grow items-center justify-center gap-4">
        <div class="du-tooltip du-tooltip-right h-full w-5 cursor-help" :data-tip="`${student.questionsCorrect} correct out of ${student.questionsCompleted} completed`">
          <div class="relative h-full w-full overflow-hidden rounded-full border border-neutral-300 bg-neutral-400 dark:border-neutral-600">
            <div class="absolute bottom-0 left-0 z-[1] w-full bg-green-500" :style="{ height: `${(student.questionsCorrect / numQuestions) * 100}%` }"></div>
            <div class="absolute bottom-0 left-0 w-full bg-red-500" :style="{ height: `${(student.questionsCompleted / numQuestions) * 100}%` }"></div>
          </div>
        </div>
        <div class="flex w-full flex-col items-start justify-center">
          <!-- <p class="text-neutral-700 dark:text-neutral-300">{{ student.questionsCorrect }}/{{ numQuestions }}</p> -->
          <h5 class="text-xl font-semibold">{{ ((student.questionsCorrect / numQuestions) * 100).toFixed(0) }}%</h5>
        </div>
      </div>

      <div class="flex grow flex-col items-start justify-center">
        <p class="inline-flex items-center justify-center gap-1">
          <img class="size-5 -translate-y-0.5" src="/ui/timer.svg" aria-hidden="true" /> Average time per question: {{ formatTime(student.timeSpent / (student.questionsCompleted || 1)) }}
        </p>
        <p class="inline-flex items-center justify-center gap-1"><img class="size-5 -translate-y-0.5" src="/ui/clock.svg" aria-hidden="true" /> Total time: {{ formatTime(student.timeSpent) }}</p>
      </div>

      <div class="flex grow flex-col items-end justify-center">
        <p :title="student.timeStarted.toLocaleString()">Started {{ formatDate(student.timeStarted, currentDate) }}</p>
        <p v-if="student.dateSubmitted" :title="student.dateSubmitted.toLocaleString()">Submitted {{ formatDate(student.dateSubmitted, currentDate) }}</p>
        <p v-else>Not submitted</p>
      </div>
    </div>

    <h3 v-else class="text-3xl font-semibold">Not started yet</h3>
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
