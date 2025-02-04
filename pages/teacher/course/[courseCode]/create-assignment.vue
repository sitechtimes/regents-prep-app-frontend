<template>
  <div class="mx-auto max-w-lg rounded-lg p-6 shadow-md">
    <h2 class="mb-4 text-2xl font-semibold">Create Assignment</h2>
    <form @submit.prevent="createAssignment" class="space-y-4">
      <input v-model="name" type="text" placeholder="Assignment Name" class="input-field" required />
      <input v-model.number="courseID" type="number" placeholder="Course ID" class="input-field" required />
      <!--make questions into a selection rather than typed input-->
      <input v-model.number="guaranteedQuestions" type="number" placeholder="Guaranteed Questions" class="input-field" required />
      <input v-model.number="randomQuestions" type="number" placeholder="Random Questions" class="input-field" required />
      <!--allow user to input time-->
      <input v-model="dueDate" type="datetime-local" class="input-field" required />
      <input v-model.number="numOfQuestions" type="number" placeholder="Number of Questions" class="input-field" required />
      <label class="flex items-center space-x-2">
        <input v-model="lateSubmissions" type="checkbox" class="h-4 w-4" />
        <span>Allow Late Submissions</span>
      </label>
      <!--0 = unlimited time, rest is by minutes? ask about this-->
      <input v-model.number="timeAllotted" type="number" placeholder="Time Allotted (mins)" class="input-field" required />
      <input v-model.number="attemptsAllowed" type="number" placeholder="Attempts Allowed" class="input-field" required />

      <button type="submit" class="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600" :disabled="loading">
        {{ loading ? "Creating..." : "Create Assignment" }}
      </button>
      <p v-if="successMessage" class="text-green-600">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
    </form>
  </div>
</template>
<script setup lang="ts">
const name = ref("");
const courseID = ref();
const guaranteedQuestions = ref();
const randomQuestions = ref();
const dueDate = ref("");
const numOfQuestions = ref();
const lateSubmissions = ref(false);
const timeAllotted = ref();
const attemptsAllowed = ref();
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

async function createAssignment() {
  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";
  try {
    await submitCreateAssignment(
      name.value,
      Number(courseID.value),
      Number(guaranteedQuestions.value),
      Number(randomQuestions.value),
      dueDate.value,
      Number(numOfQuestions.value),
      lateSubmissions.value,
      Number(timeAllotted.value),
      Number(attemptsAllowed.value)
    );
    successMessage.value = "Assignment created successfully!";
  } catch (error) {
    errorMessage.value = "Failed to create assignment.";
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style></style>
