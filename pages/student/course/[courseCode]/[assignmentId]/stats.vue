<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h3 class="text-2xl mt-6">Assignment Statistics</h3>
    <p class="text-xl py-1 mb-5 font-medium">Grade: {{ (questionsCorrect / numOfQuestions * 100).toFixed(0) }}%</p>
    <div class="relative w-full max-w-lg h-8 mb-20 rounded-full border-[1.5px] border-gray-300 overflow-hidden">
      <div class="absolute inset-0 bg-red-500" :style="{ width: '100%' }">
      </div>
      <div class="absolute h-full bg-green-500" :style="{ width: (questionsCorrect / numOfQuestions) * 100 + '%' }">
      </div>
      <div class="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
        {{ questionsCorrect }} / {{ numOfQuestions }}
      </div>
    </div>
    <div class="header-row grid grid-cols-5 px-4 py-2 gap-4 text-lg font-bold border-b w-full">
      <div>Question</div>
      <div>Question Preview</div>
      <div>Student's Answer</div>
      <div>Correct Answer</div>
      <div>Results</div>
    </div>
    <div v-for="(questionInstance, index) in questionInstances" :key="questionInstance.id"
      class="hover:bg-green-accent du-collapse bg-gray text-sm">
      <input type="checkbox" />
      <div class="du-collapse-title px-4 py-15 text-lg font-medium grid grid-cols-5 gap-4">
        <div>{{ index + 1 }}</div>
        <div>{{ stripHtml(truncateString(questionInstance.question.text, 25)) }}...</div>
        <div>{{ getUserAnswerText(questionInstance.userAnswers[0], questionInstance.question.answers) }}</div>
        <div>{{ getCorrectAnswerText(questionInstance.question.answers) }}</div>
        <div><span :class="getResultClass(questionInstance)">{{ getResultText(questionInstance) }}</span></div>
      </div>
      <div class="du-collapse-content px-4 py-15 text-lg font-medium">
        <p class="mb-4" v-html="questionInstance.question.text"></p>
        <ul class="list-disc ml-6">
          <li v-for="answer in questionInstance.question.answers" :key="answer.id" :class="{
            'text-blue-500': questionInstance.userAnswers.includes(answer.id),
            'font-bold text-green-500': answer.isCorrect
          }" class="mb-2">
            <span v-html="stripHtml(answer.text)"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "auth",
  requiresAuth: true
});

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  answerType: string;
  answers: Answer[];
}

interface QuestionInstance {
  id: number;
  userAnswers: number[];
  isComplete: boolean;
  question: Question;
}

const route = useRoute();
const assignmentId = ref(Number(route.params.assignmentId));
const numOfQuestions = ref(0);
const questionInstances = ref<QuestionInstance[]>([]);
const questionsCorrect = ref(0);

onMounted(async () => {
  try {
    const results = await getAssignmentResults(assignmentId.value);
    console.log(results);
    numOfQuestions.value = results.numOfQuestions || 0;
    questionsCorrect.value = results.questionsCorrect || 0;
    questionInstances.value = results.questionInstances.map((instance: any) => ({
      ...instance,
      userAnswers: instance.userAnswers.map((answer: string | number) =>
        typeof answer === "string" ? Number(answer) : answer
      ),
    }));
  } catch (error) {
    console.error("Error fetching assignment results:", error);
  }
});

function getCorrectAnswerText(answers: Answer[]): string {
  const correctAnswer = answers.find(function (answer) {
    return answer.isCorrect;
  });
  return correctAnswer ? stripHtml(correctAnswer.text) : "N/A";
}

function getUserAnswerText(userAnswerId: number, answers: Answer[]): string {
  const userAnswer = answers.find(function (answer) {
    return answer.id === userAnswerId;
  });
  return userAnswer ? stripHtml(userAnswer.text) : "No Answer Selected";
}

function stripHtml(html: string): string {
  return html.replace(/<\/?(p|em)>/g, "");
}

function getResultText(questionInstance: QuestionInstance): string {
  const correctAnswerId = questionInstance.question.answers.find(function (answer) {
    return answer.isCorrect;
  })?.id;
  const userAnswerId = questionInstance.userAnswers[0];
  return correctAnswerId === userAnswerId ? "Correct" : "Incorrect";
}

function getResultClass(questionInstance: QuestionInstance): string {
  const isCorrect = getResultText(questionInstance) === "Correct";
  return isCorrect ? "text-green-500 font-bold" : "text-red-500 font-bold";
}

function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength);
  } else {
    return str;
  }
}
</script>

<style scoped></style>
