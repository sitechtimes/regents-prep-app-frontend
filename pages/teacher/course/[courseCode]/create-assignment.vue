<template>
  <div class="flex w-full items-start justify-center gap-4">
    <form class="sticky top-20 flex w-[30rem] shrink-0 flex-col gap-2 rounded-xl bg-neutral-100 p-6" @submit.prevent="createAssignment">
      <h3 class="text-2xl font-bold">Create Assignment</h3>

      <div>
        <label class="fo-label fo-label-text shrink-0" for="name">Name <span title="Required" class="font-2xl text-red-500">*</span></label>
        <input id="name" v-model="assignmentInfo.name" required type="text" class="fo-input" placeholder="Unit 3 Review" />
      </div>

      <div>
        <label class="fo-label fo-label-text shrink-0">Due <span title="Required" class="font-2xl text-red-500">*</span></label>
        <div class="flex w-full items-center justify-center gap-3">
          <input v-model="assignmentInfo.dueDate.date" required type="date" class="fo-input" :min="currentDateISO" />
          <input v-model="assignmentInfo.dueDate.time" required type="time" class="fo-input" />
        </div>
      </div>

      <div class="flex w-full items-center justify-center gap-3">
        <div class="grow">
          <label class="fo-label fo-label-text shrink-0" for="time-per-question">Seconds per question</label>
          <input id="time-per-question" v-model.number="assignmentInfo.timeAllotted" required type="number" class="fo-input" placeholder="Unlimited" />
        </div>

        <div class="grow">
          <label class="fo-label fo-label-text shrink-0" for="attempts-per-question">Attempts per question</label>
          <input id="attempts-per-question" v-model.number="assignmentInfo.attemptsAllowed" required type="number" class="fo-input" placeholder="Unlimited" />
        </div>
      </div>

      <div>
        <p class="fo-label fo-label-text pointer-events-none shrink-0">Questions and Topics <span title="Required" class="font-2xl text-red-500">*</span></p>
        <div class="flex h-96 w-full items-center justify-center rounded-lg border border-neutral-400 bg-white hover:border-neutral-500">
          <div class="mb-10 flex flex-col items-center justify-center">
            <img class="size-40 opacity-65" src="/ui/plus.svg" aria-hidden="true" />
            <h5 class="text-center text-xl font-bold text-neutral-500">No Questions or Topics Selected</h5>
            <p class="w-3/4 text-center text-sm font-medium text-neutral-400">Select questions and topics from the question bank to add them to this assignment!</p>
          </div>
        </div>
      </div>

      <div class="flex w-full items-center justify-between px-10">
        <div class="flex items-center gap-1">
          <input id="late-submissions" v-model="assignmentInfo.lateSubmissions" type="checkbox" class="fo-checkbox" />
          <label class="fo-label fo-label-text shrink-0 translate-y-0.5 text-base" for="late-submissions">Allow late submissions</label>
        </div>

        <div :data-tip="!assignmentInfo.name ? 'Assignment must have a name' : 'You must have at least one question or topic'" :class="{ 'du-tooltip': !allowedToSubmit }">
          <button
            class="rounded-lg border px-8 py-1.5 text-xl font-medium"
            :class="allowedToSubmit ? 'border-green-400 bg-green-400 hover:bg-green-300' : 'cursor-not-allowed border-neutral-400 bg-white'"
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </form>

    <TeacherAssignmentQuestionCatalog />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "teacher" });

const route = useRoute();
const userStore = useUserStore();
const { showSideMenu } = storeToRefs(userStore);

const currentDateISO = (() => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();

  return `${year}-${month}-${day}`;
})();
const courseID = Number(route.params.courseCode);

const assignmentInfo = reactive({
  name: "",
  dueDate: {
    date: currentDateISO,
    time: "23:59"
  },
  guaranteedQuestions: ref<number[]>([]),
  randomQuestions: ref<number[]>([]),
  topics: ref<number[]>([]),
  lateSubmissions: false,
  timeAllotted: ref<number>(),
  attemptsAllowed: ref<number>()
});

const allowedToSubmit = computed(() => assignmentInfo.name && (assignmentInfo.guaranteedQuestions.length || assignmentInfo.randomQuestions.length || assignmentInfo.topics.length));

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

  await new Promise((resolve) => resolve(1));

  // try {
  //   const dueDate = new Date(dueDateInput.value).toISOString();
  //   const guaranteedQuestions = guaranteedQuestionIDs;
  //   const randomQuestions = randomQuestionIDs;
  //   await submitCreateAssignment(name.value, courseID, guaranteedQuestions.value, randomQuestions.value, dueDate, numQuestions.value, lateSubmissions.value, timeAllotted.value, attemptsAllowed.value);
  //   successMessage.value = "Assignment created successfully!";
  // } catch (error) {
  //   errorMessage.value = "Failed to create assignment.";
  //   console.error(error);
  // } finally {
  //   loading.value = false;
  // }
}
</script>

<style scoped></style>
