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
            v-for="question in currentTopic ? currentTopic.questionIds : initialQuestions"
            :key="typeof question === 'number' ? question : question.id"
            :view-only="viewOnly"
            :question="typeof question === 'number' ? loadedQuestions[question] : question"
            :show-answer-override="showQuestionAnswers"
            :current-questions="currentQuestions"
            @select="emit('selectQuestion', typeof question === 'number' ? question : question.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  viewOnly: boolean;
  currentQuestions: CreateAssignmentQuestion[];
  currentTopicIds: number[];
}>();
const emit = defineEmits<{
  selectQuestion: [questionId: number];
  selectTopic: [topicId: number];
}>();

const userStore = useUserStore();
const { loadedTopics, loadedQuestions } = storeToRefs(userStore);

const initialTopics = ref<Topic[]>([]);
const initialQuestions = ref<TopicQuestionInterface[]>([]);

const showQuestionAnswers = ref(true);
function toggleAnswers() {
  showQuestionAnswers.value = !showQuestionAnswers.value;
}

async function loadQuestions(topicId: number) {
  const { data, error } = await tryCatch(getQuestionsUnderTopic(topicId));
  if (error) return console.error(error);

  const questions = data.questions;

  if (loadedTopics.value[topicId]) loadedTopics.value[topicId].questionIds = questions.map((question) => question.id);
  for (const question of questions) if (!loadedQuestions.value[question.id]) loadedQuestions.value[question.id] = question;

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

    if (loadedTopic) return;

    const mappedTopic: TopicMapped = {
      ...topic,
      children: topic.hasChildren ? [] : null,
      questionIds: []
    };
    loadedTopics.value[topic.id] = mappedTopic;
    if (parentIsLoaded) parent.children?.push(topic.id);
  }

  console.log(loadedTopics.value);
  return topics;
}

const currentTopicPath = ref<number[]>([]); // topic id array
const currentTopic = ref<TopicMapped>();
watch(currentTopic, async (topic) => {
  if (!topic) return (currentTopicPath.value = []);

  if (currentTopicPath.value.includes(topic.id)) currentTopicPath.value = currentTopicPath.value.slice(0, currentTopicPath.value.indexOf(topic.id));

  currentTopicPath.value.push(topic.id);
  await loadTopics(topic.id);
  await loadQuestions(topic.id);
});

function goBack() {
  currentTopic.value = loadedTopics.value[currentTopicPath.value[currentTopicPath.value.length - 2]];
  currentTopicPath.value = currentTopicPath.value.slice(0, currentTopicPath.value.length - 1);
}

onMounted(async () => {
  const topics = await loadTopics(1);
  const questions = await loadQuestions(1);
  if (topics) initialTopics.value = topics;
  if (questions) initialQuestions.value = questions;
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
