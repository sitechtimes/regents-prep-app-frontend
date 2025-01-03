<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <!--<h2 class="text-2xl mt-6">{{ currentAssignment.name }}</h2>-->
    <h3 class="text-xl mt-6">Assignment Statistics</h3>
    <p>Grade: {{ (questionsCorrect / numOfQuestions * 100).toFixed(0)}}%</p>
    <div class="h-4 w-24 rounded-full border-[1.5px] border-gray-300">
        <div
          class="h-full rounded-full bg-green-500"
          :style="{ width: (questionsCorrect / numOfQuestions) * 100 + '%' }"
        ></div>
      </div>

    <div class="w-full max-w-4xl mt-6 mb-6">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Question</th>
            <th class="px-4 py-2">Answer Type</th>
            <th class="px-4 py-2">Correct Answer</th>
            <th class="px-4 py-2">Your Answer</th>
            <th class="px-4 py-2">Results</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(questionInstance, index) in questionInstances"
            :key="questionInstance.id"
            class="hover:bg-green-accent text-center"
          >
            <td class="px-4 py-2 text-center text-xl font-medium">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2" v-html="questionInstance.question.text"></td>
            <td class="px-4 py-2">
              {{ questionInstance.question.answerType }}
            </td>
            <td class="px-4 py-2">
              {{
                getCorrectAnswerText(questionInstance.question.answers)
              }}
            </td>
            <td class="px-4 py-2">
              {{
                getUserAnswerText(
                  questionInstance.userAnswers[0],
                  questionInstance.question.answers
                )
              }}
            </td>
            <td class ="px-4 py-2">
              <span :class="getResultClass(questionInstance)">
                {{ getResultText(questionInstance) }}
              </span>
            </td>

          </tr>
        </tbody>
      </table>
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
    console.log( results);
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
  return html.replace(/<\/?p>/g, "");
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
</script>

<style scoped>

</style>
