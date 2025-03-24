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
        <div class="h-full rounded-full bg-green-500" :style="{ width: (assignmentResults.questionsCorrect / assignmentResults.numQuestions) * 100 + '%' }"></div>
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
      <div v-for="(questionInstance, i) in assignmentResults.questionInstances" :key="i" class="mb-4 flex flex-col">
        <div class="flex items-center border-b py-2">
          <div class="w-16 cursor-pointer text-center font-semibold" @click="toggleDropdown(i)">{{ i + 1 }}</div>
          <div class="flex-1 px-4">
            <span v-html="truncateQuestion(questionInstance.question.text)"></span>
          </div>
          <div class="w-1/4 text-center">
            <span>{{ getUserAnswer(questionInstance.question, questionInstance.userAnswers) }}</span>
          </div>
          <div class="w-1/4 text-center" v-html="getCorrectAnswer(questionInstance.question)"></div>
          <div class="w-1/4 text-center">
            <span v-if="isAnswerCorrect(questionInstance)" class="text-green-600">✔️</span>
            <span v-else class="text-red-600">❌</span>
          </div>
        </div>
        <div v-show="isDropdownOpen(i)" class="dropdown-content rounded bg-gray-100 p-4">
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
import { ref, onMounted } from "vue";
definePageMeta({
  layout: "student"
});

import { useRoute } from "vue-router";
const route = useRoute();
const userStore = useUserStore();
const { studentCurrentCourse } = storeToRefs(userStore);
const assignmentResults = ref<AssignmentResults | null>(null);
const allAssignments = ref<StudentAssignment[]>([]);
const currentAssignment = ref<StudentAssignment | null>(null);

onMounted(async () => {
  try {
    const courseId = studentCurrentCourse.value?.id;
    if (courseId) {
      const assignmentId = parseInt(route.params.assignmentId as string);
      allAssignments.value = await getAssignments(assignmentId);
      currentAssignment.value = allAssignments.value.find((assignment: StudentAssignment) => assignment.id === assignmentId) ?? null;
      assignmentResults.value = await getAssignmentResults(assignmentId);
    }
  } catch (error) {
    console.error("Error fetching assignment data:", error);
  }
});

function formatDate(date: Date | null): string {
  if (!date) return "N/A";
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return formattedDate;
}

function truncateQuestion(questionText: string): string {
  const maxLength = 50;
  return questionText.length > maxLength ? `${questionText.substring(0, maxLength)}...` : questionText;
}

function getUserAnswer(question: Question, userAnswers: string[]): string {
  if (!userAnswers || !question.answers) {
    return "-";
  }
  return (
    question.answers
      .filter((answer: Answer) => userAnswers.includes(answer.id.toString()))
      .map((answer: Answer) => answer.text)
      .join(", ") || "-"
  );
}

function getCorrectAnswer(question: Question): string {
  const correctAnswers = question.answers.filter((answer: Answer) => answer.isCorrect).map((answer: Answer) => answer.text);
  return correctAnswers.join(", ") || "-";
}

function isAnswerCorrect(questionInstance: { question: Question; userAnswers: string[] }): boolean {
  const userAnswer = getUserAnswer(questionInstance.question, questionInstance.userAnswers);
  const correctAnswer = getCorrectAnswer(questionInstance.question);

  return userAnswer === correctAnswer;
}
const dropdownStates = ref<boolean[]>([]);

function toggleDropdown(index: number) {
  dropdownStates.value[index] = !dropdownStates.value[index];
}

function isDropdownOpen(index: number): boolean {
  return dropdownStates.value[index];
}
</script>

<style scoped>
.table-auto {
  width: 100%;
  margin-top: 20px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}

.progress {
  height: 1.5rem;
}
</style>
