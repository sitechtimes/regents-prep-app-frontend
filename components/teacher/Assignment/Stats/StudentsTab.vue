<template>
  <div class="flex w-full flex-col items-center justify-center gap-3">
    <div v-for="student in students" :key="student.student.id" class="flex h-40 w-full items-center justify-center p-4">
      <div class="flex h-full w-52 shrink-0 items-center justify-start border-r-2 border-neutral-300 pr-4 text-xl font-medium dark:border-neutral-600">
        {{ student.student.firstName }} {{ student.student.lastName }}
      </div>
      <LazyTeacherAssignmentStatsStudentCard hydrate-on-visible :current-assignment="currentAssignment" :student="student" @click="currentStudent = student" />
    </div>

    <FullScreenModal transition-name="slide-up-screen" :show-modal="currentStudent !== undefined" width-class="w-4/5 lg:w-1/2" @close="currentStudent = undefined">
      <div v-if="currentStudent" class="flex h-full w-full flex-col items-center justify-center gap-6">
        <div class="flex flex-col items-center justify-center">
          <h3 class="text-2xl font-bold">{{ currentStudent.student.firstName }} {{ currentStudent.student.lastName }}</h3>
          <p v-if="currentStudent.dateSubmitted" class="font-medium text-neutral-700">Submitted {{ currentStudent.dateSubmitted.toLocaleString() }}</p>
          <p v-else-if="currentStudent.timeStarted" class="text-sm font-medium text-neutral-700">Started {{ currentStudent.timeStarted.toLocaleString() }}</p>
        </div>

        <!-- answer choice buttons -->
        <div v-if="currentQuestionIndex !== undefined && currentQuestion" class="flex w-[99%] flex-col items-center justify-center gap-6">
          <span class="question-text space-y-3 break-normal text-neutral-100" v-html="currentQuestion.question.text"></span>

          <div class="flex flex-wrap items-center justify-center gap-2">
            <div
              v-if="currentQuestion.question.answerType === 'Multiple Choice'"
              v-for="choice in currentQuestion.question.answers"
              class="rounded-lg px-5 py-2 text-sm shadow-sm"
              :data-tip="`${currentStudent.student.firstName} selected this choice`"
              :class="[colorAnswerChoice(choice), { 'du-tooltip cursor-help': isSelected(choice) }]"
              v-html="choice.text"
            ></div>
          </div>

          <div class="w-full flex-col items-center justify-between">
            <p class="inline-flex items-center justify-start gap-2 text-sm font-medium">
              <img class="size-5 -translate-y-px" src="/ui/clock.svg" aria-hidden="true" /> Time spent:
              {{ formatTime(currentQuestion.timeSpent) }}
            </p>

            <!-- back/next buttons -->
            <div class="flex items-center justify-center gap-4">
              <button
                class="group my-2 flex h-8 w-1/2 items-center justify-center gap-2 rounded-lg bg-neutral-100 text-sm hover:bg-neutral-200 dark:bg-neutral-600 hover:dark:bg-neutral-700"
                :class="{ 'cursor-not-allowed bg-neutral-200 brightness-50 grayscale': currentQuestionIndex === 0 }"
                type="button"
                :disabled="currentQuestionIndex === 0"
                @click="currentQuestionIndex--"
              >
                <img class="size-5 group-hover:-translate-x-1" src="/ui/arrowLeft.svg" aria-hidden="true" />
                Back
              </button>
              <button
                class="group my-2 flex h-8 w-1/2 items-center justify-center gap-2 rounded-lg bg-neutral-100 text-sm hover:bg-neutral-200 dark:bg-neutral-600 hover:dark:bg-neutral-700"
                :class="{ 'cursor-not-allowed bg-neutral-200': currentStudentStatistics && currentQuestionIndex === currentStudentStatistics.length - 1 }"
                type="button"
                :disabled="currentStudentStatistics && currentQuestionIndex === currentStudentStatistics.length - 1"
                @click="currentQuestionIndex++"
              >
                Next
                <img class="size-5 group-hover:translate-x-1" src="/ui/arrowRight.svg" aria-hidden="true" />
              </button>
            </div>
            <p class="mt-2 text-center text-sm">Question {{ currentQuestionIndex + 1 }} of {{ currentStudentStatistics?.length }}</p>
          </div>
        </div>
      </div>
    </FullScreenModal>
  </div>
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
    const { data, error } = await tryRequestEndpoint<(StaticIndividualStudentStatistic | DynamicIndividualStudentStatistic)[]>(
      `/courses/teacher/assignment/individualized-statistics/${props.currentAssignment.id}/true/`
    );
    if (error) return console.error(error);

    loadedStudentStatistics[student.id] = data;
    currentStudentStatistics.value = data;
  }

  currentQuestionIndex.value = 0;
});

onMounted(async () => {
  const { data: studentList, error } = await tryRequestEndpoint<StudentStatistic[]>(`/courses/teacher/assignment/${props.assignmentId}/per-student-statistics/true`);
  if (error) return console.error(error);

  for (const student of studentList) {
    // @ts-expect-error timeStarted is a unix timestamp before parsing
    student.timeStarted = student.timeStarted ? new Date(student.timeStarted * 1000) : null;
    // @ts-expect-error dateSubmitted is a unix timestamp before parsing
    student.dateSubmitted = student.dateSubmitted ? new Date(student.dateSubmitted * 1000) : null;
  }
  students.value = studentList.sort((a, b) => a.student.lastName.localeCompare(b.student.lastName));
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
