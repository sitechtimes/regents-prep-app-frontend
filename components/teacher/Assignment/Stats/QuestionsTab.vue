<template>
  <div class="w-full rounded-md border border-gray-500">
    <table class="du-table">
      <thead>
        <tr>
          <th></th>
          <th class="text-lg font-bold">Question Preview</th>
          <th class="text-lg font-bold">Avg. Time</th>
          <th class="text-lg font-bold">Response Distribution</th>
          <th class="text-lg font-bold">Class Results</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in multipleChoiceQuestions" :key="question.id" class="hover:bg-neutral-200/50" @click="showQuestion(question)">
          <th class="text-lg">{{ index + 1 }}</th>
          <td class="overflow-hidden text-ellipsis text-lg" v-html="removeImage(question.text)"></td>
          <td class="text-lg">{{ averageTimeSpent[question.id] ?? "—" }} sec</td>

          <td>
            <div class="flex flex-col gap-y-1 text-lg">
              <div v-for="(answer, i) in question.answers" :key="answer.id" :class="{ 'font-bold text-green-700': answer.id === question.correctAnswer }">
                {{ String.fromCharCode(65 + i) }}. {{ getSelectedCount(question.id, answer.id) }} students
              </div>
            </div>
          </td>

          <td class="w-48">
            <div class="flex h-6 w-full overflow-hidden rounded-full border border-neutral-300 bg-neutral-200">
              <div class="bg-green-500" :style="{ width: getPercent(question.id, 'correct') + '%' }"></div>
              <div class="bg-red-500" :style="{ width: getPercent(question.id, 'incorrect') + '%' }"></div>
              <div class="bg-gray-400" :style="{ width: getPercent(question.id, 'notStarted') + '%' }"></div>
            </div>
            <div class="mt-1 text-xs text-neutral-700">{{ getCorrect(question.id) }} | {{ getIncorrect(question.id) }} | {{ getNotStarted(question.id) }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedQuestion" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
definePageMeta({ layout: "teacher", middleware: "teacher-get-course" });

const route = useRoute();
const assignmentId = Number(route.params.assignmentId);

const currentAssignmentStats = ref<StaticTeacherAssignmentStatistic | DynamicTeacherAssignmentStatistic>();
const { data } = await tryCatch(getTeacherQuestionStatistic(assignmentId, true));
currentAssignmentStats.value = data;

const multipleChoiceQuestions = computed(() => currentAssignmentStats.value?.guaranteedQuestions.filter((q) => q.answerType === "Multiple Choice") ?? []);

const statisticData = computed(() => currentAssignmentStats.value?.statisticData ?? []);
const totalStudents = 10;

const averageTimeSpent = computed(() => {
  const map: Record<number, { total: number; count: number }> = {};
  if (Array.isArray(statisticData.value)) {
    statisticData.value.forEach(({ question, timeSpent }) => {
      if (!map[question]) map[question] = { total: 0, count: 0 };
      map[question].total += Number(timeSpent);
      map[question].count += 1;
    });
  }
  const avg: Record<number, number> = {};
  for (const [qid, { total, count }] of Object.entries(map)) {
    avg[+qid] = Math.round(total / count);
  }
  return avg;
});

function mapStudentAnswers() {
  return statisticData.value.map((stat) => {
    return {
      studentId: stat.studentId,
      questionId: stat.question,
      studentAnswer: stat.staticUserAnswer ?? stat.dynamicUserAnswer
    };
  });
}

function getSelectedCount(questionId: number, answerId: number) {
  const studentAnswers = mapStudentAnswers();
  return studentAnswers.filter((stat) => stat.questionId === questionId && stat.studentAnswer === answerId).length;
}

function getCorrect(qid: number) {
  const question = multipleChoiceQuestions.value.find((q) => q.id === qid);
  if (!question?.correctAnswer) return 0;

  const studentAnswers = mapStudentAnswers();
  return studentAnswers.filter((stat) => stat.questionId === qid && stat.studentAnswer === question.correctAnswer).length;
}

function getIncorrect(qid: number) {
  const question = multipleChoiceQuestions.value.find((q) => q.id === qid);
  if (!question?.correctAnswer) return 0;

  const studentAnswers = mapStudentAnswers();
  return studentAnswers.filter((stat) => stat.questionId === qid && stat.studentAnswer !== question.correctAnswer && stat.studentAnswer !== null).length;
}

function getNotStarted(qid: number) {
  const total = totalStudents;
  const correct = getCorrect(qid);
  const incorrect = getIncorrect(qid);
  return total - correct - incorrect;
}

function getPercent(qid: number, type: "correct" | "incorrect" | "notStarted") {
  const total = totalStudents;
  const value = type === "correct" ? getCorrect(qid) : type === "incorrect" ? getIncorrect(qid) : getNotStarted(qid);

  return total ? ((value / total) * 100).toFixed(1) : "0";
}

function removeImage(html: string): string {
  return html.replace(/<img[^>]*>/gi, "");
}

const selectedQuestion = ref<(typeof multipleChoiceQuestions.value)[0] | null>(null);
function showQuestion(question: (typeof multipleChoiceQuestions.value)[0]) {
  selectedQuestion.value = question;
}
</script>

<style scoped></style>
