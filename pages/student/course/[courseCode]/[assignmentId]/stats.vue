<template>
  <div v-if="assignmentResults" class="p-6">
    <div class="my-6 text-center">
      <h2 class="text-4xl font-bold">Results Overview</h2>
    </div>
    <div v-if="currentAssignment" class="my-4 text-center">
      <h1 class="text-2xl font-bold">{{ currentAssignment.assignment.name }}</h1>
      <p class="text-lg">Submitted on: {{ formatDate(currentAssignment.dateSubmitted) }}</p>
    </div>
    <div v-else class="text-center">
      <p>No assignment found for the provided ID.</p>
    </div>
    <div class="relative my-4 flex justify-center">
      <div class="relative h-8 w-4/5 rounded-full border border-neutral-300 bg-red-500 dark:border-neutral-500">
        <div
          class="h-full rounded-full bg-green-500"
          :style="{ width: ((assignmentResults.questionsCorrect ?? assignmentResults.questionsCompleted) / assignmentResults.numQuestions) * 100 + '%' }"
        ></div>
      </div>
      <span class="absolute inset-0 flex items-center justify-center text-xl font-semibold text-black"> {{ assignmentResults.questionsCorrect }}/{{ assignmentResults.numQuestions }} </span>
    </div>
    <div class="flex w-full flex-col">
      <!-- header row -->
      <div class="flex flex-wrap items-center border-b border-neutral-300 py-2 text-sm sm:text-base dark:border-neutral-500">
        <div class="w-1/12 text-center font-semibold">#</div>
        <div class="w-5/12 px-2 text-center font-semibold sm:text-left">Question</div>
        <div class="w-2/12 text-center text-xs font-semibold sm:text-sm">Your Answer</div>
        <div class="w-2/12 text-center text-xs font-semibold sm:text-sm">Correct Answer</div>
        <div class="w-2/12 text-center font-semibold">Result</div>
      </div>
      <div v-for="(questionInstance, questionId) in assignmentResults.questionInstances" :key="questionId" class="flex flex-col rounded-md">
        <div
          class="flex cursor-pointer items-center border-b border-neutral-300 py-2 hover:bg-neutral-200/50 dark:border-neutral-500 dark:hover:bg-neutral-600/20"
          @click="dropdownStates[questionId] = !dropdownStates[questionId]"
        >
          <button type="button" class="w-1/12 text-center font-semibold">{{ questionId + 1 }}</button>
          <div class="w-5/12 px-4">
            <span class="line-clamp-5 block overflow-hidden sm:line-clamp-none" v-html="questionInstance.question.text"></span>
          </div>
          <div v-if="questionInstance.dynamicUserAnswers" class="w-2/12 text-center">
            <span v-html="getUserAnswer(questionInstance.question, questionInstance.dynamicUserAnswers?.map(String) ?? [])"></span>
          </div>
          <div v-else-if="questionInstance.staticUserAnswer" class="w-2/12 text-center">
            <span v-html="getStaticUserAnswer(questionInstance.question, Number(questionInstance.staticUserAnswer) ?? 0)"></span>
          </div>

          <div class="w-2/12 text-center" v-html="getCorrectAnswer(questionInstance.question)"></div>

          <div class="w-2/12 text-center">
            <span
              v-if="
                (questionInstance.dynamicUserAnswers && isDynamicAnswerCorrect({ question: questionInstance.question, dynamicUserAnswers: questionInstance.dynamicUserAnswers.map(String) })) ||
                (questionInstance.staticUserAnswer && isStaticAnswerCorrect({ question: questionInstance.question, staticUserAnswer: questionInstance.staticUserAnswer }))
              "
              class="text-green-600"
            >
              <img src="/ui/check.svg" class="inline h-5 w-5 align-middle dark:invert" />
            </span>
            <span v-else>
              <img src="/ui/close.svg" class="inline h-5 w-5 align-middle dark:invert" />
            </span>
          </div>
        </div>

        <!-- expanded question details -->
        <div v-show="dropdownStates[questionId]" class="dropdown-content border-x border-b border-neutral-300 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-800/30">
          <div class="ml-[8.33%] w-[41.67%] p-4">
            <p class="mb-2"><strong>Question:</strong> <span v-html="questionInstance.question.text"></span></p>
            <p class="mb-1"><strong>Choices:</strong></p>
            <ul class="space-y-1">
              <li
                v-for="(answer, index) in questionInstance.question.answers"
                :key="index"
                class="flex items-start rounded-md px-2 py-1"
                :class="answer.isCorrect ? 'bg-green-100 font-semibold text-green-700 dark:bg-green-900/40' : ''"
              >
                <span class="mr-2">{{ String.fromCharCode(65 + index) }}.</span>
                <span v-html="answer.text"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center">
    <p>Loading assignment results...</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "student-get-course",
  requiresAuth: true,
  redirectIfAuth: false
});
const route = useRoute();
const userStore = useUserStore();
const { studentCurrentCourse } = storeToRefs(userStore);

const assignmentResults = ref<AssignmentResults>();
const dropdownStates = ref<boolean[]>([]);
const assignmentId = Number(route.params.assignmentId);
const currentAssignment = computed(() => studentCurrentCourse.value?.assignments.find((assignment) => assignment.id === assignmentId));

useSeoMeta({
  title: () => `${studentCurrentCourse.value?.name ?? "Class Details"} - ${currentAssignment.value?.assignment.name ?? "Assignment Stats"}`
});

onMounted(async () => {
  const courseId = studentCurrentCourse.value?.id;
  if (!courseId) return;

  const { data: results, error: resultError } = await tryRequestEndpoint<AssignmentResults>(`courses/student/assignment-results/${assignmentId}`);
  if (resultError) return console.error("Error fetching assignment data:", resultError);
  assignmentResults.value = results;
});

function formatDate(date: Date | null) {
  if (!date) return "N/A";
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return formattedDate;
}

function getStaticUserAnswer(question: Question, staticUserAnswer: number) {
  if (!staticUserAnswer) return "-";
  const answer = question.answers.find((answer) => answer.id === staticUserAnswer);
  if (answer) {
    const letter = String.fromCharCode(65 + question.answers.indexOf(answer));
    return letter;
  }
}

function getUserAnswer(question: Question, dynamicUserAnswers: string[]) {
  if (!dynamicUserAnswers || dynamicUserAnswers.length === 0) return "-";
  const lastAnswer = dynamicUserAnswers[dynamicUserAnswers.length - 1];
  const answer = question.answers.find((answer) => answer.id.toString() === lastAnswer);
  if (answer) {
    const letter = String.fromCharCode(65 + question.answers.indexOf(answer));
    return letter;
  }
}

function getCorrectAnswer(question: Question) {
  const correctAnswers = question.answers.filter((answer) => answer.isCorrect);
  if (correctAnswers.length > 0) {
    return correctAnswers
      .map((answer) => {
        const letter = String.fromCharCode(65 + question.answers.indexOf(answer));
        return letter;
      })
      .join(", ");
  }
  return "-";
}

function isDynamicAnswerCorrect(questionInstance: { question: Question; dynamicUserAnswers: string[] }) {
  const userAnswer = getUserAnswer(questionInstance.question, questionInstance.dynamicUserAnswers);
  const correctAnswer = getCorrectAnswer(questionInstance.question);
  return userAnswer === correctAnswer;
}

function isStaticAnswerCorrect(questionInstance: { question: Question; staticUserAnswer: number }) {
  const userAnswer = getStaticUserAnswer(questionInstance.question, questionInstance.staticUserAnswer);
  const correctAnswer = getCorrectAnswer(questionInstance.question);
  return userAnswer === correctAnswer;
}
</script>

<style scoped></style>
