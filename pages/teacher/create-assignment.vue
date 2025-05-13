<template>
  <!-- evil margins and paddings are because layouts have innate p-4 and this page has WACKY scroll shenanigans... -->
  <div class="-m-4 flex w-auto flex-col px-4 lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] lg:flex-row lg:overflow-y-hidden">
    <form class="flex h-full max-h-full w-full shrink-0 flex-col gap-2 p-4 lg:w-[35rem] lg:overflow-y-clip" @submit.prevent="handleSubmit">
      <h1 v-if="!isPrinting" class="text-2xl font-bold">Create Assignment</h1>
      <h1 v-else class="text-2xl font-bold">Print Worksheet</h1>

      <fieldset v-if="!isPrinting">
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
        <div v-if="!isPrinting" class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="name">Name <span title="Required" class="text-red-500">*</span></label>
          <input
            id="name"
            v-model="assignmentInfo.name"
            required
            type="text"
            class="du-input w-full border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            placeholder="Unit 3 Review"
          />
        </div>
        <div class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="number-of-questions">
            Number of Questions
            <span title="Required" class="text-red-500">*</span>
          </label>
          <div class="w-full" :class="{ 'du-tooltip': warn }" :data-tip="warn">
            <input
              id="number-of-questions"
              v-model="assignmentInfo.numOfQuestions"
              required
              type="number"
              class="du-input w-full border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
              :class="{ 'border-red-500 hover:border-red-500 focus:border-red-500 dark:border-red-600 dark:hover:border-red-500': warn }"
              placeholder="10"
              min="0"
            />
          </div>
        </div>
      </div>

      <fieldset v-if="!isPrinting">
        <legend class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white">
          Due
          <span title="Required" class="text-red-500">*</span>
        </legend>
        <div class="flex w-full items-center justify-center gap-3">
          <input
            v-model="assignmentInfo.dueDate.date"
            required
            type="date"
            class="du-input w-full border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            :min="currentDateISO"
          />
          <input
            v-model="assignmentInfo.dueDate.time"
            required
            type="time"
            class="du-input w-full border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
          />
        </div>
      </fieldset>

      <div v-if="!isPrinting" class="flex w-full items-center justify-center gap-3">
        <div class="grow">
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="time-per-question">Time limit (minutes)</label>
          <input
            id="time-per-question"
            v-model.number="assignmentInfo.timeAllotted"
            type="number"
            class="du-input w-full border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            placeholder="Unlimited"
            min="0"
          />
        </div>

        <div class="grow">
          <!-- disable if the assignment is static -->
          <!-- TODO: might want to explain why it's disabled... -->
          <label class="fo-label fo-label-text shrink-0 font-bold text-black dark:text-white" for="attempts-per-question">Attempts per question</label>
          <input
            id="attempts-per-question"
            v-model.number="assignmentInfo.attemptsAllowed"
            type="number"
            class="du-input w-full border-neutral-400 text-black hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-300 dark:hover:border-neutral-300/50"
            :placeholder="guaranteedLength === assignmentInfo.numOfQuestions ? `1` : `Unlimited`"
            :disabled="guaranteedLength === assignmentInfo.numOfQuestions"
            min="0"
            step="1"
          />
        </div>
      </div>

      <div class="mb-2 flex w-full grow flex-col">
        <p class="fo-label fo-label-text pointer-events-none flex-none shrink-0 font-bold text-black dark:text-white">Questions and Topics <span title="Required" class="text-red-500">*</span></p>
        <div
          class="flex h-0 max-h-full min-h-60 w-full grow items-center justify-center rounded-lg border border-neutral-400 bg-white hover:border-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-300/50"
        >
          <!-- mb is to account for the innate large (fake) mt of the image -->
          <div v-if="!assignmentInfo.topicPaths.length && !assignmentInfo.questions.length" class="mb-6 flex h-fit flex-col items-center justify-center">
            <img class="pointer-events-none size-40 select-none opacity-65 dark:invert" src="/ui/plus.svg" aria-hidden="true" />
            <p class="text-center text-xl font-bold text-neutral-500 dark:text-white">No Questions or Topics Selected</p>
            <p class="w-3/4 text-center text-sm font-medium text-neutral-400">Select questions and topics from the question bank to add them to this assignment!</p>
          </div>

          <div v-else class="flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-scroll pl-4 pr-2 pt-4">
            <h2 v-if="assignmentInfo.topicPaths.length && (assignmentInfo.questions.length || assignmentInfo.excludedQuestions.length)" class="text-2xl font-bold">Topics</h2>
            <ol v-if="assignmentInfo.topicPaths.length" class="flex w-full flex-col items-start justify-start gap-2">
              <li v-for="(topicId, index) in assignmentInfo.topicPaths" :key="topicId.at(-1)" class="flex w-full items-center justify-start gap-3">
                <span>{{ index + 1 }}. </span>

                <p class="w-60 grow overflow-hidden overflow-ellipsis text-nowrap" v-html="loadedTopics[topicId.at(-1)!]?.name ?? 'All topics'"></p>

                <TeacherAssignmentCatalogQuestionButton :click-function="() => removeTopic(topicId.at(-1) ?? 1)" img="/ui/trash.svg" />
              </li>
            </ol>

            <h2 v-if="assignmentInfo.topicPaths.length && assignmentInfo.questions.length" class="text-2xl font-bold">Questions</h2>
            <ol v-if="assignmentInfo.questions.length" class="flex w-full flex-col items-start justify-start gap-2">
              <li v-for="(question, index) in assignmentInfo.questions" :key="question.questionId" class="flex w-full items-center justify-start gap-3">
                <span>{{ index + 1 }}.</span>

                <p class="w-60 grow overflow-hidden overflow-ellipsis text-nowrap" v-html="flattenQuestion(loadedQuestions[question.questionId].text)"></p>

                <div class="flex items-center justify-center gap-2">
                  <div
                    v-if="!assignmentInfo.topicPaths.map((topicPath) => topicPath.at(-1)).includes(loadedQuestions[question.questionId].subtopic)"
                    class="du-tooltip du-tooltip-bottom"
                    :data-tip="`Switch to ${question.isGuaranteed ? 'Random' : 'Guaranteed'}`"
                  >
                    <TeacherAssignmentCatalogQuestionButton :click-function="() => (question.isGuaranteed = !question.isGuaranteed)" :img="`/ui/${question.isGuaranteed ? 'check' : 'dice'}.svg`" />
                  </div>
                  <div v-else class="du-tooltip du-tooltip-left" data-tip="This question is guaranteed because you added a parent topic.">
                    <TeacherAssignmentCatalogQuestionButton :disable="true" img="/ui/check.svg" />
                  </div>
                  <TeacherAssignmentCatalogQuestionButton :click-function="() => removeQuestion(question.questionId)" img="/ui/trash.svg" />
                </div>
              </li>
            </ol>

            <h2 v-if="assignmentInfo.excludedQuestions.length" class="text-2xl font-bold">Excluded Questions</h2>
            <ul v-if="assignmentInfo.excludedQuestions.length" class="flex w-full flex-col items-start justify-start gap-2">
              <li v-for="questionId in assignmentInfo.excludedQuestions" :key="questionId" class="flex w-full items-center justify-start gap-3">
                <span>•</span>
                <p class="w-60 grow overflow-hidden overflow-ellipsis text-nowrap" v-html="flattenQuestion(loadedQuestions[questionId].text)"></p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-2 lg:px-10" :class="isPrinting ? 'justify-end' : 'justify-between'">
        <div v-if="!isPrinting" class="flex items-center gap-1">
          <input id="late-submissions" v-model="assignmentInfo.lateSubmissions" type="checkbox" class="du-checkbox border-neutral-400 dark:bg-neutral-900" />
          <label class="fo-label fo-label-text shrink-0 translate-y-0.5 text-base text-black dark:text-white" for="late-submissions">Allow late submissions</label>
        </div>

        <div :data-tip="!assignmentInfo.name ? 'Assignment must have a name' : 'You must have at least one question or topic'" :class="{ 'du-tooltip': !allowedToSubmit }">
          <button
            class="w-full grow rounded-lg border px-8 py-1.5 text-xl font-medium text-black lg:w-fit"
            :class="
              allowedToSubmit
                ? 'border-green-500 bg-green-500 hover:brightness-110'
                : 'cursor-not-allowed border-none border-neutral-300 bg-neutral-200 p-0 transition duration-300 hover:border-neutral-400 dark:bg-neutral-600/50'
            "
            type="submit"
          >
            <span v-if="createAssignmentResult.isLoading" class="loading du-loading du-loading-sm mt-1"></span>
            <span v-else-if="!isPrinting">Create</span>
            <span v-else>Print</span>
          </button>
        </div>
      </div>
    </form>

    <!-- horizontal separator for mobile, desktop uses a border on the catalog container -->
    <div class="my-4 w-full border border-neutral-600/50 lg:hidden dark:border-neutral-300/50"></div>

    <div class="flex w-full flex-col border-neutral-600/50 px-4 lg:-mr-4 lg:max-h-full lg:overflow-y-auto lg:border-l dark:border-neutral-300/50">
      <div class="pb-4">
        <TeacherAssignmentQuestionCatalog
          :view-only="false"
          :current-questions="assignmentInfo.questions"
          :current-topic-ids="assignmentInfo.topicPaths"
          :excluded-question-ids="assignmentInfo.excludedQuestions"
          @select-question="addQuestion"
          @select-topic="addTopic"
          @toggle-exclusion="toggleExclusion"
        />
      </div>
    </div>

    <LazyTeacherAssignmentPrintAssignment :question-ids="assignmentInfo.printQuestionIds" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher"
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { showSideMenu, loadedTopics, loadedTopicPaths, loadedQuestions, totalQuestionCount, teacherCourses } = storeToRefs(userStore);

const currentDateISO = (() => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();

  return `${year}-${month}-${day}`;
})();
let initialCourse = Number(route.query.course);
const courseIds = reactive<number[]>([]);
if (initialCourse) courseIds.push(initialCourse);

const isPrinting = ref(false);
watch(
  () => route.query,
  () => {
    isPrinting.value = route.query.print === "true";

    if (!route.query.course) {
      courseIds.length = 0;
      initialCourse = NaN;
    }
  },
  { immediate: true }
);

const assignmentInfo = reactive({
  name: "",
  dueDate: {
    date: currentDateISO,
    time: "23:59"
  },
  questions: ref<CreateAssignmentQuestion[]>([]),
  printQuestionIds: ref<number[]>([]),
  excludedQuestions: ref<number[]>([]),
  topicPaths: ref<number[][]>([]),
  numOfQuestions: ref<number>(),
  lateSubmissions: false,
  /** In minutes */
  timeAllotted: ref<number>(),
  attemptsAllowed: ref<number>()
});

const guaranteedLength = computed(() => assignmentInfo.questions.filter((question) => question.isGuaranteed).length);
/** how many random questions, topic or manual, there are to choose from */
const randomLength = computed(() => {
  // if root, congratulations you get everything (minus manual/excluded questions)
  if (assignmentInfo.topicPaths[0] && assignmentInfo.topicPaths[0].length === 0) return totalQuestionCount.value - (guaranteedLength.value + assignmentInfo.excludedQuestions.length);

  let count = 0;

  // add manual random questions
  count += assignmentInfo.questions.length - guaranteedLength.value;

  // add from topics
  assignmentInfo.topicPaths.forEach((topicPath) => {
    const topicId = topicPath.at(-1);
    if (!topicId) return;
    const topic = loadedTopics.value[topicId];
    count += topic.numQuestions;
    // un-double count any manual questions inside an added topic
    count -= assignmentInfo.questions.filter((question) => topic.questionIds.includes(question.questionId)).length;
  });
  // and then blow up excluded questions
  count -= assignmentInfo.excludedQuestions.length;
  return count;
});

const warn = computed(() => {
  const numOfQuestions = assignmentInfo.numOfQuestions ?? 0;

  // num of questions is too high
  if (numOfQuestions > guaranteedLength.value + randomLength.value)
    return `The assignment should have ${assignmentInfo.numOfQuestions} total question(s), but we only have ${guaranteedLength.value + randomLength.value} to choose from. Try adding more questions!`;

  // too low
  if (numOfQuestions < guaranteedLength.value)
    return `The assignment should only have ${assignmentInfo.numOfQuestions} total question(s), but you've added ${guaranteedLength.value} guaranteed question(s). We can't fit that many in...`;

  // not just right
  if (numOfQuestions === guaranteedLength.value && randomLength.value > 0)
    return `You've added ${randomLength.value} random question(s), but they'll never be used because the assignment is already full of guaranteed questions.`;

  return null;
});

const allowedToSubmit = computed(() => (isPrinting || (assignmentInfo.name && !warn.value)) && guaranteedLength.value + randomLength.value > 0);

function removeQuestion(questionId: number) {
  // prettier-ignore
  assignmentInfo.questions.splice(assignmentInfo.questions.findIndex((question) => question.questionId === questionId), 1);
}

/** adds a question if not present, removes it if it is */
function addQuestion(questionId: number) {
  if (!assignmentInfo.questions.find((question) => question.questionId === questionId)) {
    assignmentInfo.questions.push({ questionId, isGuaranteed: true });
    // increment num questions if it wasn't enough to fit all guaranteed questions
    if (guaranteedLength.value > (assignmentInfo.numOfQuestions ?? 0)) assignmentInfo.numOfQuestions = guaranteedLength.value;
  } else removeQuestion(questionId);
}

function removeTopic(topicId: number) {
  // handle root
  if (topicId === 1) return void (assignmentInfo.topicPaths = assignmentInfo.excludedQuestions = []);

  // remove whatever topic we find
  assignmentInfo.topicPaths = assignmentInfo.topicPaths.filter((topicPath) => topicPath.at(-1) !== topicId);
  assignmentInfo.excludedQuestions = assignmentInfo.excludedQuestions.filter((excludedQuestion) => loadedTopicPaths.value[excludedQuestion].includes(topicId));
}

/**
 * adds an entire topic into the assignment
 *
 * the LAST id is the actual topic id
 */
async function addTopic(topicPath: number[]) {
  const oldTopics = assignmentInfo.topicPaths.map((oldTopic) => oldTopic.join(","));
  const newTopic = topicPath.join(",");

  if (oldTopics.includes(newTopic)) {
    // is that exact topic there already
    removeTopic(topicPath.at(-1) ?? 1);
  } else {
    // it's not there. just add it
    // if we are adding an oldTopic's child, nuke the child :D
    assignmentInfo.topicPaths = assignmentInfo.topicPaths.filter((oldTopic) => !oldTopic.join(",").startsWith(newTopic));
    // add after we filter so we don't nuke the child
    assignmentInfo.topicPaths.push(topicPath);

    // fill out topic ancestor paths
    const filteredPath = topicPath.filter((topicId) => !loadedTopicPaths.value[topicId]);
    const { data: paths, error } = await tryCatch(getTopicAncestorPaths(filteredPath));
    if (error) return console.error(error);
    filteredPath.forEach((topicId, index) => (loadedTopicPaths.value[topicId] = paths[index]));

    const topicIds = assignmentInfo.topicPaths.map((topicPath) => topicPath.at(-1));
    // set all questions already in that assignment to guaranteed
    for (const question of assignmentInfo.questions) {
      if (topicIds.includes(loadedQuestions.value[question.questionId].subtopic)) question.isGuaranteed = true;
    }
  }
}

function toggleCourse(courseID: number, event: Event) {
  if (!event.target) return;

  const index = courseIds.indexOf(courseID);
  if ((event.target as HTMLInputElement).checked) courseIds.push(courseID);
  else courseIds.splice(index, 1);
}

function toggleExclusion(targetQuestionId: number) {
  const index = assignmentInfo.excludedQuestions.indexOf(targetQuestionId);

  // it's already excluded; remove it
  if (index !== -1) return void assignmentInfo.excludedQuestions.splice(index, 1);

  // it's not excluded; exclude it
  assignmentInfo.excludedQuestions.push(targetQuestionId);
  // if the question question is in the assignment, no it isn't
  if (assignmentInfo.questions.map((question) => question.questionId).includes(targetQuestionId)) removeQuestion(targetQuestionId);
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

async function generateQuestions() {
  if (!assignmentInfo.numOfQuestions) return alert("no num questions set. get out");

  // start with guaranteed questions
  const questionIds: number[] = [...assignmentInfo.questions.filter((question) => question.isGuaranteed).map((question) => question.questionId)];

  // add random questions
  const possibleQuestions = assignmentInfo.questions.filter((question) => !question.isGuaranteed).map((question) => question.questionId);
  while (questionIds.length < assignmentInfo.numOfQuestions && possibleQuestions.length > 0) {
    const index = Math.floor(Math.random() * possibleQuestions.length);
    questionIds.push(possibleQuestions.splice(index, 1)[0]);
  }

  // add questions from topics
  const numOfQuestions = assignmentInfo.numOfQuestions - questionIds.length;
  if (numOfQuestions === 0) return (assignmentInfo.printQuestionIds = questionIds);
  const topicIds = assignmentInfo.topicPaths.map((topicPath) => topicPath.at(-1) ?? 1);
  const questionsToExclude = assignmentInfo.excludedQuestions;
  const { data: randomQuestionsFromTopic, error } = await tryRequestEndpoint<TopicQuestionInterface[]>(
    `questions/teacher/random-topics-questions/${numOfQuestions}/${topicIds.join(";")}/${questionsToExclude.length ? questionsToExclude.join(";") : 0}`
  );
  if (error) return console.error(error);

  assignmentInfo.printQuestionIds = questionIds.concat(
    randomQuestionsFromTopic.map((question) => {
      // add to loaded if not already there
      loadedQuestions.value[question.id] ??= question;

      return question.id;
    })
  );
}

async function createAssignment() {
  if (!allowedToSubmit.value) return;

  createAssignmentResult.isLoading = true;

  const guaranteed = assignmentInfo.questions.filter((question) => question.isGuaranteed).map((question) => question.questionId);
  const random = assignmentInfo.questions.filter((question) => !question.isGuaranteed).map((question) => question.questionId);

  // no point to randomizing, just make it static
  if (guaranteedLength.value + randomLength.value === assignmentInfo.numOfQuestions) {
    guaranteed.concat(random);
    random.length = 0;
  }

  const [year, month, day] = assignmentInfo.dueDate.date.split("-").map(Number);
  const [hours, minutes] = assignmentInfo.dueDate.time.split(":").map(Number);
  const time = new Date(year, month - 1, day, hours, minutes); // creates a date object in local timezone (converted to utc timestamp later)

  const { error } = await tryCatch(
    submitCreateAssignment(
      assignmentInfo.name,
      courseIds,
      guaranteed,
      random,
      assignmentInfo.topicPaths.map((arr) => arr.at(-1) ?? 1),
      assignmentInfo.excludedQuestions,
      time.getTime() / 1000,
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
  } else {
    createAssignmentResult.success = "Assignment created — you can leave this page now.";
    if (!initialCourse) alert(createAssignmentResult.success);
  }
  // TODO: make this a toast or something.........
}

async function handleSubmit() {
  if (!isPrinting) return await createAssignment();
  await generateQuestions();
  window.print();
}
</script>

<style scoped></style>
