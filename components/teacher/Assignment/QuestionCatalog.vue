<template>
  <div class="flex h-full w-full flex-col items-start justify-start gap-6">
    <!-- if user is making assignments at 3am, prank em -->
    <!-- v-if="new Date().getHours() === 3" -->
    <!-- <div class="flex flex-col gap-2">
      {{ currentTopicPath }}
      {{ currentTopic }}
      {{ props.currentTopicIds }}
      <span>exact: {{ exactTopicIsInAssignment }}</span>
      <span>topic: {{ topicIsInAssignment }}</span>
    </div> -->
    <div class="flex w-full flex-col items-baseline justify-start gap-2 px-6 sm:flex-row sm:items-center sm:px-10 lg:py-2">
      <!-- back button -->
      <button
        class="group mx-4 my-2 flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-5 py-2 text-xl hover:bg-neutral-100/50 dark:bg-neutral-900 dark:hover:border-neutral-300/50 dark:hover:bg-neutral-900"
        :class="{ 'pointer-events-none bg-neutral-300': !currentTopicPath.length }"
        type="button"
        :disabled="!currentTopicPath.length"
        @click="goBack"
      >
        <img class="size-5 group-hover:-translate-x-1 dark:invert" src="/ui/arrowLeft.svg" aria-hidden="true" />
        Back
      </button>

      <div class="du-breadcrumbs !overflow-visible py-0">
        <ul class="flex flex-col flex-wrap !items-baseline !overflow-visible sm:flex-row sm:!items-center">
          <li class="my-2 w-fit">
            <button
              class="rounded-lg border border-neutral-300 px-4 py-2 text-xl font-medium hover:bg-neutral-100/50 dark:border-neutral-600 dark:bg-neutral-600/50 dark:hover:border-neutral-300/50 dark:hover:bg-neutral-900"
              type="button"
              @click="currentTopic = undefined"
            >
              ALL TOPICS
            </button>
          </li>

          <li v-for="topic in currentTopicPath" class="my-2 flex w-fit items-center justify-center text-wrap">
            <button
              class="rounded-lg border border-neutral-300 px-4 py-2 text-xl font-medium hover:bg-neutral-100/50 dark:border-neutral-600 dark:bg-neutral-600/50 dark:hover:border-neutral-300/50 dark:hover:bg-neutral-900"
              type="button"
              @click="currentTopic = loadedTopics[topic]"
              v-html="loadedTopics[topic]?.name"
            ></button>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex w-full flex-col items-center justify-center gap-10">
      <div v-if="!currentTopic || currentTopic.hasChildren" class="flex w-full flex-col items-start justify-center gap-4">
        <h3 class="px-5 text-2xl font-bold">Topics</h3>
        <div class="flex w-full flex-col flex-wrap items-center justify-start space-y-4">
          <TeacherAssignmentCatalogTopic
            v-for="topic in currentTopic ? currentTopic.children?.sort((a, b) => a - b) : initialTopics"
            :key="typeof topic === 'number' ? topic : topic.id"
            :loaded-topics="loadedTopics"
            :topic="topic"
            @select="(topic) => (currentTopic = loadedTopics[typeof topic === 'number' ? topic : topic.id])"
          />
        </div>
      </div>

      <div class="flex w-full flex-col items-start justify-center gap-4">
        <div ref="questions" class="sticky top-20 z-10 flex items-center justify-center gap-8 rounded-full bg-body px-5 py-2 lg:top-4" :class="{ 'shadow-lg': isSticky }">
          <h3 class="text-2xl font-bold">Questions</h3>
          <div class="flex items-center justify-center gap-4">
            <!-- boolean stuff is to stop people from adding the child of an already added topic -->
            <TeacherAssignmentCatalogQuestionButton
              v-if="!viewOnly"
              :click-function="() => emit('selectTopic', [...currentTopicPath])"
              :img="`/ui/${exactTopicIsInAssignment ? 'minus' : 'plus'}.svg`"
              :text="
                exactTopicIsInAssignment === topicIsInAssignment || (exactTopicIsInAssignment && !topicIsInAssignment)
                  ? `${exactTopicIsInAssignment ? 'Remove' : 'Add'} all questions of this topic ${exactTopicIsInAssignment ? 'from' : 'to'} the assignment`
                  : `You've already added a parent topic!`
              "
              :disable="!(exactTopicIsInAssignment === topicIsInAssignment || (exactTopicIsInAssignment && !topicIsInAssignment))"
            />
            <TeacherAssignmentCatalogQuestionButton
              :click-function="() => (showQuestionAnswers = !showQuestionAnswers)"
              :img="`/ui/${showQuestionAnswers ? 'eyeHide' : 'eyeShow'}.svg`"
              :text="`${showQuestionAnswers ? 'Hide' : 'Show'} All Answers`"
            />
          </div>
        </div>

        <div class="w-full space-y-4 lg:columns-2">
          <LazyTeacherAssignmentCatalogQuestion
            v-for="question in displayedQuestions"
            :key="typeof question === 'number' ? question : question.id"
            :view-only="viewOnly"
            :question="typeof question === 'number' ? loadedQuestions[question] : question"
            :show-answer-override="showQuestionAnswers"
            :current-questions="currentQuestions"
            :is-in-assignment="questionIsInAssignment(typeof question === 'number' ? question : question.id)"
            :is-excluded="props.excludedQuestionIds.includes(typeof question === 'number' ? question : question.id)"
            @select="emit('selectQuestion', typeof question === 'number' ? question : question.id)"
            @toggle-question-exclusion="toggleQuestionExclusion"
          />
        </div>

        <div v-if="totalQuestions > 0" class="mx-auto flex w-full flex-col items-center justify-center">
          <p>
            Showing <strong class="text-lg font-semibold">{{ currentQuestionPageIndex * 20 + 1 }}</strong> -
            <strong class="text-lg font-semibold">{{ Math.min(currentQuestionPageIndex * 20 + 20, totalQuestions) }}</strong> of
            {{ totalQuestions }}
          </p>
          <div class="flex items-center justify-center gap-3">
            <TeacherAssignmentCatalogPageNavigationButton :disable="currentQuestionPageIndex === 0" :click-function="() => (currentQuestionPageIndex = 0)" img="/ui/doubleChevronLeft.svg" />
            <TeacherAssignmentCatalogPageNavigationButton :disable="currentQuestionPageIndex === 0" :click-function="() => currentQuestionPageIndex--" img="/ui/chevronLeft.svg" />
            <TeacherAssignmentCatalogPageNavigationButton
              :disable="currentQuestionPageIndex === Math.floor(totalQuestions / 20)"
              :click-function="() => currentQuestionPageIndex++"
              img="/ui/chevronRight.svg"
            />
            <TeacherAssignmentCatalogPageNavigationButton
              :disable="currentQuestionPageIndex === Math.floor(totalQuestions / 20)"
              :click-function="() => (currentQuestionPageIndex = Math.floor(totalQuestions / 20))"
              img="/ui/doubleChevronRight.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  viewOnly: boolean;
  currentQuestions: CreateAssignmentQuestion[];
  excludedQuestionIds: number[];
  /** list of topic paths already added to the assignment */
  currentTopicIds: number[][];
}>();
const emit = defineEmits<{
  selectQuestion: [questionId: number];
  toggleExclusion: [questionId: number];
  selectTopic: [topicPath: number[]];
}>();

const userStore = useUserStore();
const { loadedTopics, loadedTopicPaths, loadedQuestions, totalQuestionCount } = storeToRefs(userStore);

/**
 * an array of topic ids, the last element is the actual topic id
 *
 * the root topic is [1]
 */
const currentTopicPath = ref<number[]>([]); // topic id array

const initialTopics = ref<Topic[]>([]);
const displayedQuestions = ref<(number | TopicQuestionInterface)[]>([]);

const showQuestionAnswers = ref(false);

const currentTopic = ref<TopicMapped>();

const currentQuestionPageIndex = ref(0);
const totalQuestions = ref(0);

async function loadQuestions(topicId: number, offset?: number) {
  const { data, error } = await tryCatch(getQuestionsUnderTopic(topicId, offset, !loadedTopics.value[topicId]?.numQuestions));
  if (error) return console.error(error);

  const questions = data.questions;

  if (data.count) {
    totalQuestions.value = data.count;
    // if root, store it separately (is not stored in loadedTopics)
    if (topicId === 1) totalQuestionCount.value = data.count;
  } else {
    totalQuestions.value = loadedTopics.value[topicId].numQuestions;
  }

  // add question ids, but no duplicates
  if (loadedTopics.value[topicId]) loadedTopics.value[topicId].questionIds = Array.from(new Set([...loadedTopics.value[topicId].questionIds, ...questions.map((question) => question.id)]));

  // start loading topic paths
  const subtopicSet = new Set<number>([]);

  questions.forEach((question) => {
    // add to loaded questions
    if (!loadedQuestions.value[question.id]) loadedQuestions.value[question.id] = question;

    subtopicSet.add(question.subtopic);
  });

  // continue adding topic paths
  const subtopics = Array.from(subtopicSet).filter((subtopicId) => !loadedTopicPaths.value[subtopicId]);

  const paths = await getTopicAncestorPaths(subtopics);
  subtopics.forEach((subtopicId, index) => (loadedTopicPaths.value[subtopicId] = paths[index]));

  displayedQuestions.value = questions;

  return questions;
}

async function loadTopics(topicId: number) {
  const parent = loadedTopics.value[topicId];
  const parentIsLoaded = parent !== undefined;
  // if loaded, expect it to either have children and loaded children, or no children and no children (What)
  if (parentIsLoaded && !!parent.hasChildren === !!parent.children?.length) return;

  const { data: topics, error } = await tryCatch(getTopics(topicId));
  if (error) return console.error(error);

  for (const topic of topics) {
    const loadedTopic = loadedTopics.value[topic.id];

    if (loadedTopic) return topics;

    const mappedTopic: TopicMapped = {
      ...topic,
      children: topic.hasChildren ? [] : null,
      parents: topic.hasParents ? [] : null,
      questionIds: []
    };
    loadedTopics.value[topic.id] = mappedTopic;
    if (parentIsLoaded) parent.children?.push(topic.id);
  }

  return topics;
}

/** is this exact topic id in the assignment */
const exactTopicIsInAssignment = computed(() => {
  const oldTopics = props.currentTopicIds.map((path) => path.at(-1) ?? 1);
  return oldTopics.includes(currentTopic.value?.id ?? 1);
});

/** is this topic, or any of its parents in the assignment */
const topicIsInAssignment = computed(() => {
  const oldTopics = props.currentTopicIds.map((oldTopic) => oldTopic.join(","));
  return oldTopics.some((oldTopic) => currentTopicPath.value.join(",").startsWith(oldTopic));
});

/**
 * is this question in the assignment or any topic added to it
 *
 * used to determine if exclude button should be shown
 */
function questionIsInAssignment(questionId: number) {
  // root includes everything
  if (props.currentTopicIds[0]?.length === 0) return true;

  const questionTopicPath = loadedTopicPaths.value[loadedQuestions.value[questionId].subtopic].join(";");

  return props.currentTopicIds.some((oldTopic) => {
    const oldTopicId = oldTopic.at(-1);
    if (!oldTopicId) return;
    if (!loadedTopicPaths.value[oldTopicId]) return; // sometimes it explodes. that's bad!
    return questionTopicPath.startsWith(loadedTopicPaths.value[oldTopicId].join(";"));
  });
}

watch(currentTopic, async (topic) => {
  if (!topic) currentTopicPath.value = [];
  else {
    if (currentTopicPath.value.includes(topic.id)) currentTopicPath.value = currentTopicPath.value.slice(0, currentTopicPath.value.indexOf(topic.id));
    topic.hasParents = true;
    topic.parents = currentTopicPath.value;

    currentTopicPath.value.push(topic.id);
    currentQuestionPageIndex.value = 0;
    await loadTopics(topic.id);
  }

  await loadQuestions(topic?.id ?? 1);
});
watch(currentQuestionPageIndex, async (index) => {
  await loadQuestions(currentTopic.value?.id ?? 1, index * 20);
});

function goBack() {
  currentTopic.value = loadedTopics.value[currentTopicPath.value[currentTopicPath.value.length - 2]];
  currentTopicPath.value = currentTopicPath.value.slice(0, currentTopicPath.value.length - 1);
}

onMounted(async () => {
  const topics = await loadTopics(1);
  await loadQuestions(1);
  if (topics) initialTopics.value = topics;
});

const questionsHeader = useTemplateRef("questions");
const isSticky = ref(false);
let previousPosition = 0;
function detectSticky() {
  if (!questionsHeader.value) return;
  const newPosition = questionsHeader.value.getBoundingClientRect().top;

  if (newPosition === previousPosition) return (isSticky.value = true);

  previousPosition = newPosition;
  isSticky.value = false;
}

function toggleQuestionExclusion(questionId: number) {
  emit("toggleExclusion", questionId);
}

onMounted(() => window.addEventListener("scroll", detectSticky));
onBeforeUnmount(() => window.removeEventListener("scroll", detectSticky));
</script>

<style scoped></style>
