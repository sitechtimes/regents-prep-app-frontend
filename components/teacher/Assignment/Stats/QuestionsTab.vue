<template>
  <div v-if="teacherCurrentCourse" class="w-full rounded-md border border-gray-500">
    <table class="du-table">
      <thead>
        <tr>
          <th></th>
          <th class="text-lg font-bold">Question</th>
          <th class="text-lg font-bold">Avg. Time</th>
          <th class="text-lg font-bold">Class Results</th>
        </tr>
      </thead>
      <tbody>
        <LazyTeacherAssignmentStatsQuestionCard
          v-for="(question, index) in multipleChoiceQuestions"
          :key="question.id"
          hydrate-on-visible
          :question="question"
          :question-stat="questionStats[question.id]"
          :index="index"
          @select="selectedQuestion = question"
        />
      </tbody>
    </table>

    <FullScreenModal
      transition-name="slide-up-screen"
      :show-modal="selectedQuestion !== undefined"
      width-class="w-1/2 max-h-[70dvh] overflow-y-scroll !justify-start"
      @close="selectedQuestion = undefined"
    >
      <div class="w-full rounded-lg p-6">
        <h2 class="mb-4 text-xl font-semibold">Question Details</h2>
        <div class="mb-4 text-lg" v-html="selectedQuestion?.text"></div>

        <div v-if="selectedQuestion?.answerType === 'Multiple Choice'" class="flex flex-col gap-2">
          <div v-for="(answer, i) in selectedQuestion.answers" :key="answer.id" class="flex items-start gap-2">
            <span class="text-lg font-semibold">{{ String.fromCharCode(65 + i) }}</span>
            <div class="text-lg" v-html="answer.text"></div>
          </div>
        </div>

        <div v-else class="text-lg italic text-gray-700">Written Response — no multiple-choice answers available.</div>
        <button type="button" class="mt-6 rounded bg-green-accent px-4 py-2 text-lg text-black hover:brightness-90" @click="selectedQuestion = undefined">Close</button>
      </div>
    </FullScreenModal>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ currentAssignmentStats: TeacherAssignmentStatistic | undefined }>();

const userStore = useUserStore();
const { teacherCurrentCourse } = storeToRefs(userStore);

const multipleChoiceQuestions = computed(() => props.currentAssignmentStats?.guaranteedQuestions.filter((q) => q.answerType === "Multiple Choice") ?? []);
const statisticData = computed(() => props.currentAssignmentStats?.statisticData ?? []);

const selectedQuestion = ref<TopicQuestionInterface>();

/** Each key is a question ID */
const questionStats = computed(() => {
  /** Each key is a question ID */
  const questions: Record<number, QuestionStat> = {};

  statisticData.value.forEach((questionInstance) => {
    if (!questions[questionInstance.question])
      questions[questionInstance.question] = {
        totalTimeSpent: 0,
        totalInstances: 0,
        studentChoices: [],
        correctAnswer: multipleChoiceQuestions.value.find((question) => question.id === questionInstance.question)?.answers.find((answer) => answer.isCorrect)?.id ?? 0
      };

    const userAnswer = "staticUserAnswer" in questionInstance ? questionInstance.staticUserAnswer : questionInstance.dynamicUserAnswers.at(-1);
    if (!userAnswer) return;

    const question = questions[questionInstance.question];
    question.totalTimeSpent += questionInstance.timeSpent as number;
    question.totalInstances += 1;
    question.studentChoices.push(userAnswer);
  });

  return questions;
});
</script>

<style scoped></style>
