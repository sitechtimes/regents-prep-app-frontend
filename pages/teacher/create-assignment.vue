<template>
  <!-- evil margins and paddings are because layouts have innate p-4 and this page has WACKY scroll shenanigans... -->
  <div class="-m-4 flex w-auto flex-col px-4 lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] lg:flex-row lg:overflow-y-hidden">
    <!-- if user is making assignments at 3am, prank em -->
    <!-- v-if="new Date().getHours() === 3" -->
    <!-- <output class="fixed right-4 w-[40rem] rounded-xl border border-dotted border-red-500 bg-neutral-100 p-2">{{ assignmentInfo }}</output> -->
    <form class="flex h-full max-h-full w-full shrink-0 flex-col gap-2 p-4 lg:w-[35rem] lg:overflow-y-clip" @submit.prevent="createAssignment">
      <h2 class="text-2xl font-bold">Create Assignment</h2>

      <fieldset>
        <legend class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white">For <span title="Required" class="text-red-500">*</span></legend>
        <div class="max-h-36 space-y-1 overflow-y-auto rounded-lg border border-neutral-400 bg-white p-3 dark:border-neutral-600 dark:bg-neutral-900">
          <div v-for="course in teacherCourses" :key="course.id" class="flex items-center gap-2">
            <input
              :id="'course-' + course.id"
              class="du-checkbox border-neutral-400 dark:bg-neutral-900"
              type="checkbox"
              :disabled="course.id === initialCourse"
              :checked="course.id === initialCourse"
              @input="(e) => toggleCourse(course.id, e)"
            />
            <label
              class="fo-label w-full text-black dark:text-white"
              :class="course.id === initialCourse ? 'cursor-not-allowed text-neutral-600 dark:text-neutral-300' : 'cursor-pointer'"
              :for="'course-' + course.id"
            >
              {{ course.name }}
            </label>
          </div>
        </div>
      </fieldset>

      <div class="flex w-full items-center justify-center gap-3">
        <div class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="name">Name <span title="Required" class="text-red-500">*</span></label>
          <input
            id="name"
            v-model="assignmentInfo.name"
            required
            type="text"
            class="fo-input border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            placeholder="Unit 3 Review"
          />
        </div>
        <div class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="number-of-questions">
            Number of Questions
            <span title="Required" class="text-red-500">*</span>
          </label>
          <input
            id="number-of-questions"
            v-model="assignmentInfo.numOfQuestions"
            required
            type="number"
            class="fo-input border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            placeholder="10"
          />
        </div>
      </div>

      <fieldset>
        <legend class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white">
          Due
          <span title="Required" class="text-red-500">*</span>
        </legend>
        <div class="flex w-full items-center justify-center gap-3">
          <input
            v-model="assignmentInfo.dueDate.date"
            required
            type="date"
            class="fo-input border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            :min="currentDateISO"
          />
          <input
            v-model="assignmentInfo.dueDate.time"
            required
            type="time"
            class="fo-input border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
          />
        </div>
      </fieldset>

      <div class="flex w-full items-center justify-center gap-3">
        <div class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="time-per-question">Time limit (minutes)</label>
          <input
            id="time-per-question"
            v-model.number="assignmentInfo.timeAllotted"
            type="number"
            class="fo-input border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            placeholder="Unlimited"
          />
        </div>

        <div class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="attempts-per-question">Attempts per question</label>
          <input
            id="attempts-per-question"
            v-model.number="assignmentInfo.attemptsAllowed"
            type="number"
            class="fo-input border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            placeholder="Unlimited"
          />
        </div>
      </div>

      <div class="mb-2 flex w-full grow flex-col">
        <p class="fo-label fo-label-text pointer-events-none flex-none shrink-0 font-bold text-black dark:text-white">Questions and Topics <span title="Required" class="text-red-500">*</span></p>
        <div
          class="flex h-0 max-h-full min-h-80 w-full grow items-center justify-center rounded-lg border border-neutral-400 bg-white hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-300/50"
        >
          <!-- mb is to account for the innate large (fake) mt of the image -->
          <div v-if="!assignmentInfo.topicIds.length && !assignmentInfo.questions.length" class="mb-6 flex h-fit flex-col items-center justify-center">
            <img class="pointer-events-none size-40 select-none opacity-65 dark:invert" src="/ui/plus.svg" aria-hidden="true" />
            <p class="text-center text-xl font-bold text-neutral-500 dark:text-white">No Questions or Topics Selected</p>
            <p class="w-3/4 text-center text-sm font-medium text-neutral-400">Select questions and topics from the question bank to add them to this assignment!</p>
          </div>

          <div v-else class="flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-scroll pl-4 pr-2 pt-4">
            <h2 v-if="assignmentInfo.topicIds.length && (assignmentInfo.questions.length || assignmentInfo.excludedQuestions.length)" class="text-2xl font-bold">Topics</h2>
            <ol v-if="assignmentInfo.topicIds.length" class="flex w-full flex-col items-start justify-start gap-2">
              <li v-for="(topicId, index) in assignmentInfo.topicIds" :key="topicId.at(-1)" class="flex w-full items-center justify-start gap-3">
                <span>{{ index + 1 }}. </span>

                <p class="w-60 grow overflow-hidden overflow-ellipsis text-nowrap" v-html="loadedTopics[topicId.at(-1)!]?.name ?? 'All topics'"></p>

                <TeacherAssignmentCatalogQuestionButton :click-function="() => removeTopic(topicId.at(-1) ?? 1)" img="/ui/trash.svg" />
              </li>
            </ol>

            <h3 v-if="assignmentInfo.topicIds.length && assignmentInfo.questions.length" class="text-2xl font-bold">Questions</h3>
            <ol v-if="assignmentInfo.questions.length" class="flex w-full flex-col items-start justify-start gap-2">
              <li v-for="(question, index) in assignmentInfo.questions" :key="question.questionId" class="flex w-full items-center justify-start gap-3">
                <span>{{ index + 1 }}.</span>

                <p class="w-60 grow overflow-hidden overflow-ellipsis text-nowrap" v-html="flattenQuestion(loadedQuestions[question.questionId].text)"></p>

                <div class="flex items-center justify-center gap-2">
                  <div class="du-tooltip du-tooltip-bottom" :data-tip="`Switch to ${question.isGuaranteed ? 'Random' : 'Guaranteed'}`">
                    <TeacherAssignmentCatalogQuestionButton :click-function="() => (question.isGuaranteed = !question.isGuaranteed)" :img="`/ui/${question.isGuaranteed ? 'check' : 'dice'}.svg`" />
                  </div>
                  <TeacherAssignmentCatalogQuestionButton :click-function="() => removeQuestion(question.questionId)" img="/ui/trash.svg" />
                </div>
              </li>
            </ol>

            <h3 v-if="assignmentInfo.excludedQuestions.length" class="text-2xl font-bold">Excluded Questions</h3>
            <ul v-if="assignmentInfo.excludedQuestions.length" class="flex w-full flex-col items-start justify-start gap-2">
              <li v-for="question in assignmentInfo.excludedQuestions" :key="question.questionId" class="flex w-full items-center justify-start gap-3">
                <span>•</span>
                <p class="w-60 grow overflow-hidden overflow-ellipsis text-nowrap" v-html="flattenQuestion(loadedQuestions[question.questionId].text)"></p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center lg:gap-2 lg:px-10">
        <div class="flex items-center gap-1">
          <input id="late-submissions" v-model="assignmentInfo.lateSubmissions" type="checkbox" class="du-checkbox border-neutral-400 dark:bg-neutral-900" />
          <label class="fo-label fo-label-text shrink-0 translate-y-0.5 text-base text-black dark:text-white" for="late-submissions">Allow late submissions</label>
        </div>

        <div :data-tip="!assignmentInfo.name ? 'Assignment must have a name' : 'You must have at least one question or topic'" :class="{ 'du-tooltip': !allowedToSubmit }">
          <button
            class="w-full rounded-lg border px-8 py-1.5 text-xl font-medium text-black lg:w-fit"
            :class="
              allowedToSubmit
                ? 'border-green-500 bg-green-500 hover:brightness-110'
                : 'cursor-not-allowed border-none border-neutral-300 bg-neutral-200 p-0 transition duration-300 hover:border-neutral-400 dark:bg-neutral-600/50'
            "
            type="submit"
          >
            <span v-if="createAssignmentResult.isLoading" class="loading du-loading du-loading-sm mt-1"></span>
            <span v-else>Create</span>
          </button>
        </div>
      </div>
    </form>

    <!-- horizontal separator for mobile, desktop uses a border on the catalog container -->
    <div class="my-4 w-full border border-neutral-600/50 lg:hidden dark:border-neutral-300/50"></div>

    <div class="flex w-full flex-col border-neutral-600/50 px-4 lg:-mr-4 lg:h-full lg:max-h-full lg:overflow-y-auto lg:border-l lg:pb-4 dark:border-neutral-300/50">
      <TeacherAssignmentQuestionCatalog
        :view-only="false"
        :current-questions="assignmentInfo.questions"
        :current-topic-ids="assignmentInfo.topicIds"
        :excluded-question-ids="assignmentInfo.excludedQuestions.map((question) => question.questionId)"
        @select-question="addQuestion"
        @select-topic="addTopic"
        @toggle-exclusion="toggleExclusion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher"
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { showSideMenu, loadedTopics, loadedQuestions, teacherCourses } = storeToRefs(userStore);

const currentDateISO = (() => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();

  return `${year}-${month}-${day}`;
})();
const courseIDs = reactive<number[]>([]); // TODO: todo
const initialCourse = Number(route.query.course);

const assignmentInfo = reactive({
  name: "",
  dueDate: {
    date: currentDateISO,
    time: "23:59"
  },
  questions: ref<CreateAssignmentQuestion[]>([]),
  excludedQuestions: ref<ExcludeAssignmentQuestion[]>([]),
  topicIds: ref<number[][]>([]),
  numOfQuestions: ref<number>(),
  lateSubmissions: false,
  /** In minutes */
  timeAllotted: ref<number>(),
  attemptsAllowed: ref<number>()
});

const allowedToSubmit = computed(() => assignmentInfo.name && (assignmentInfo.questions.length || assignmentInfo.topicIds.length));

function removeQuestion(questionId: number) {
  // prettier-ignore
  assignmentInfo.questions.splice(assignmentInfo.questions.findIndex((question) => question.questionId === questionId), 1);
}

function addQuestion(questionId: number) {
  if (!assignmentInfo.questions.find((question) => question.questionId === questionId)) assignmentInfo.questions.push({ questionId, isGuaranteed: true });
  else removeQuestion(questionId);
}

function removeTopic(topicId: number) {
  // handle root
  if (topicId === 1) return void (assignmentInfo.topicIds = assignmentInfo.excludedQuestions = []);

  // remove whatever topic we find
  assignmentInfo.topicIds = assignmentInfo.topicIds.filter((topicPath) => topicPath.at(-1) !== topicId);
  assignmentInfo.excludedQuestions = assignmentInfo.excludedQuestions.filter((excludedQuestion) => excludedQuestion.topicPath.includes(topicId));
}

/**
 * adds an entire topic into the assignment
 *
 * the first id is the actual topic id
 */
function addTopic(topicPath: number[]) {
  const oldTopics = assignmentInfo.topicIds.map((oldTopic) => oldTopic.join(","));
  const newTopic = topicPath.join(",");

  if (oldTopics.includes(newTopic)) {
    // is that exact topic there already
    removeTopic(topicPath.at(-1) ?? 1);
  } else {
    // it's not there. just add it
    // if we are adding an oldTopic's child, nuke the child :D
    assignmentInfo.topicIds = assignmentInfo.topicIds.filter((oldTopic) => !oldTopic.join(",").startsWith(newTopic));
    // add after we filter so we don't nuke the child
    assignmentInfo.topicIds.push(topicPath);
  }
}

function toggleCourse(courseID: number, event: Event) {
  if (!event.target) return;

  const index = courseIDs.indexOf(courseID);
  if ((event.target as HTMLInputElement).checked) courseIDs.push(courseID);
  else courseIDs.splice(index, 1);
}

function toggleExclusion(targetQuestion: ExcludeAssignmentQuestion) {
  const index = assignmentInfo.excludedQuestions.map((question) => question.questionId).indexOf(targetQuestion.questionId);

  // it's in there. remove it
  if (index !== -1) return void assignmentInfo.excludedQuestions.splice(index, 1);

  // it'sn't in there, de-remove it
  assignmentInfo.excludedQuestions.push(targetQuestion);
  // if the question question is in the assignment, no it isn't
  removeQuestion(targetQuestion.questionId);
}

/** remove images and combine all tags into 1 \<p> */
function flattenQuestion(questionContent: string) {
  return questionContent
    .replace(/<img\b[^>]*>/gi, "(image)")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
      courseIDs,
      assignmentInfo.questions.filter((question) => question.isGuaranteed).map((question) => question.questionId),
      assignmentInfo.questions.filter((question) => !question.isGuaranteed).map((question) => question.questionId),
      assignmentInfo.topicIds.map((arr) => arr.at(-1) ?? 1),
      assignmentInfo.excludedQuestions.map((question) => question.questionId),
      `${new Date(new Date(assignmentInfo.dueDate.date).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })).toISOString().slice(0, 10)}T${assignmentInfo.dueDate.time}`,
      assignmentInfo.questions.length,
      assignmentInfo.lateSubmissions,
      assignmentInfo.timeAllotted ?? 0,
      assignmentInfo.attemptsAllowed ?? 0
    )
  );
  if (initialCourse) await router.push(`/teacher/course/${initialCourse}`);

  createAssignmentResult.isLoading = false;

  if (error) {
    createAssignmentResult.error = error.message;
    console.error(error);
  }
}
</script>

<style scoped></style>
