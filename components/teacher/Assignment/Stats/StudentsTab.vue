<template>
  <div class="flex w-full flex-col items-center justify-center gap-3">
    <div v-for="student in students" :key="student.student.id" class="flex h-40 w-full items-center justify-center p-4">
      <div class="flex h-full w-52 items-center justify-start border-r-2 border-neutral-300 pr-4 text-xl font-medium dark:border-neutral-600">
        {{ student.student.firstName }} {{ student.student.lastName }}
      </div>
      <LazyTeacherAssignmentStatsStudentCard hydrate-on-visible :current-assignment="currentAssignment" :student="student" @click="currentStudent = student" />
    </div>
  </div>

  <FullScreenModal transition-name="slide-up-screen" :show-modal="currentStudent !== undefined" width-class="w-1/2" @close="currentStudent = undefined">
    <div v-if="currentStudent" class="flex h-full w-full flex-col items-center justify-center gap-6">
      <div class="flex flex-col items-center justify-center">
        <h3 class="text-3xl font-bold">{{ currentStudent.student.firstName }} {{ currentStudent.student.lastName }}</h3>
        <p v-if="currentStudent.dateSubmitted" class="font-medium text-neutral-700">Submitted {{ currentStudent.dateSubmitted.toLocaleString() }}</p>
        <p v-else-if="currentStudent.timeStarted" class="font-medium text-neutral-700">Started {{ currentStudent.timeStarted.toLocaleString() }}</p>
      </div>

      <div v-if="currentQuestionIndex !== undefined && currentQuestion" class="flex flex-col items-center justify-center gap-8">
        <span class="question-text space-y-3 text-neutral-100" v-html="currentQuestion.question.text"></span>

        <div class="flex flex-wrap items-center justify-center gap-2">
          <div
            v-if="currentQuestion.question.answerType === 'Multiple Choice'"
            v-for="choice in currentQuestion.question.answers"
            class="rounded-lg px-6 py-2 shadow-sm"
            :data-tip="`${currentStudent.student.firstName} selected this choice`"
            :class="[colorAnswerChoice(choice), { 'du-tooltip cursor-help': isSelected(choice) }]"
            v-html="choice.text"
          ></div>
        </div>

        <div class="flex w-full items-center justify-between">
          <p class="inline-flex w-1/3 items-center justify-start gap-2 text-lg font-medium">
            <img class="size-5 -translate-y-px" src="/ui/clock.svg" aria-hidden="true" /> Time spent: {{ formatTime(currentQuestion.timeSpent) }}
          </p>

          <p class="w-1/3 text-center">Question {{ currentQuestionIndex + 1 }} of {{ currentStudentStatistics?.length }}</p>

          <div class="flex w-1/3 items-center justify-center gap-4">
            <button
              class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-8 py-2 text-xl hover:bg-neutral-200 dark:bg-neutral-600 hover:dark:bg-neutral-700"
              :class="{ 'cursor-not-allowed bg-neutral-200 opacity-50 brightness-50': currentQuestionIndex === 0 }"
              type="button"
              :disabled="currentQuestionIndex === 0"
              @click="currentQuestionIndex--"
            >
              <img class="size-5 group-hover:-translate-x-1" src="/ui/arrowLeft.svg" aria-hidden="true" />
              Back
            </button>
            <button
              class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-8 py-2 text-xl hover:bg-neutral-200 dark:bg-neutral-600 hover:dark:bg-neutral-700"
              :class="{ 'cursor-not-allowed bg-neutral-200 opacity-50 brightness-50': currentStudentStatistics && currentQuestionIndex === currentStudentStatistics.length - 1 }"
              type="button"
              :disabled="currentStudentStatistics && currentQuestionIndex === currentStudentStatistics.length - 1"
              @click="currentQuestionIndex++"
            >
              Next
              <img class="size-5 group-hover:translate-x-1" src="/ui/arrowRight.svg" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </FullScreenModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentAssignment: TeacherAssignment | undefined;
  assignmentId: number;
}>();

type IndividualStudentStatistic = StaticIndividualStudentStatistic | DynamicIndividualStudentStatistic;
const loadedStudentStatistics: Partial<Record<number, IndividualStudentStatistic[]>> = {};

const students = ref<StudentStatistic[]>([]);
const currentStudent = ref<StudentStatistic>();
const currentStudentStatistics = ref<IndividualStudentStatistic[]>();
const currentQuestionIndex = ref<number>();
const currentQuestion = computed(() => (currentQuestionIndex.value !== undefined ? currentStudentStatistics.value?.[currentQuestionIndex.value] : undefined));
watch(currentStudent, async (student) => {
  if (!props.currentAssignment || !student) return (currentQuestionIndex.value = undefined);

  if (loadedStudentStatistics[student.id]) currentStudentStatistics.value = loadedStudentStatistics[student.id];
  else {
    const { data, error } = await tryCatch(getIndividualStudentStatistics(props.currentAssignment.id, student.id, true));
    if (error) return console.error(error);

    loadedStudentStatistics[student.id] = data;
    currentStudentStatistics.value = data;
  }

  currentQuestionIndex.value = 0;
});

onMounted(async () => {
  const { data, error } = await tryCatch(getTeacherStudentStatistics(props.assignmentId, true));
  if (error) return console.error(error);
  students.value = data.sort((a, b) => a.student.lastName.localeCompare(b.student.lastName));
});

function isSelected(choice: TopicQuestionInterfaceAnswer) {
  return (
    currentQuestion.value &&
    (("dynamicUserAnswers" in currentQuestion.value && currentQuestion.value.dynamicUserAnswers.includes(choice.id)) ||
      ("staticUserAnswer" in currentQuestion.value && currentQuestion.value.staticUserAnswer === choice.id))
  );
}

function colorAnswerChoice(choice: TopicQuestionInterfaceAnswer) {
  if (choice.isCorrect) return "bg-green-400";
  if (isSelected(choice)) return "bg-red-400";
  return "bg-neutral-200";
}
</script>

<style scoped></style>
