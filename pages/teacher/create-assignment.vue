<template>
  <div class="flex w-full items-start justify-center gap-8">
    <form
      class="sticky top-20 flex w-[35rem] shrink-0 flex-col gap-2 rounded-xl border border-neutral-400 bg-neutral-100/50 p-6 dark:border-neutral-600 dark:bg-neutral-600/50"
      @submit.prevent="createAssignment"
    >
      <h3 class="text-2xl font-bold">Create Assignment</h3>

      <fieldset>
        <legend>For <span title="Required" class="font-2xl text-red-500">*</span></legend>
        <div class="max-h-40 space-y-1 overflow-y-auto rounded-lg border border-neutral-400 bg-white p-3">
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
              >{{ course.name }}</label
            >
          </div>
        </div>
      </fieldset>

      <div class="flex w-full items-center justify-center gap-3">
        <div class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="name">Name <span title="Required" class="font-2xl text-red-500">*</span></label>
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
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="Number of Questions">
            Number of Questions
            <span title="Required" class="font-2xl text-red-500">*</span>
          </label>

          <!--   
          Was in input.
          @input="
              () => {
                if (assignmentInfo.numOfQuestions) {
                  if (assignmentInfo.numOfQuestions > assignmentInfo.questionIds.filter((question) => question.isGuaranteed).map((question) => question.questionId).length) {
                    assignmentInfo.numOfQuestions = assignmentInfo.questionIds.length;
                  } else {
                    if (assignmentInfo.numOfQuestions > assignmentInfo.questionIds.length) {
                      assignmentInfo.numOfQuestions = assignmentInfo.questionIds.length;
                    }
                  }
                }
              }
            " -->
          <input
            id="numOfQuestions"
            v-model="assignmentInfo.numOfQuestions"
            required
            type="number"
            class="fo-input border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            placeholder="10"
          />
        </div>
      </div>

      <div>
        <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white">Due <span title="Required" class="font-2xl text-red-500">*</span></label>
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
      </div>

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

      <div>
        <p class="dark:text-whit fo-label fo-label-text pointer-events-none shrink-0 font-bold text-black dark:text-white">
          Questions and Topics <span title="Required" class="font-2xl text-red-500">*</span>
        </p>
        <div
          class="flex h-96 w-full items-center justify-center rounded-lg border border-neutral-400 bg-white hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-300/50"
        >
          <div v-if="!assignmentInfo.topicIds.length && !assignmentInfo.questionIds.length" class="mb-10 flex flex-col items-center justify-center">
            <img class="size-40 opacity-65 dark:invert" src="/ui/plus.svg" aria-hidden="true" />
            <h5 class="text-center text-xl font-bold text-neutral-500 dark:text-white">No Questions or Topics Selected</h5>
            <p class="w-3/4 text-center text-sm font-medium text-neutral-400">Select questions and topics from the question bank to add them to this assignment!</p>
          </div>

          <div v-else class="flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-scroll py-2 pl-4">
            <ul v-if="assignmentInfo.topicIds.length" class="flex w-full flex-col items-start justify-start gap-2">
              <h5 v-if="assignmentInfo.topicIds.length && assignmentInfo.questionIds.length" class="text-2xl font-bold">Topics</h5>
              <li v-for="(topicId, index) in assignmentInfo.topicIds" :key="topicId[0]" class="flex w-full items-center justify-start gap-3">
                <span>{{ index + 1 }}.</span>

                <p class="w-60 grow overflow-hidden overflow-ellipsis text-nowrap" v-html="loadedTopics[topicId[0]]?.name ?? 'All topics'"></p>

                <TeacherAssignmentCatalogQuestionButton :click-function="() => removeTopic(topicId[0])" img="/ui/trash.svg" />
              </li>
            </ul>

            <ul v-if="assignmentInfo.questionIds.length" class="flex w-full flex-col items-start justify-start gap-2">
              <h5 v-if="assignmentInfo.topicIds.length && assignmentInfo.questionIds.length" class="text-2xl font-bold">Questions</h5>
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
      </div>

      <div class="mt-4 flex w-full items-center justify-between px-10">
        <div class="flex items-center gap-1">
          <input id="late-submissions" v-model="assignmentInfo.lateSubmissions" type="checkbox" class="du-checkbox border-neutral-400 dark:bg-neutral-900" />
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
            <span v-if="createAssignmentResult.isLoading" class="loading du-loading du-loading-sm mt-1"></span>
            <span v-else>Create</span>
          </button>
        </div>
      </div>
    </form>

    <TeacherAssignmentQuestionCatalog
      :view-only="false"
      :current-questions="assignmentInfo.questionIds"
      :current-topic-ids="assignmentInfo.topicIds"
      @select-question="addQuestion"
      @select-topic="addTopic"
    />
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
  const month = (now.getMonth() + 1).toLocaleString().padStart(2, "0");
  const day = now.getDate().toLocaleString().padStart(2, "0");
  const year = now.getFullYear().toLocaleString();

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
  questionIds: ref<CreateAssignmentQuestion[]>([]),
  topicIds: ref<number[][]>([]),
  numOfQuestions: ref<number>(),
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

function removeTopic(topicId: number) {
  assignmentInfo.topicIds.splice(assignmentInfo.topicIds.indexOf(Array(topicId)), 1);
}

function addTopic(topicId: number) {
  if (!assignmentInfo.topicIds.find((topic) => topic === Array(topicId))) assignmentInfo.topicIds.push(Array(topicId));
  else removeTopic(topicId);
}

function toggleCourse(courseID: number, event: Event) {
  if (!event.target) return;

  const index = courseIDs.indexOf(courseID);
  if ((event.target as HTMLInputElement).checked) courseIDs.push(courseID);
  else courseIDs.splice(index, 1);
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
      assignmentInfo.questionIds.filter((question) => question.isGuaranteed).map((question) => question.questionId),
      assignmentInfo.questionIds.filter((question) => !question.isGuaranteed).map((question) => question.questionId),
      `${new Date(new Date(assignmentInfo.dueDate.date).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })).toISOString().slice(0, 10)}T${assignmentInfo.dueDate.time}`,
      assignmentInfo.questionIds.length,
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
