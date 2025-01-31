<template>
  <div class="flex h-full w-full flex-col items-center justify-start">
    <div v-if="studentCurrentCourse" class="flex h-full w-2/3 flex-col items-center justify-center gap-10">
      <StudentAssignmentCard v-if="currentAssignment" :assignment="currentAssignment" />

      <div v-if="!assignmentInProgress" class="flex w-full items-center justify-around gap-4">
        <div
          class="cursor-pointer select-none rounded-xl bg-blue-400 px-7 py-2 text-xl font-semibold transition duration-500 hover:bg-blue-500 hover:duration-150 dark:bg-blue-700 dark:hover:bg-blue-600"
          :class="{ 'du-tooltip cursor-auto saturate-0': !currentAssignment?.dateSubmitted }"
          data-tip="Submit the assignment first!"
        >
          <NuxtLink v-if="currentAssignment?.dateSubmitted" :to="`/student/course/${route.params.courseCode}/${route.params.assignmentId}/stats`">Assignment Review</NuxtLink>
          <span v-else>Assignment Review</span>
        </div>
        <button
          class="rounded-xl bg-green-400 px-7 py-2 text-xl font-semibold transition duration-500 hover:bg-green-500 hover:duration-150 dark:bg-green-700 dark:hover:bg-green-600"
          type="button"
          @click="assignmentInProgress = true"
        >
          Start
        </button>
      </div>

      <div v-else class="flex w-full flex-col items-center justify-center"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "student-get-course",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { studentCurrentCourse } = storeToRefs(userStore);

const currentAssignment = computed(() => studentCurrentCourse.value?.assignments.find((assignment) => assignment.id === Number(route.params.assignmentId)));

const assignmentInProgress = ref(false);
const currentQuestionIndex = ref<number>();
const currentQuestion = ref<QuestionInterface>();

watch(assignmentInProgress, (isInProgress) => {
  if (isInProgress && !currentQuestion.value) currentQuestionIndex.value = 0;
});

watch(currentQuestionIndex, async (question) => {
  void router.push({ query: { ...route.query, q: assignmentInProgress.value ? question : undefined } });
  currentQuestion.value = await getNextQuestion();
});

onMounted(() => {
  if (route.query.q) currentQuestionIndex.value = Number(route.query.q);
});

function warnForUnsavedChanges(event: BeforeUnloadEvent) {
  event.preventDefault();
  // TODO: add api call to save progress
}

watch(assignmentInProgress, (isInProgress) => {
  if (isInProgress) window.addEventListener("beforeunload", warnForUnsavedChanges);
  else window.removeEventListener("beforeunload", warnForUnsavedChanges);
});

onBeforeUnmount(() => window.removeEventListener("beforeunload", warnForUnsavedChanges));
</script>

<style scoped></style>
