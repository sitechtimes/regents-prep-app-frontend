<template>
  <div class="flex grow flex-col items-start justify-start gap-6">
    <div class="flex w-full items-center justify-start gap-2 px-10 py-2">
      <button class="mr-10 flex select-none items-center justify-center gap-2 rounded-lg bg-neutral-200 px-6 pb-1.5 pt-2 text-lg font-medium hover:bg-neutral-300" type="button" @click="goBack">
        <img class="size-5" src="/ui/arrowLeft.svg" aria-hidden="true" />
        <span>Back</span>
      </button>

      <button class="rounded-lg bg-neutral-200 px-6 pb-0.5 pt-1 text-lg font-medium hover:bg-neutral-300" type="button" @click="currentTopic = undefined">ALL TOPICS</button>
      <img v-show="currentTopicPath.length" class="size-5" src="/ui/doubleChevronRight.svg" aria-hidden="true" />

      <div v-for="(topic, index) in currentTopicPath" class="flex items-center justify-center gap-2">
        <button
          class="rounded-lg bg-neutral-200 px-6 pb-0.5 pt-1 text-lg font-medium hover:bg-neutral-300"
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
          <TeacherAssignmentCatalogQuestionButton
            :click-function="toggleAnswers"
            :img="`/ui/${showQuestionAnswers ? 'eyeHide' : 'eyeShow'}.svg`"
            :text="`${showQuestionAnswers ? 'Hide' : 'Show'} All Answers`"
          />
        </div>

        <div class="flex w-full flex-wrap items-center justify-start gap-4">
          <LazyTeacherAssignmentCatalogQuestion
            v-for="question in displayedQuestions"
            :key="typeof question === 'number' ? question : question.id"
            :view-only="viewOnly"
            :question="typeof question === 'number' ? loadedQuestions[question] : question"
            :show-answer-override="showQuestionAnswers"
            :current-questions="currentQuestions"
            @select="emit('selectQuestion', typeof question === 'number' ? question : question.id)"
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
defineProps<{
  viewOnly: boolean;
  currentQuestions: CreateAssignmentQuestion[];
  // TODO: currentTopicIds: number[];
}>();
const emit = defineEmits<{
  selectQuestion: [questionId: number];
  // TODO: selectTopic: [topicId: number];
}>();

const userStore = useUserStore();
const { loadedTopics, loadedQuestions } = storeToRefs(userStore);

const initialTopics = ref<Topic[]>([]);
const displayedQuestions = ref<(number | TopicQuestionInterface)[]>([]);

const showQuestionAnswers = ref(true);
function toggleAnswers() {
  showQuestionAnswers.value = !showQuestionAnswers.value;
}

async function loadQuestions(topicId: number, offset?: number) {
  const { data, error } = await tryCatch(getQuestionsUnderTopic(topicId, offset));
  if (error) return console.error(error);

  const questions = data.questions;
  // eslint-disable-next-line no-use-before-define
  totalQuestions.value = data.count;

  if (loadedTopics.value[topicId]) loadedTopics.value[topicId].questionIds = questions.map((question) => question.id);
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
      questionIds: []
    };
    loadedTopics.value[topic.id] = mappedTopic;
    if (parentIsLoaded) parent.children?.push(topic.id);
  }

  return topics;
}

const currentTopicPath = ref<number[]>([]); // topic id array
const currentTopic = ref<TopicMapped>();
const currentQuestionPageIndex = ref(0);
const totalQuestions = ref(0);
watch(currentTopic, async (topic) => {
  if (!topic) currentTopicPath.value = [];
  else {
    if (currentTopicPath.value.includes(topic.id)) currentTopicPath.value = currentTopicPath.value.slice(0, currentTopicPath.value.indexOf(topic.id));

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

onMounted(() => window.addEventListener("scroll", detectSticky));
onBeforeUnmount(() => window.removeEventListener("scroll", detectSticky));
</script>

<style scoped></style>
