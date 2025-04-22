<template>
  <div class="flex w-full flex-col items-center justify-center">
    <div class="flex w-full items-center justify-center">
      <p class="grow">Question</p>
      <p class="w-44 text-center">Average Time Spent</p>
      <p class="w-44 text-center">Response Distribution</p>
      <p class="w-44 text-center">Class Results</p>
    </div>

    <div class="flex w-full items-center justify-center">
      <p>if this text shows, the code works</p>
      <div class="space-y-8">
        <div v-for="(question, index) in multipleChoiceQuestions" :key="question.id" class="rounded-lg border p-4 shadow">
          <h2 class="mb-2 text-lg font-semibold">Q{{ index + 1 }}: <span v-html="question.text" /></h2>
          <!-- question distribution -->
          <div class="space-y-2">
            <div v-for="(answer, i) in question.answers" :key="answer.id" class="flex flex-col items-center justify-between rounded bg-gray-100 px-4 py-2">
              <p class="text-sm text-gray-700">{{ answer.selectedCount ?? 0 }} Selections</p>
              <span class="font-medium"> {{ String.fromCharCode(65 + i) }}</span>
            </div>
          </div>

          <!-- average time spent -->

          <!-- avergae class results -->
        </div>
      </div>
      <!-- TODO: just copy ap classroom's questions tab lol -->
    </div>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps<{}>();
// const emit = defineEmits<{}>();
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course"
});
const userStore = useUserStore();
const { teacherCurrentCourse } = storeToRefs(userStore);
const route = useRoute();
const allAssignments = ref<StudentAssignment[]>([]);
const assignmentId = Number(route.params.assignmentId);
const currentAssignmentStats = ref<StaticTeacherAssignmentStatistic | DynamicTeacherAssignmentStatistic>();
const currentAssignment = computed(() => teacherCurrentCourse.value?.assignments.find((assignment) => assignment.id === assignmentId));
currentAssignment.value = allAssignments.value.find((assignment) => assignment.id === assignmentId);
console.log(currentAssignment.value);

const { data, error } = await tryCatch(getTeacherQuestionStatistic(assignmentId, true));
currentAssignmentStats.value = data;
console.log(currentAssignmentStats.value);
const multipleChoiceQuestions = currentAssignmentStats.value.guaranteedQuestions.filter((q) => q.answerType === "Multiple Choice");
</script>

<style scoped></style>
