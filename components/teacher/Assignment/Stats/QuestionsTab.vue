<template>
  <div class="w-full rounded-md border border-gray-500">
    <table class="du-table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th class="text-lg font-bold">Question Preview</th>
          <th class="text-lg font-bold">Average Time Spent</th>
          <th class="text-lg font-bold">Response Distribution</th>
          <th class="text-lg font-bold">Class Results</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(question, index) in multipleChoiceQuestions" :key="question.id" class="hover:bg-neutral-200/50" @click="showQuestion(question)">
          <!-- question number -->
          <th class="text-lg">{{ index + 1 }}</th>
          <!-- question preview -->
          <td class="flex-1 overflow-hidden text-ellipsis text-lg" v-html="removeImage(question.text)"></td>
          <!-- time spent -->
          <td class="text-lg">{{ getAverageTimeSpent(question.id) ?? "—" }}</td>
          <!-- answer distribution -->
          <td class="flex flex-col gap-y-2">
            <div v-for="(answer, i) in question.answers" :key="answer.id" class="flex-row items-center">
              <span class="font-semibold">{{ String.fromCharCode(65 + i) }}:</span>
              <span>{{ answerSelections[question.id]?.[answer.id] ?? 0 }} students</span>
            </div>
          </td>
          <!-- class results=number of correct students/incorrect students/unanswered -->
          <td class="text-lg">
            <div>Not Started: {{ getNotStarted(question.id) }} students</div>
            <div>Incorrect: {{ getIncorrect(question.id) }} students</div>
            <div>Correct: {{ getCorrect(question.id) }} students</div>
          </td>
        </tr>
        <!-- end of row -->
      </tbody>
    </table>

    <!-- question modal -->
    <div v-if="selectedQuestion" class="fixed inset-0 z-50 flex items-center justify-center border border-gray-500 bg-black bg-opacity-50">
      <div class="w-full max-w-2xl rounded-lg bg-white p-6">
        <h2 class="mb-4 text-xl font-semibold">Question Details</h2>

        <div class="mb-4 text-lg" v-html="selectedQuestion.text"></div>

        <div v-if="selectedQuestion.answerType === 'Multiple Choice'" class="flex flex-col gap-2">
          <div v-for="(answer, i) in selectedQuestion.answers" :key="answer.id" class="flex items-start gap-2">
            <span class="text-lg font-semibold">{{ String.fromCharCode(65 + i) }}</span>
            <div class="text-lg" v-html="answer.text"></div>
          </div>
        </div>
        <div v-else class="text-lg italic text-gray-700">Written Response — no multiple-choice answers available.</div>

        <button type="button" class="mt-6 rounded bg-green-accent px-4 py-2 text-lg text-black hover:brightness-90" @click="selectedQuestion = null">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course"
});

// const route = useRoute();
// const assignmentId = Number(route.params.assignmentId);
// const currentAssignmentStats = ref<StaticTeacherAssignmentStatistic | DynamicTeacherAssignmentStatistic>();
// const { data } = await tryCatch(getTeacherQuestionStatistic(assignmentId, true));
// currentAssignmentStats.value = data;

const currentAssignmentStats = ref<{
  guaranteedQuestions: {
    id: number;
    text: string;
    answerType: string;
    difficulty: number;
    correctFirstAttempts: number;
    totalFirstAttempts: number;
    answers: { id: number; text: string; isCorrect: boolean }[];
  }[];
  statisticData: {
    question: number;
    answer: number | null;
    correctAnswer: number;
    timeSpent: number;
    staticUserAnswer: number;
  }[];
}>({
  guaranteedQuestions: [
    {
      id: 1001,
      text: "<p>What is the acceleration of an object in free fall?</p>",
      answerType: "Multiple Choice",
      difficulty: 1,
      correctFirstAttempts: 5,
      totalFirstAttempts: 10,
      answers: [
        { id: 201, text: "<p>0 m/s²</p>", isCorrect: false },
        { id: 202, text: "<p>9.8 m/s²</p>", isCorrect: true },
        { id: 203, text: "<p>4.9 m/s²</p>", isCorrect: false },
        { id: 204, text: "<p>Depends on mass</p>", isCorrect: false }
      ]
    }
  ],
  statisticData: [
    { question: 1001, answer: 202, correctAnswer: 202, timeSpent: 8, staticUserAnswer: 202 },
    { question: 1001, answer: 203, correctAnswer: 202, timeSpent: 10, staticUserAnswer: 203 },
    { question: 1001, answer: null, correctAnswer: 202, timeSpent: 0, staticUserAnswer: 0 }
  ]
});

const multipleChoiceQuestions = computed(() => currentAssignmentStats.value?.guaranteedQuestions.filter((q) => q.answerType === "Multiple Choice") ?? []);
const selectedQuestion = ref<(typeof multipleChoiceQuestions.value)[0] | null>(null);
function showQuestion(question: (typeof multipleChoiceQuestions.value)[0]) {
  selectedQuestion.value = question;
}

//TODO: make table applicable to written questions
const answerSelections = computed(() => {
  const stats = currentAssignmentStats.value?.statisticData ?? [];
  const map: Record<number, Record<number, number>> = {};

  for (const stat of Array.isArray(stats) ? stats : []) {
    if (stat.question && stat.answer) {
      if (!map[stat.question]) map[stat.question] = {};
      if (!map[stat.question][stat.answer]) map[stat.question][stat.answer] = 0;
      map[stat.question][stat.answer]++;
    }
  }

  return map;
});

const averageTimeSpent = computed(() => {
  const stats = currentAssignmentStats.value?.statisticData ?? [];
  const map: Record<number, { total: number; count: number }> = {};

  stats.forEach((stat: { question: number; timeSpent: number }) => {
    const questionId = stat.question;
    const spent = Number(stat.timeSpent);
    if (!map[questionId]) map[questionId] = { total: 0, count: 0 };
    map[questionId].total += spent;
    map[questionId].count++;
  });

  const avgMap: Record<number, number> = {};
  Object.entries(map).forEach(([qid, { total, count }]) => {
    avgMap[Number(qid)] = Math.round(total / count);
  });

  return avgMap;
});

console.log("Stats raw:", currentAssignmentStats.value?.statisticData);
console.log("Is array?", Array.isArray(currentAssignmentStats.value?.statisticData));

console.log("timeSpent", averageTimeSpent.value);

function getAverageTimeSpent(questionId: number) {
  return averageTimeSpent.value[questionId];
}

function getNotStarted(questionId: number) {
  const stats = currentAssignmentStats.value?.statisticData;
  return Array.isArray(stats) ? stats.filter((s) => s.question === questionId && !s.answer).length : 0;
}

function getIncorrect(questionId: number): number {
  const stats = currentAssignmentStats.value?.statisticData;
  return Array.isArray(stats) ? stats.filter((s) => s.question === questionId && s.answer && s.answer !== s.correctAnswer).length : 0;
}

function getCorrect(questionId: number): number {
  const stats = currentAssignmentStats.value?.statisticData;
  return Array.isArray(stats) ? stats.filter((s) => s.question === questionId && s.answer === s.correctAnswer).length : 0;
}

function removeImage(html: string): string {
  return html.replace(/<img[^>]*>/gi, "");
}
</script>

<style scoped></style>
