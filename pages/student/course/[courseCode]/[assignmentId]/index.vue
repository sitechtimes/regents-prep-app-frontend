<template>
  <div class="flex h-full w-full flex-col items-center justify-start">
    <div v-if="studentCurrentCourse && currentAssignment" class="flex h-full w-2/3 flex-col items-center justify-center gap-10">
      <Teleport to="body">
        <Transition name="menu-slide">
          <div v-if="assignmentInProgress" class="fixed left-0 top-0 z-50 flex h-dvh w-screen items-center justify-center bg-body">
            <StudentAssignmentSidebar :assignment="currentAssignment" :current-question-index="currentQuestionIndex" @close="assignmentInProgress = false" />

            <div class="mb-10 flex h-full w-full flex-col items-center justify-center overflow-y-auto px-24 py-12">
              <h2 class="text-3xl font-semibold">Question {{ currentQuestionIndex + 1 }}</h2>
              <p class="text-neutral-100" v-html="currentQuestion?.question.text"></p>

              <div
                v-if="currentQuestion?.question.answerType === 'Multiple Choice'"
                v-for="choice in currentQuestion?.question.answers"
                class="mt-4 flex w-full flex-col items-start space-y-3 overflow-y-auto"
              >
                <button
                  type="button"
                  class="w-full rounded-lg bg-neutral-300 px-6 py-3 shadow-sm"
                  :class="{
                    'bg-neutral-500': choice.selected
                  }"
                  @click="selectChoice(choice)"
                  v-html="choice.text"
                ></button>
              </div>

              <div v-if="currentAssignment.assignment.isStatic" class="mt-8 flex w-full items-center justify-end gap-6 px-10">
                <button class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-16 py-2 text-xl hover:bg-neutral-200" type="button" @click="switchQuestion('previous')">
                  <img class="size-5 group-hover:-translate-x-1" src="/ui/arrowLeft.svg" aria-hidden="true" />
                  Back
                </button>
                <button class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-16 py-2 text-xl hover:bg-neutral-200" type="button" @click="switchQuestion('next')">
                  Next
                  <img class="size-5 group-hover:translate-x-1" src="/ui/arrowRight.svg" aria-hidden="true" />
                </button>
              </div>
              <div v-if="currentAssignment.assignment.isStatic === false" class="mt-8 flex w-full items-center justify-end gap-6 px-10">
                <button class="group flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-16 py-2 text-xl hover:bg-neutral-200" type="button" @click="submitQuestion()">Submit</button>
              </div>
              <div v-if="feedbackMessage">
                <p class="group flex items-center justify-center gap-2 rounded-xl px-16 py-2 text-xl text-neutral-400">{{ feedbackMessage }}</p>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "student-get-course",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { studentCurrentCourse, currentQuestion } = storeToRefs(userStore);
const feedbackMessage = ref<string>("");
const isAnswerCorrect = ref<boolean>(false);
const remainingAttempts = ref<number>(0);
const selectedChoice = ref<Question["answers"][0]>();

function selectChoice(choice: Question["answers"][0]) {
  currentQuestion.value?.question.answers.forEach((answer) => {
    answer.selected = false;
  });
  choice.selected = true;
  selectedChoice.value = choice;
}

const currentAssignment = computed(() => studentCurrentCourse.value?.assignments.find((assignment) => assignment.id === Number(route.params.assignmentId)));

const assignmentInProgress = ref(false);
watch(assignmentInProgress, (val) => {
  if (!val) setTimeout(() => void router.push(`/student/course/${studentCurrentCourse.value?.id}`), 200);
});

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
    if (!currentAssignment.value) return;

    const alreadyFetchedQuestion = currentAssignment.value.assignment.questionInterfaces[currentQuestionIndex.value] as QuestionInterface | undefined;
    if (alreadyFetchedQuestion) return (currentQuestion.value = alreadyFetchedQuestion);
    try {
      if (currentAssignment.value.assignment.isStatic) {
        const question = await getNextStaticQuestion(currentAssignment.value.id, currentQuestionIndex.value);
        currentAssignment.value.assignment.questionInterfaces[currentQuestionIndex.value] = question;
        currentQuestion.value = question;
      } else {
        const question = await getNextDynamicQuestion(currentAssignment.value.id);
        currentAssignment.value.assignment.questionInterfaces[currentQuestionIndex.value] = question;
        currentQuestion.value = question;
      }
    } catch (error) {
      console.error(error);
      // TODO: show error to user
    }
  },
  { immediate: true }
);

async function switchQuestion(direction: "previous" | "next") {
  if (!currentAssignment.value) return;

  const newIndex = direction === "previous" ? currentQuestionIndex.value - 1 : currentQuestionIndex.value + 1;

  if (newIndex >= 0 && newIndex < currentAssignment.value.assignment.numQuestions) {
    await changeRouteQuery({ q: newIndex });
  }
}

async function submitQuestion() {
  try {
    if (selectedChoice.value && currentQuestion.value) {
      const response = await submitQuestionAnswer(currentQuestion.value.id, selectedChoice.value.id);
      isAnswerCorrect.value = response.isCorrect;
      remainingAttempts.value = response.remainingAttempts;

      // Show feedback to the user
      if (response.isCorrect) {
        feedbackMessage.value = "Previous question correct! 🎉";
      } else if (response.remainingAttempts === 0) {
        feedbackMessage.value = "You've exceeded the maximum amount of attempts on the previous question. It has been marked incorrect.";
      } else {
        feedbackMessage.value = `Incorrect. You have ${response.remainingAttempts} attempts left.`;
      }
      if (response.isCorrect || response.remainingAttempts === 0) {
        await switchQuestion("next");
      }
    } else {
      console.warn("No answer selected!");
    }
  } catch (error) {
    console.error("Error submitting question:", error);
  }
}

function warnForUnsavedChanges(event: BeforeUnloadEvent) {
  event.preventDefault();
  // TODO: add api call to save progress
}

onBeforeMount(() => {
  if (!route.query.q) void changeRouteQuery({ q: 0 });
});

onMounted(() => {
  assignmentInProgress.value = true;
  window.addEventListener("beforeunload", warnForUnsavedChanges);
});

onBeforeUnmount(() => window.removeEventListener("beforeunload", warnForUnsavedChanges));
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
