<template>
  <div class="sticky left-0 top-0 flex h-full w-72 shrink-0 flex-col items-start justify-start border-r border-neutral-300 dark:border-neutral-600">
    <button class="group my-4 ml-4 flex items-center justify-center gap-2 rounded-xl px-5 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-500/25" type="button" @click="emit('close')">
      <img class="size-4 group-hover:-translate-x-1 dark:invert" src="/ui/arrowLeft.svg" aria-hidden="true" />
      Back to course
    </button>

    <div class="relative w-full">
      <div class="list-overlay pointer-events-none absolute left-0 top-0 h-full w-full border-y border-neutral-300 dark:border-neutral-600"></div>
      <ul class="flex h-[70dvh] w-full shrink-0 flex-col items-start justify-start overflow-y-scroll border-neutral-300 px-4">
        <li
          v-for="(num, index) in assignment.assignment.numQuestions"
          :key="index"
          class="w-full border-l-4 border-neutral-300 py-0.5 pl-4 first:mt-6 last:mb-6"
          :class="{
            'border-neutral-400 hover:border-neutral-500': currentQuestionIndex === index, // current
            'border-green-400 hover:border-green-500': assignment.assignment.questionInterfaces[index]?.question.answers.some((answer) => answer.selected), // completed
            'cursor-not-allowed grayscale': !assignment.assignment.isStatic //if dynamic, disable
          }"
        >
          <!-- button for question number -->
          <button
            class="w-full rounded-xl px-5 py-2 text-left"
            :class="{
              'bg-neutral-200 dark:bg-neutral-500/25': currentQuestionIndex === index,
              'text-neutral-400': currentQuestionIndex < index,
              'hover:bg-neutral-200 hover:text-black': assignment.assignment.isStatic
            }"
            type="button"
            :disabled="!assignment.assignment.isStatic"
            @click="changeRouteQuery({ q: index + 1 }, 'push')"
          >
            Question {{ num }}
          </button>
        </li>
      </ul>
    </div>

    <div class="bg-neutral-00/25 flex h-full w-full flex-col items-start justify-start p-4 dark:bg-none">
      <h4 class="w-64 overflow-hidden overflow-ellipsis text-nowrap text-2xl font-medium">{{ assignment.assignment.name }}</h4>
      <p class="text-sm font-bold">Due {{ formatDate(assignment.assignment.dueDate, currentDate) }}</p>
      <p class="text-sm text-neutral-700 dark:text-white">Assigned {{ formatDate(assignment.assignment.dateAssigned, currentDate) }}</p>

      <div class="mt-auto w-full" :class="{ 'du-tooltip': !assignmentIsComplete }" data-tip="Complete all questions first!">
        <button
          class="w-full rounded-lg bg-green-accent px-5 py-1.5 text-lg font-bold"
          :class="assignmentIsComplete ? 'hover:brightness-110' : 'cursor-not-allowed grayscale'"
          :disabled="!assignmentIsComplete"
          type="button"
          @click="submit"
        >
          <span v-if="submitState.isLoading" class="du-loading du-loading-spinner du-loading-sm"></span>
          Submit Assignment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  assignment: StudentAssignment;
  currentQuestionIndex: number;
}>();
const emit = defineEmits<{ close: [void] }>();

const currentDate = new Date();

const submitState = reactive({
  isLoading: false,
  isSuccess: false,
  isErrored: false
});

const assignmentIsComplete = computed(() => {
  const questionInterfaces = Object.values(props.assignment.assignment.questionInterfaces);
  return (
    questionInterfaces.length === props.assignment.assignment.numQuestions && // every question has been loaded
    questionInterfaces.every((questionInterface) => questionInterface.question.answers.some((answer) => answer.selected)) // every question has been answered
  );
});

async function submit() {
  submitState.isLoading = true;

  const { data: _response, error } = await tryCatch(submitAssignment(props.assignment.id));
  // TODO: do smth with response

  if (error) {
    submitState.isLoading = false;
    submitState.isErrored = true;
    console.error(error);
    // TODO: show error to user
    return;
  }

  submitState.isLoading = false;
  submitState.isSuccess = true;

  await changeRouteQuery({ q: undefined });
  window.location.href = `/student/course/${props.assignment.assignment.course?.id}`;
}
</script>

<style scoped>
.list-overlay {
  background: linear-gradient(to bottom, var(--bg-color), transparent 10%, transparent 90%, var(--bg-color));
}
</style>
