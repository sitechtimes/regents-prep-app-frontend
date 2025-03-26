<template>
  <div class="flex w-full items-start justify-center gap-8">
    <form
      class="sticky top-20 flex w-[35rem] shrink-0 flex-col gap-2 rounded-xl border border-neutral-400 bg-neutral-200/50 p-6 dark:border-neutral-600 dark:bg-neutral-600/50"
      @submit.prevent="createAssignment"
    >
      <h3 class="text-2xl font-bold">Create Assignment</h3>

      <div>
        <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="name">Name <span title="Required" class="font-2xl text-red-500">*</span></label>
        <input
          id="name"
          v-model="assignmentInfo.name"
          required
          type="text"
          class="fo-input border-neutral-400 bg-neutral-100 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:hover:border-neutral-300/50"
          placeholder="Unit 3 Review"
        />
      </div>

      <div>
        <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white">Due <span title="Required" class="font-2xl text-red-500">*</span></label>
        <div class="flex w-full items-center justify-center gap-3">
          <input
            v-model="assignmentInfo.dueDate.date"
            required
            type="date"
            class="fo-input border-neutral-400 bg-neutral-100 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:hover:border-neutral-300/50"
            :min="currentDateISO"
          />
          <input
            v-model="assignmentInfo.dueDate.time"
            required
            type="time"
            class="fo-input border-neutral-400 bg-neutral-100 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:hover:border-neutral-300/50"
          />
        </div>
      </div>

      <div class="flex w-full items-center justify-center gap-3">
        <div class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="time-per-question">Time limit (minutes)</label>
          <input
            id="time-per-question"
            v-model.number="assignmentInfo.timeAllotted"
            type="number"
            class="fo-input border-neutral-400 bg-neutral-100 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:hover:border-neutral-300/50"
            placeholder="Unlimited"
          />
        </div>

        <div class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="attempts-per-question">Attempts per question</label>
          <input
            id="attempts-per-question"
            v-model.number="assignmentInfo.attemptsAllowed"
            type="number"
            class="fo-input border-neutral-400 bg-neutral-100 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:hover:border-neutral-300/50"
            placeholder="Unlimited"
          />
        </div>
      </div>

      <div>
        <p class="dark:text-whit fo-label fo-label-text pointer-events-none shrink-0 font-bold text-black dark:text-white">
          Questions and Topics <span title="Required" class="font-2xl text-red-500">*</span>
        </p>
        <div
          class="flex h-96 w-full items-center justify-center rounded-lg border border-neutral-400 bg-neutral-100 hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-300/50"
        >
          <div v-if="!assignmentInfo.topicIds.length && !assignmentInfo.questionIds.length" class="mb-10 flex flex-col items-center justify-center">
            <img class="size-40 opacity-65 dark:invert" src="/ui/plus.svg" aria-hidden="true" />
            <h5 class="text-center text-xl font-bold text-neutral-500">No Questions or Topics Selected</h5>
            <p class="w-3/4 text-center text-sm font-medium text-neutral-400">Select questions and topics from the question bank to add them to this assignment!</p>
          </div>

          <ul v-else class="flex h-full w-full flex-col items-start justify-start gap-2 overflow-y-scroll py-2 pl-4">
            <li v-for="(question, index) in assignmentInfo.questionIds" :key="question.questionId" class="flex w-full items-center justify-start gap-3">
              <span>{{ index + 1 }}.</span>

              <!-- * the regex is to remove images and combine all tags into 1 <p> -->
              <p
                class="w-60 grow overflow-hidden overflow-ellipsis text-nowrap"
                v-html="
                  loadedQuestions[question.questionId].text
                    .replace(/<img\b[^>]*>/gi, '(image)')
                    .replace(/<[^>]+>/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim()
                "
              ></p>

              <div class="flex items-center justify-center gap-2">
                <div class="du-tooltip du-tooltip-bottom" :data-tip="`Switch to ${question.isGuaranteed ? 'Random' : 'Guaranteed'}`">
                  <TeacherAssignmentCatalogQuestionButton :click-function="() => (question.isGuaranteed = !question.isGuaranteed)" :img="`/ui/${question.isGuaranteed ? 'check' : 'dice'}.svg`" />
                </div>
                <TeacherAssignmentCatalogQuestionButton :click-function="() => removeQuestion(question.questionId)" img="/ui/trash.svg" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex w-full items-center justify-between px-10">
        <div class="flex items-center gap-1">
          <input id="late-submissions" v-model="assignmentInfo.lateSubmissions" type="checkbox" class="fo-checkbox border-neutral-400 bg-neutral-300 dark:bg-neutral-900" />
          <label class="fo-label fo-label-text shrink-0 translate-y-0.5 text-base text-black dark:text-white" for="late-submissions">Allow late submissions</label>
        </div>

        <div :data-tip="!assignmentInfo.name ? 'Assignment must have a name' : 'You must have at least one question or topic'" :class="{ 'du-tooltip': !allowedToSubmit }">
          <button
            class="rounded-lg border px-8 py-1.5 text-xl font-medium text-black"
            :class="
              allowedToSubmit
                ? 'border-green-500 bg-green-500 hover:brightness-110'
                : 'cursor-not-allowed border-none border-neutral-300 bg-neutral-200 p-0 transition duration-500 hover:border-neutral-400 dark:bg-neutral-600/50'
            "
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </form>

    <TeacherAssignmentQuestionCatalog :view-only="false" :current-questions="assignmentInfo.questionIds" :current-topic-ids="assignmentInfo.topicIds" @select-question="addQuestion" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course"
});

const route = useRoute();
const userStore = useUserStore();
const { showSideMenu, loadedQuestions } = storeToRefs(userStore);

const currentDateISO = (() => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();

  return `${year}-${month}-${day}`;
})();
const courseID = Number(route.params.courseCode);

const assignmentInfo = reactive({
  name: "",
  dueDate: {
    date: currentDateISO,
    time: "23:59"
  },
  questionIds: ref<CreateAssignmentQuestion[]>([]),
  topicIds: ref<number[]>([]),
  lateSubmissions: false,
  /** In minutes */
  timeAllotted: ref<number>(),
  attemptsAllowed: ref<number>()
});

const allowedToSubmit = computed(() => assignmentInfo.name && (assignmentInfo.questionIds.length || assignmentInfo.topicIds.length));

function removeQuestion(questionId: number) {
  // prettier-ignore
  assignmentInfo.questionIds.splice(assignmentInfo.questionIds.findIndex((question) => question.questionId === questionId), 1);
}
function addQuestion(questionId: number) {
  if (!assignmentInfo.questionIds.find((question) => question.questionId === questionId)) assignmentInfo.questionIds.push({ questionId, isGuaranteed: true });
  else removeQuestion(questionId);
}

const createAssignmentResult = reactive({
  isLoading: false,
  success: "",
  error: ""
});

let sideMenuWasOpen = false;
onMounted(() => {
  sideMenuWasOpen = showSideMenu.value;
  showSideMenu.value = false;
});
onBeforeUnmount(() => (showSideMenu.value = sideMenuWasOpen));

async function createAssignment() {
  if (!allowedToSubmit.value) return;

  createAssignmentResult.isLoading = true;

  const { error } = await tryCatch(
    submitCreateAssignment(
      assignmentInfo.name,
      courseID,
      assignmentInfo.questionIds.filter((question) => question.isGuaranteed).map((question) => question.questionId),
      assignmentInfo.questionIds.filter((question) => !question.isGuaranteed).map((question) => question.questionId),
      `${assignmentInfo.dueDate.date}T${assignmentInfo.dueDate.time}`,
      assignmentInfo.questionIds.length,
      assignmentInfo.lateSubmissions,
      assignmentInfo.timeAllotted ?? 0,
      assignmentInfo.attemptsAllowed ?? 0
    )
  );
  createAssignmentResult.isLoading = false;

  if (error) {
    createAssignmentResult.error = error.message;
    console.error(error);
  }
}
</script>

<style scoped></style>
