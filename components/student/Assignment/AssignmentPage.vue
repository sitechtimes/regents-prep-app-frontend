<template>
  <Teleport to="body">
    <Transition name="menu-slide">
      <div v-show="show" class="fixed left-0 top-0 z-50 flex h-dvh w-screen items-center justify-center bg-body">
        <StudentAssignmentSidebar :assignment="assignment" :current-question-index="currentQuestionIndex" />

        <div class="mb-10 flex h-full w-full flex-col items-center justify-center px-24 py-12">
          <h2 class="text-3xl font-semibold">Question {{ currentQuestionIndex + 1 }}</h2>
          <p class="text-neutral-700">{{ currentQuestion?.question.text }}</p>

          <!-- TODO: add answer choices -->
          <div
            v-if="currentQuestion?.question.answerType === 'Multiple Choice'"
            v-for="choice in currentQuestion?.question.answers"
            class="h-125 mt-8 w-full overflow-y-scroll rounded-xl bg-neutral-100"
          >
            <button type="button" @click="choice.selected = true" v-html="choice.text"></button>
          </div>

          <div class="mt-8 flex w-full items-center justify-end gap-6 px-10">
            <button class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-16 py-2 text-xl hover:bg-neutral-200" type="button" @click="switchQuestion('previous')">
              <img class="size-5 group-hover:-translate-x-1" src="/ui/arrowLeft.svg" aria-hidden="true" />
              Back
            </button>
            <button class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-16 py-2 text-xl hover:bg-neutral-200" type="button" @click="switchQuestion('next')">
              Next
              <img class="size-5 group-hover:translate-x-1" src="/ui/arrowRight.svg" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  assignment: StudentAssignment;
}>();

const route = useRoute();
const userStore = useUserStore();
const { currentQuestion } = storeToRefs(userStore);

let lastQuestionIndex = 0;
const currentQuestionIndex = computed(() => {
  const query = Number(route.query.q);
  const index = Number.isNaN(query) ? lastQuestionIndex : query;
  lastQuestionIndex = index;
  return index;
});

watch(
  currentQuestionIndex,
  async () => {
    const alreadyFetchedQuestion = props.assignment.assignment.questionInterfaces[currentQuestionIndex.value] as QuestionInterface | undefined;
    if (alreadyFetchedQuestion) return (currentQuestion.value = alreadyFetchedQuestion);

    try {
      const question = await getNextQuestion(props.assignment.id);
      // eslint-disable-next-line vue/no-mutating-props
      props.assignment.assignment.questionInterfaces[currentQuestionIndex.value] = question;
      currentQuestion.value = question;
    } catch (error) {
      console.error(error);
      // TODO: show error to user
    }
  },
  { immediate: true }
);

async function switchQuestion(directiona: "previous" | "next") {
  if (directiona === "previous" && currentQuestionIndex.value > 0) await changeRouteQuery({ q: currentQuestionIndex.value - 1 });
  if (directiona === "next" && currentQuestionIndex.value < props.assignment.assignment.numOfQuestions - 1) await changeRouteQuery({ q: currentQuestionIndex.value + 1 });
}
</script>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.2s ease-in-out;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(5rem);
}
</style>
