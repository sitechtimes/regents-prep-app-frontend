<template>
  <div class="mx-auto max-w-lg rounded-lg p-6 shadow-md">
    <h2 class="mb-4 text-2xl font-semibold">Create Assignment</h2>
    <form class="space-y-4" @submit.prevent="createAssignment">
      <input v-model="name" type="text" placeholder="Assignment Name" class="input-field" required />
      <!--courseID probably auto filled in?-->
      <input v-model.number="courseID" type="number" placeholder="Course ID" class="input-field" required />
      <div class="relative">
        <label for="guaranteedQuestions">Guaranteed Questions</label>
        <div class="mt-1 block w-full cursor-pointer rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 sm:text-sm" @click="toggleGuaranteedDropdown">
          <span v-if="guaranteedQuestions.length > 0">{{ guaranteedQuestions.length }} Selected</span>
          <span v-else>Select Questions</span>
        </div>
        <div v-if="guaranteedDropdownOpen" class="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
          <div v-for="n in getGuaranteedCurrentBatch()" :key="'guaranteed-' + n" class="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100">
            <input :id="'guaranteed-' + n" v-model="guaranteedQuestions" type="checkbox" :value="n" class="h-4 w-4" />
            <label :for="'guaranteed-' + n" class="text-sm">Question object ({{ n }})</label>
          </div>
          <div class="flex justify-between bg-gray-50 px-3 py-2">
            <button :disabled="guaranteedCurrentPage === 1" class="text-sm text-blue-500 hover:underline" type="button" @click="goToPreviousGuaranteedPage">Previous</button>
            <span class="text-sm">Page {{ guaranteedCurrentPage }}</span>
            <button :disabled="guaranteedCurrentPage * batchSize >= allQuestions.length" class="text-sm text-blue-500 hover:underline" type="button" @click="goToNextGuaranteedPage">Next</button>
          </div>
        </div>
      </div>
      <div class="relative mt-4">
        <label for="randomQuestions">Random Questions</label>
        <div class="mt-1 block w-full cursor-pointer rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 sm:text-sm" @click="toggleRandomDropdown">
          <span v-if="randomQuestions.length > 0">{{ randomQuestions.length }} Selected</span>
          <span v-else>Select Questions</span>
        </div>
        <div v-if="randomDropdownOpen" class="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
          <div v-for="n in getRandomCurrentBatch()" :key="'random-' + n" class="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100">
            <input :id="'random-' + n" v-model="randomQuestions" type="checkbox" :value="n" class="h-4 w-4" />
            <label :for="'random-' + n" class="text-sm">Question object ({{ n }})</label>
          </div>
          <div class="flex justify-between bg-gray-50 px-3 py-2">
            <button :disabled="randomCurrentPage === 1" class="text-sm text-blue-500 hover:underline" type="button" @click="goToPreviousRandomPage">Previous</button>
            <span class="text-sm">Page {{ randomCurrentPage }}</span>
            <button :disabled="randomCurrentPage * batchSize >= allQuestions.length" class="text-sm text-blue-500 hover:underline" type="button" @click="goToNextRandomPage">Next</button>
          </div>
        </div>
      </div>
      <div class="space-y-2">
        <label>Due Date: </label>
        <input v-model="dueDateDate" type="date" class="input-field" required />
        <input v-model="dueDateTime" type="time" class="input-field" required />
      </div>
      <input v-model.number="numOfQuestions" type="number" placeholder="Number of Questions" class="input-field" required />
      <label class="flex items-center space-x-2">
        <input v-model="lateSubmissions" type="checkbox" class="h-4 w-4" />
        <span>Allow Late Submissions</span>
      </label>
      <!--0 = unlimited time, rest is by minutes? ask about this-->
      <input v-model.number="timeAllotted" type="number" placeholder="Time Allotted (mins)" class="input-field" required />
      <input v-model.number="attemptsAllowed" type="number" placeholder="Attempts Allowed" class="input-field" required />
      <p class="text-sm">Note: 0 = Unlimited</p>
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
const guaranteedQuestions = ref<number[]>([]);
const randomQuestions = ref<number[]>([]);
const dueDateDate = ref("");
const dueDateTime = ref("");
const numOfQuestions = ref();
const lateSubmissions = ref(false);
const timeAllotted = ref();
const attemptsAllowed = ref();
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const guaranteedDropdownOpen = ref(false);
const randomDropdownOpen = ref(false);

const allQuestions = Array.from({ length: 5573 }, (_, i) => i + 1);
const batchSize = 100;
const guaranteedCurrentPage = ref(1);
const randomCurrentPage = ref(1);

function getISODateTime() {
  if (!dueDateDate.value || !dueDateTime.value) return null;
  const dateTimeString = `${dueDateDate.value}T${dueDateTime.value}:00`;
  const isoDate = new Date(dateTimeString).toISOString();
  return isoDate;
}

function getGuaranteedCurrentBatch() {
  const start = (guaranteedCurrentPage.value - 1) * batchSize;
  const end = start + batchSize;
  return allQuestions.slice(start, end);
}

function getRandomCurrentBatch() {
  const start = (randomCurrentPage.value - 1) * batchSize;
  const end = start + batchSize;
  return allQuestions.slice(start, end);
}

function toggleGuaranteedDropdown() {
  guaranteedDropdownOpen.value = !guaranteedDropdownOpen.value;
}

function toggleRandomDropdown() {
  randomDropdownOpen.value = !randomDropdownOpen.value;
}

function goToNextGuaranteedPage() {
  if (guaranteedCurrentPage.value * batchSize < allQuestions.length) {
    guaranteedCurrentPage.value += 1;
  }
}

function goToPreviousGuaranteedPage() {
  if (guaranteedCurrentPage.value > 1) {
    guaranteedCurrentPage.value -= 1;
  }
}

function goToNextRandomPage() {
  if (randomCurrentPage.value * batchSize < allQuestions.length) {
    randomCurrentPage.value += 1;
  }
}

function goToPreviousRandomPage() {
  if (randomCurrentPage.value > 1) {
    randomCurrentPage.value -= 1;
  }
}

async function createAssignment() {
  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";
  try {
    const dueDate = getISODateTime();
    if (!dueDate) throw new Error("Invalid date or time");
    await submitCreateAssignment(
      name.value,
      Number(courseID.value),
      guaranteedQuestions.value,
      randomQuestions.value,
      dueDate,
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

<style scoped></style>
