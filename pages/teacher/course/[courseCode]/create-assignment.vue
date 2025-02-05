<template>
  <div class="mx-auto max-w-lg rounded-lg p-6 shadow-md">
    <h2 class="mb-4 text-2xl font-semibold">Create Assignment</h2>
    <form @submit.prevent="createAssignment" class="space-y-4">
      <input v-model="name" type="text" placeholder="Assignment Name" class="input-field" required />
      <!--courseID probably auto filled in?-->
      <input v-model.number="courseID" type="number" placeholder="Course ID" class="input-field" required />
      <!--make questions into a selection rather than typed input-->
      <div class="relative">
        <label for="guaranteedQuestions"> Guaranteed Questions </label>
        <div @click="toggleGuaranteedDropdown" class="mt-1 block w-full cursor-pointer rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm focus:ring-blue-500 sm:text-sm">
          <span v-if="guaranteedQuestions.length > 0"> {{ guaranteedQuestions.length }} Selected </span>
          <span v-else>Select Questions</span>
        </div>

        <!-- Dropdown -->
        <div v-if="guaranteedDropdownOpen" class="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-300 bg-black shadow-lg">
          <div v-for="n in 5573" :key="'guaranteed-' + n" class="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100">
            <input type="checkbox" :id="'guaranteed-' + n" :value="n" v-model="guaranteedQuestions" class="h-4 w-4" />
            <label :for="'guaranteed-' + n" class="text-sm text-gray-700"> Question object ({{ n }}) </label>
          </div>
        </div>
      </div>

      <!--       <div>
        <label for="guaranteedQuestions">Guaranteed Questions</label>
        <select
          v-model.number="guaranteedQuestions"
          id="guaranteedQuestions"
          size="5"
          class="input-field mt-1 block w-full rounded-md border-gray-300 bg-black px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        >
          <option v-for="n in 5573" :key="'guaranteed-' + n" :value="n">Question object ({{ n }})</option>
        </select>
      </div>

      <div>
        <label for="randomQuestions">Random Questions</label>
        <select
          v-model.number="randomQuestions"
          id="randomQuestions"
          size="5"
          class="input-field mt-1 block w-full rounded-md border-gray-300 bg-black px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        >
          <option v-for="n in 5573" :key="'random-' + n" :value="n">Question object ({{ n }})</option>
        </select>
      </div> -->
      <!--allow user to input time (firefox no allow this)-->
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
const guaranteedQuestions = ref([]);
const randomQuestions = ref([]);
const dueDate = ref("");
const numOfQuestions = ref();
const lateSubmissions = ref(false);
const timeAllotted = ref();
const attemptsAllowed = ref();
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const guaranteedDropdownOpen = ref(false);

function toggleGuaranteedDropdown() {
  guaranteedDropdownOpen.value = !guaranteedDropdownOpen.value;
}

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
