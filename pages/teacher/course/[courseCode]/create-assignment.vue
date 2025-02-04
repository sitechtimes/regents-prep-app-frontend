<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Create Assignment</h2>
    <form @submit.prevent="createAssignment" class="space-y-4">
      <input v-model="name" type="text" placeholder="Assignment Name" class="input-field" required />
      <input v-model.number="courseID" type="number" placeholder="Course ID" class="input-field" required />
      <input v-model.number="guaranteedQuestions" type="number" placeholder="Guaranteed Questions" class="input-field" required />
      <input v-model.number="randomQuestions" type="number" placeholder="Random Questions" class="input-field" required />
      <input v-model="dueDate" type="datetime-local" class="input-field" required />
      <input v-model.number="numOfQuestions" type="number" placeholder="Number of Questions" class="input-field" required />
      <input v-model.number="timerStyle" type="number" placeholder="Timer Style" class="input-field" required />
      <label class="flex items-center space-x-2">
        <input v-model="lateSubmissions" type="checkbox" class="h-4 w-4" />
        <span>Allow Late Submissions</span>
      </label>
      <input v-model.number="timeAllotted" type="number" placeholder="Time Allotted (mins)" class="input-field" required />
      <input v-model.number="attemptsAllowed" type="number" placeholder="Attempts Allowed" class="input-field" required />
      
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Assignment' }}
      </button>
      <p v-if="successMessage" class="text-green-600">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
    </form>
  </div>
</template>
<script lang="ts">
import { submitCreateAssignment } from '~/utils/fetch';

const name = ref('');
const courseID = ref(null);
const guaranteedQuestions = ref(null);
const randomQuestions = ref(null);
const dueDate = ref('');
const numOfQuestions = ref(null);
const timerStyle = ref(null);
const lateSubmissions = ref(false);
const timeAllotted = ref(null);
const attemptsAllowed = ref(null);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const createAssignment = async () => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await submitCreateAssignment(
      name.value,
      Number(courseID.value),
      Number(guaranteedQuestions.value),
      Number(randomQuestions.value),
      dueDate.value,
      Number(numOfQuestions.value),
      Number(timerStyle.value),
      lateSubmissions.value,
      Number(timeAllotted.value),
      Number(attemptsAllowed.value)
    );
    successMessage.value = 'Assignment created successfully!';
  } catch (error) {
    errorMessage.value = 'Failed to create assignment.';
    console.error(error);
  } finally {
    loading.value = false;
  }
};


</script>

<style></style>
