<template>
  <div class="flex grow flex-col items-start justify-start gap-6">
    <!-- if user is making assignments at 3am, prank em -->
    <!-- v-if="new Date().getHours() === 3" -->
    <div class="flex flex-col gap-2">
      {{ currentTopicPath }}
      {{ currentTopic }}
      {{ props.currentTopicIds }}
      <span>exact: {{ exactTopicIsInAssignment }}</span>
      <span>topic: {{ topicIsInAssignment }}</span>
    </div>
    <div class="flex w-full items-center justify-start gap-2 px-10 py-2">
      <!-- back button -->
      <button
        class="group mx-4 my-4 flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-5 py-2 text-xl hover:bg-neutral-100/50 dark:bg-neutral-900 dark:hover:border-neutral-300/50 dark:hover:bg-neutral-900"
        :class="{ 'pointer-events-none bg-neutral-300': !currentTopicPath.length }"
        type="button"
        :disabled="!currentTopicPath.length"
        @click="goBack"
      >
        <img class="size-5 group-hover:-translate-x-1 dark:invert" src="/ui/arrowLeft.svg" aria-hidden="true" />
        Back
      </button>

      <button
        class="rounded-lg border border-neutral-300 p-6 px-4 pb-0.5 pt-1 text-xl font-medium hover:bg-neutral-100/50 dark:border-neutral-600 dark:bg-neutral-600/50 dark:hover:border-neutral-300/50 dark:hover:bg-neutral-900"
        type="button"
        @click="currentTopic = undefined"
      >
        ALL TOPICS
      </button>
      <img v-show="currentTopicPath.length" class="size-5" src="/ui/doubleChevronRight.svg" aria-hidden="true" />

      <div v-for="(topic, index) in currentTopicPath" class="flex items-center justify-center gap-2">
        <button
          class="rounded-lg border border-neutral-300 p-6 px-4 pb-0.5 pt-1 text-xl font-medium hover:bg-neutral-100/50 dark:border-neutral-600 dark:bg-neutral-600/50 dark:hover:border-neutral-300/50 dark:hover:bg-neutral-900"
          type="button"
          @click="currentTopic = loadedTopics[topic]"
          v-html="loadedTopics[topic]?.name"
        ></button>
        <img v-if="index < currentTopicPath.length - 1" class="size-5" src="/ui/doubleChevronRight.svg" aria-hidden="true" />
      </div>
    </div>

    <div class="flex w-full flex-col items-center justify-center gap-10">
      <div v-if="!currentTopic || currentTopic.hasChildren" class="flex w-full flex-col items-start justify-center gap-4">
        <h3 class="px-5 text-2xl font-bold">Topics</h3>
        <div class="flex w-full flex-wrap items-center justify-start gap-4">
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
        <div ref="questions" class="sticky top-20 z-10 flex items-center justify-center gap-8 rounded-full bg-body px-5 py-2" :class="{ 'shadow-lg': isSticky }">
          <h3 class="text-2xl font-bold">Questions</h3>
          <div class="flex items-center justify-center gap-4">
            <!-- boolean stuff is to stop people from adding the child of an already added topic -->
            <div
              class="du-tooltip"
              :class="{ 'du-tooltip-bottom': isSticky }"
              :data-tip="
                exactTopicIsInAssignment === topicIsInAssignment || (exactTopicIsInAssignment && !topicIsInAssignment)
                  ? `${exactTopicIsInAssignment ? 'Remove' : 'Add'} all questions of this topic ${exactTopicIsInAssignment ? 'from' : 'to'} the assignment`
                  : `You've already added a parent topic!`
              "
            >
              <TeacherAssignmentCatalogQuestionButton
                v-if="!viewOnly"
                :click-function="() => emit('selectTopic', [...currentTopicPath])"
                :img="`/ui/${exactTopicIsInAssignment ? 'minus' : 'plus'}.svg`"
                :text="`${exactTopicIsInAssignment ? 'Remove' : 'Add'} all questions`"
                :disable="!(exactTopicIsInAssignment === topicIsInAssignment || (exactTopicIsInAssignment && !topicIsInAssignment))"
              />
            </div>
            <TeacherAssignmentCatalogQuestionButton
              :click-function="() => (showQuestionAnswers = !showQuestionAnswers)"
              :img="`/ui/${showQuestionAnswers ? 'eyeHide' : 'eyeShow'}.svg`"
              :text="`${showQuestionAnswers ? 'Hide' : 'Show'} All Answers`"
            />
          </div>
        </div>

        <div class="w-full columns-2 gap-4 space-y-4">
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

        <div class="flex w-full flex-col items-center justify-center">
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
  toggleExclusion: [question: ExcludeAssignmentQuestion];
  selectTopic: [topicPath: number[]];
}>();

const userStore = useUserStore();
const { loadedTopics, loadedQuestions } = storeToRefs(userStore);

const initialTopics = ref<Topic[]>([]);
const displayedQuestions = ref<(number | TopicQuestionInterface)[]>([]);

const showQuestionAnswers = ref(false);

async function loadQuestions(topicId: number, offset?: number) {
  const { data, error } = await tryCatch(getQuestionsUnderTopic(topicId, offset));
  if (error) return console.error(error);

  const questions = data.questions;
  // eslint-disable-next-line no-use-before-define
  totalQuestions.value = data.count;

  if (loadedTopics.value[topicId]) loadedTopics.value[topicId].questionIds = Array.from(new Set([...loadedTopics.value[topicId].questionIds, ...questions.map((question) => question.id)]));
  for (const question of questions) if (!loadedQuestions.value[question.id]) loadedQuestions.value[question.id] = question;

  displayedQuestions.value = questions;

  return questions;
}

async function loadTopics(topicId: number) {
  const parent = loadedTopics.value[topicId];
  const parentIsLoaded = parent !== undefined;
  if (parentIsLoaded && parent.hasChildren && parent.children?.length) return;

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

/**
 * an array of topic ids, the last element is the actual topic id
 *
 * the root topic is [1]
 */
const currentTopicPath = ref<number[]>([]); // topic id array
const currentTopic = ref<TopicMapped>();

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

/** is this question in the assignment or any topic added to it */
function questionIsInAssignment(questionId: number) {
  // root includes everything
  if (props.currentTopicIds[0]?.length === 0) return true;

  return props.currentTopicIds.some((oldTopic) => {
    const thing = oldTopic.at(-1);
    return thing && loadedTopics.value[thing].questionIds.includes(questionId);
  });
}

const currentQuestionPageIndex = ref(0);
const totalQuestions = ref(0);
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
  emit("toggleExclusion", { questionId, topicPath: currentTopicPath.value });
}

onMounted(() => window.addEventListener("scroll", detectSticky));
onBeforeUnmount(() => window.removeEventListener("scroll", detectSticky));
</script>

<style scoped></style>
