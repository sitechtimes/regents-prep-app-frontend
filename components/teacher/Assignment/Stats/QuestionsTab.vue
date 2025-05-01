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
          <td class="text-lg">{{ timeSpent[question.id] ?? "—" }} sec</td>
          <!-- answer distribution -->
          <td class="flex flex-col gap-y-2">
            <div v-for="(answer, i) in question.answers" :key="answer.id" class="flex-row items-center">
              <p class="text-lg">{{ String.fromCharCode(65 + i) }} {{ answer.selectedCount ?? 0 }} students</p>
            </div>
          </td>
          <!-- class results=number of correct students/incorrect students/unanswered -->
          <td class="text-lg">
            <div>Not Started: {{ getNotStartedCount(question.id) }} students</div>
            <div>Incorrect: {{ getIncorrectCount(question.id) }} students</div>
            <div>Correct: {{ getCorrectCount(question.id) }} students</div>
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
const route = useRoute();
const assignmentId = Number(route.params.assignmentId);
const currentAssignmentStats = ref<StaticTeacherAssignmentStatistic | DynamicTeacherAssignmentStatistic>();
const { data } = await tryCatch(getTeacherQuestionStatistic(assignmentId, true));
currentAssignmentStats.value = data;
const multipleChoiceQuestions = computed(() => currentAssignmentStats.value?.guaranteedQuestions.filter((q) => q.answerType === "Multiple Choice") ?? []);
const selectedQuestion = ref<(typeof multipleChoiceQuestions.value)[0] | null>(null);
function showQuestion(question: (typeof multipleChoiceQuestions.value)[0]) {
  selectedQuestion.value = question;
}

//TODO: make table applicable to written questions
const timeSpent = computed(() => {
  const stats = currentAssignmentStats.value?.statisticData || [];
  const map: Record<number, number> = {};

  for (const stat of stats) {
    const questionId = stat.question;
    const spent = Number(stat.timeSpent);

    if (typeof questionId === "number" && !isNaN(spent)) {
      map[questionId] = spent;
    }
  }

  return map;
});

console.log("Stats raw:", currentAssignmentStats.value?.statisticData);
console.log("Is array?", Array.isArray(currentAssignmentStats.value?.statisticData));

console.log("timeSpent", timeSpent.value);

function getNotStartedCount(questionId: number): number {
  const stats = currentAssignmentStats.value?.statisticData;
  return Array.isArray(stats) ? stats.filter((stat) => stat.question === questionId && !stat.answer).length : 0;
}

function getIncorrectCount(questionId: number): number {
  const stats = currentAssignmentStats.value?.statisticData;
  return Array.isArray(stats) ? stats.filter((stat) => stat.question === questionId && stat.answer && stat.answer !== stat.correctAnswer).length : 0;
}

function getCorrectCount(questionId: number): number {
  const stats = currentAssignmentStats.value?.statisticData;
  return Array.isArray(stats) ? stats.filter((stat) => stat.question === questionId && stat.answer === stat.correctAnswer).length : 0;
}

function removeImage(html: string): string {
  return html.replace(/<img[^>]*>/gi, "");
}
</script>

<style scoped></style>
