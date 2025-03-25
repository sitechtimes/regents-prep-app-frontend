<template>
  <div v-if="assignmentResults" class="p-6">
    <div class="my-6 text-center">
      <h2 class="text-2xl font-bold">Results Overview</h2>
    </div>
    <div v-if="currentAssignment" class="my-4 text-center">
      <h1 class="text-2xl font-bold">{{ currentAssignment?.assignment.name }}</h1>
      <p class="text-lg">Submitted on: {{ formatDate(currentAssignment?.dateSubmitted) }}</p>
    </div>
    <div v-else class="text-center">
      <p>No assignment found for the provided ID.</p>
    </div>
    <div class="relative my-4 flex justify-center">
      <div class="relative h-8 w-125 rounded-full border-[1.5px] border-gray-300 bg-red-500">
        <div
          class="h-full rounded-full bg-green-500"
          :style="{ width: ((assignmentResults.questionsCorrect ?? assignmentResults.questionsCompleted) / assignmentResults.numQuestions) * 100 + '%' }"
        ></div>
      </div>
      <span class="absolute inset-0 flex items-center justify-center text-xl font-semibold text-black"> {{ assignmentResults.questionsCorrect }}/{{ assignmentResults.numQuestions }} </span>
    </div>
    <div class="mb-4 flex w-full flex-col">
      <div class="flex items-center border-b py-2 font-semibold">
        <div class="w-16 text-center">#</div>
        <div class="flex-1 px-4">Question</div>
        <div class="w-1/4 text-center">Your Answer</div>
        <div class="w-1/4 text-center">Correct Answer</div>
        <div class="w-1/4 text-center">Result</div>
      </div>
      <div v-for="(questionInstance, questionId) in assignmentResults.questionInstances" :key="questionId" class="mb-4 flex flex-col">
        <div class="flex items-center border-b py-2">
          <button type="button" class="w-16 cursor-pointer text-center font-semibold hover:bg-slate-200" @click="dropdownStates[questionId] = !dropdownStates[questionId]">{{ questionId + 1 }}</button>
          <div class="flex-1 px-4">
            <span class="overflow-hidden text-ellipsis hover:bg-slate-200" v-html="questionInstance.question.text"></span>
          </div>
          <div class="w-1/4 text-center">
            <span v-html="getUserAnswer(questionInstance.question, questionInstance.dynamicUserAnswers.map(String))"></span>
          </div>
          <div class="w-1/4 text-center" v-html="getCorrectAnswer(questionInstance.question)"></div>
          <div class="w-1/4 text-center">
            <span v-if="isAnswerCorrect({ question: questionInstance.question, dynamicUserAnswers: questionInstance.dynamicUserAnswers.map(String) })" class="text-green-600">✔️</span>
            <span v-else class="text-red-600">❌</span>
          </div>
        </div>
        <div v-show="dropdownStates[questionId]" class="dropdown-content rounded-md p-4">
          <p><strong>Question:</strong> <span v-html="questionInstance.question.text"></span></p>
          <p><strong>Choices:</strong></p>
          <ul>
            <li v-for="(answer, index) in questionInstance.question.answers" :key="index" class="flex items-center">
              <span class="mr-2">{{ String.fromCharCode(65 + index) }}.</span>
              <span v-html="answer.text"></span>
            </li>
          </ul>
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
  middleware: "student-get-course"
});
const route = useRoute();
const userStore = useUserStore();
const { studentCurrentCourse } = storeToRefs(userStore);
const assignmentResults = ref<AssignmentResults>();
const allAssignments = ref<StudentAssignment[]>([]);
const currentAssignment = ref<StudentAssignment>();
const dropdownStates = ref<boolean[]>([]);

onMounted(async () => {
  try {
    const courseId = studentCurrentCourse.value?.id;
    if (courseId) {
      const assignmentId = parseInt(route.params.assignmentId as string);
      allAssignments.value = await getAssignments(assignmentId);
      currentAssignment.value = allAssignments.value.find((assignment) => assignment.id === assignmentId);
      assignmentResults.value = await getAssignmentResults(assignmentId);
    }
  } catch (error) {
    console.error("Error fetching assignment data:", error);
  }
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

function isAnswerCorrect(questionInstance: { question: Question; dynamicUserAnswers: string[] }) {
  const userAnswer = getUserAnswer(questionInstance.question, questionInstance.dynamicUserAnswers);
  const correctAnswer = getCorrectAnswer(questionInstance.question);
  return userAnswer === correctAnswer;
}
</script>

<style scoped></style>
