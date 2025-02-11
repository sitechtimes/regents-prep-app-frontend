<template>
  <div class="sticky left-0 top-0 flex h-full w-72 shrink-0 flex-col items-start justify-start border-r border-neutral-300">
    <button class="group my-4 ml-4 flex items-center justify-center gap-2 rounded-xl px-5 py-2 hover:bg-neutral-200" type="button" @click="changeRouteQuery({ q: undefined })">
      <img class="size-4 group-hover:-translate-x-1" src="/ui/arrowLeft.svg" aria-hidden="true" />
      Back to assignment
    </button>

    <ul class="flex h-[70dvh] w-full shrink-0 flex-col items-start justify-start overflow-y-scroll border-y-2 border-neutral-300 px-4">
      <li
        v-for="(num, index) in assignment.assignment.numOfQuestions"
        :key="index"
        class="w-full border-l-4 border-neutral-200 py-0.5 pl-4"
        :class="{
          'border-neutral-400 hover:border-neutral-500': currentQuestionIndex === index, // current
          'border-green-400 hover:border-green-500': assignment.assignment.questionInterfaces[index]?.question.answers.some((answer) => answer.selected), // completed
          'border-red-400 hover:border-red-500': currentQuestionIndex > index && !assignment.assignment.questionInterfaces[index]?.question.answers.some((answer) => answer.selected) // incomplete
        }"
      >
        <button
          class="w-full rounded-xl px-5 py-2 text-left hover:bg-neutral-200"
          :class="{ 'bg-neutral-200': currentQuestionIndex === index, 'text-neutral-400 hover:text-black': currentQuestionIndex < index }"
          type="button"
          @click="changeRouteQuery({ q: index }, 'push')"
        >
          Question {{ num }}
        </button>
      </li>
    </ul>

    <div class="flex h-full w-full flex-col items-start justify-start bg-neutral-100/25 p-4">
      <h4 class="w-64 overflow-hidden overflow-ellipsis text-nowrap text-2xl font-medium">{{ assignment.assignment.name }}</h4>
      <p class="text-sm text-neutral-700">Assigned {{ formatDate(assignment.assignment.dateAssigned, currentDate) }}</p>
      <p class="text-sm">Due {{ formatDate(assignment.assignment.dueDate, currentDate) }}</p>

      <div class="mt-auto w-full" :class="{ 'du-tooltip': true }" data-tip="Complete all questions first!">
        <button class="w-full rounded-xl bg-green-300 px-5 py-1.5 text-lg font-medium hover:bg-green-400" :class="{ grayscale: true }" type="button" @click="submit">
          <!-- TODO: add loading spinner -->
          Submit
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

const currentDate = new Date();

const submitState = reactive({
  isLoading: false,
  isSuccess: false,
  isErrored: false
});

async function submit() {
  submitState.isLoading = true;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await submitAssignment(props.assignment.id);
    // TODO: do smth with response

    submitState.isLoading = false;
    submitState.isSuccess = true;

    await changeRouteQuery({ q: undefined });
    window.location.reload();
  } catch (error) {
    submitState.isLoading = false;
    submitState.isErrored = true;
    console.error(error);
    // TODO: show error to user
  }
}
</script>

<style scoped></style>
