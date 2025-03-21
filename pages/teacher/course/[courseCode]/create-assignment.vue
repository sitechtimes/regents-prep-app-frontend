<template>
  <div class="flex w-full items-start justify-center gap-4">
    <div class="sticky top-16 flex w-96 shrink-0 flex-col bg-neutral-100 p-4">
      <h3 class="text-2xl font-bold">Create Assignment</h3>
    </div>

    <div class="grow"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "teacher" });

const route = useRoute();
const userStore = useUserStore();
const { showSideMenu } = storeToRefs(userStore);
const courseID = Number(route.params.courseCode);

const assignmentInfo = reactive({
  name: "",
  dueDate: new Date(),
  numQuestions: 0,
  lateSubmissions: false,
  timeAllotted: 0,
  attemptsAllowed: 0
});

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
  // loading.value = true;
  // successMessage.value = "";
  // errorMessage.value = "";
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

<style scoped>
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 1;
  cursor: pointer;
}
</style>
