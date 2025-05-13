<template>
  <div class="question-container print w-full columns-2 gap-16">
    <!-- Object.keys(loadedQuestions).map((id) => Number(id)) if you're evil -->
    <div v-for="(id, index) in questionIds" :key="id" class="question mb-8 inline-flex w-full gap-2 border-red-500">
      <span class="relative min-w-8 max-w-8 text-right">{{ index + 1 }}.</span>

      <div class="flex flex-col">
        <span class="question-text mb-2 space-y-3" v-html="loadedQuestions[id].text"></span>
        <div v-if="loadedQuestions[id].answerType === 'Multiple Choice'" class="w-fit columns-2 gap-2">
          <div v-for="(answer, jndex) in loadedQuestions[id].answers" :key="answer.id" class="mb-1 flex gap-2">
            <span class="min-w-4 max-w-4 text-right"> {{ String.fromCharCode(65 + jndex) }}) </span>
            <span class="answer-text" v-html="answer.text"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ questionIds: number[] }>();

const userStore = useUserStore();
const { loadedQuestions } = storeToRefs(userStore);

onMounted(() => {
  document.onkeydown = (e) => {
    if (e.key === "q") document.body.classList.toggle("goog");
  };
});

onUnmounted(() => {
  document.onkeydown = null;
});
</script>

<style scoped>
.question-container {
  column-rule: 2px solid #000000;
}

::v-deep(.answer-text),
.question {
  break-inside: avoid;
}

.question:last-child {
  margin-bottom: 0;
}

/* v-deep is needed since v-html and style scoped go together like fire and something flammable */
::v-deep(.question-text img) {
  max-height: 28rem;
}

::v-deep(.answer-text img) {
  max-height: 6rem;
}
</style>
