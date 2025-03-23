<template>
  <div class="flex grow flex-col items-start justify-start gap-6">
    <div class="flex w-full items-center justify-start gap-3 px-10 py-2">
      <button class="rounded-lg bg-neutral-200 px-6 pb-0.5 pt-1 text-lg font-medium hover:bg-neutral-300" type="button" @click="currentTopic = undefined">ALL TOPICS</button>
      <img v-show="currentTopicPath.length" class="size-5" src="/ui/doubleChevronRight.svg" aria-hidden="true" />
      <div v-for="(topic, index) in currentTopicPath" class="flex items-center justify-center gap-3">
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
        <div class="flex w-full flex-wrap items-center justify-center gap-4">
          <TeacherAssignmentCatalogTopic
            v-for="topic in currentTopic ? currentTopic.children : initialTopics"
            :key="typeof topic === 'number' ? topic : topic.id"
            :loaded-topics="loadedTopics"
            :topic="topic"
            @select="(topic) => (currentTopic = loadedTopics[typeof topic === 'number' ? topic : topic.id])"
          />
        </div>
      </div>

      <div v-if="currentTopic?.hasQuestions" class="flex w-full flex-col items-start justify-center gap-4">
        <h3 class="px-5 text-2xl font-bold">Questions</h3>
        <div class="flex w-full flex-wrap items-center justify-center gap-4">
          <TeacherAssignmentCatalogQuestion v-for="question in currentTopic.questions" :key="question.id" :question="question" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps<{}>();
// const emit = defineEmits<{}>();

/** @example { [id]: Topic } */
const loadedTopics = ref<Record<number, TopicMapped>>({});
const initialTopics = ref<Topic[]>([]);

async function loadQuestions(topicId: number) {
  const { data: questions, error } = await tryCatch(getQuestionsUnderTopic(topicId));
  if (error) return console.error(error);
  return questions.questions;
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
      questions: topic.hasQuestions ? ((await loadQuestions(topic.id)) ?? []) : null
    };
    loadedTopics.value[topic.id] = mappedTopic;
    if (parentIsLoaded) parent.children?.push(topic.id);
  }

  return topics;
}

const currentTopicPath = ref<number[]>([]); // topic id array
const currentTopic = ref<TopicMapped>();
watch(currentTopic, async (topic) => {
  if (!topic) return (currentTopicPath.value = []);
  if (currentTopicPath.value.includes(topic.id)) currentTopicPath.value = currentTopicPath.value.slice(0, currentTopicPath.value.indexOf(topic.id));

  if (topic) {
    await loadTopics(topic.id);
    currentTopicPath.value.push(topic.id);
  }
});

onMounted(async () => {
  const topics = await loadTopics(1);
  if (topics) initialTopics.value = topics;
});
</script>

<style scoped></style>
