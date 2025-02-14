<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-2xl rounded-lg p-6 shadow-md">
      <h2 class="mb-4 text-2xl font-semibold">Create Assignment</h2>
      <form class="space-y-4" @submit.prevent="createAssignment">
        <label class="flex items-center space-x-2">Assignment Name:</label>
        <input v-model="name" type="text" placeholder="Ex: Newton's Laws" required />
        <div class="relative">
          <label for="guaranteedQuestionIDs">Guaranteed Questions</label>
          <div class="mt-1 block w-full cursor-pointer rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 sm:text-sm" @click="guaranteedDropdownOpen = !guaranteedDropdownOpen">
            <span v-if="guaranteedQuestionIDs.length > 0">{{ guaranteedQuestionIDs.length }} Selected</span>
            <span v-else>Select Questions</span>
          </div>
          <div v-if="guaranteedDropdownOpen" class="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
            <div v-for="n in getCurrentBatch(guaranteedCurrentPage)" :key="n" class="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100">
              <input :id="'guaranteed-' + n" v-model="guaranteedQuestionIDs" type="checkbox" :value="n" class="h-4 w-4" />
              <label :for="'guaranteed-' + n" class="text-sm">Question object ({{ n }})</label>
            </div>
            <div class="flex justify-between bg-gray-50 px-3 py-2">
              <button type="button" :disabled="guaranteedCurrentPage === 1" class="text-sm text-blue-500 hover:underline" @click="changeGuaranteedPage('prev')">Previous</button>
              <span class="text-sm">Page {{ guaranteedCurrentPage }}</span>
              <button type="button" :disabled="guaranteedCurrentPage * batchSize >= questionNumbers.length" class="text-sm text-blue-500 hover:underline" @click="changeGuaranteedPage('next')">
                Next
              </button>
            </div>
          </div>
        </div>
        <div class="relative mt-4">
          <label for="randomQuestionIDs">Random Questions</label>
          <div class="mt-1 block w-full cursor-pointer rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 sm:text-sm" @click="randomDropdownOpen = !randomDropdownOpen">
            <span v-if="randomQuestionIDs.length > 0">{{ randomQuestionIDs.length }} Selected</span>
            <span v-else>Select Questions</span>
          </div>
          <div v-if="randomDropdownOpen" class="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
            <div v-for="n in getCurrentBatch(randomCurrentPage)" :key="n" class="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100">
              <input :id="'random-' + n" v-model="randomQuestionIDs" type="checkbox" :value="n" class="h-4 w-4" />
              <label :for="'random-' + n" class="text-sm">Question object ({{ n }})</label>
            </div>
            <div class="flex justify-between bg-gray-50 px-3 py-2">
              <button type="button" :disabled="randomCurrentPage === 1" class="text-sm text-blue-500 hover:underline" @click="changeRandomPage('prev')">Previous</button>
              <span class="text-sm">Page {{ randomCurrentPage }}</span>
              <button type="button" :disabled="randomCurrentPage * batchSize >= questionNumbers.length" class="text-sm text-blue-500 hover:underline" @click="changeRandomPage('next')">Next</button>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <label class="flex items-center space-x-2">Due Date: </label>
          <input v-model="dueDateInput" type="datetime-local" required />
          <p v-if="dateError" class="text-red-500">{{ dateError }}</p>
        </div>
        <label class="flex items-center space-x-2">Number of Questions: </label>
        <input v-model.number="numQuestions" type="number" placeholder="Ex: 3" required />
        <label class="flex items-center space-x-2">
          <input v-model="lateSubmissions" type="checkbox" class="h-4 w-4" />
          <span>Allow Late Submissions</span>
        </label>
        <label class="flex items-center space-x-2">Time Allotted (mins): </label>
        <input v-model.number="timeAllotted" type="number" placeholder="Ex: 30" required />
        <label class="flex items-center space-x-2">Attempts Allowed: </label>
        <input v-model.number="attemptsAllowed" type="number" placeholder="Ex: 5" required />
        <p class="text-sm">Note: 0 = Unlimited</p>
        <button type="submit" class="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600" :disabled="loading">
          {{ loading ? "Creating..." : "Create Assignment" }}
        </button>
        <p v-if="successMessage" class="text-green-600">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const name = ref("");
const courseID = Number(route.params.courseCode);
const guaranteedQuestionIDs = ref<number[]>([]);
const randomQuestionIDs = ref<number[]>([]);
const dueDateInput = ref("");
const dateError = ref("");
const numQuestions = ref(0);
const lateSubmissions = ref(false);
const timeAllotted = ref(0);
const attemptsAllowed = ref(0);
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const guaranteedDropdownOpen = ref(false);
const randomDropdownOpen = ref(false);

const questionNumbers = Array.from({ length: 5573 }, (_, i) => i + 1);
const batchSize = 100;
const guaranteedCurrentPage = ref(1);
const randomCurrentPage = ref(1);

function getCurrentBatch(currentPage: number) {
  const start = (currentPage - 1) * batchSize;
  const end = start + batchSize;
  return questionNumbers.slice(start, end);
}

function changeGuaranteedPage(direction: "next" | "prev") {
  if (direction === "next" && guaranteedCurrentPage.value * batchSize < questionNumbers.length) {
    guaranteedCurrentPage.value += 1;
  } else if (direction === "prev" && guaranteedCurrentPage.value > 1) {
    guaranteedCurrentPage.value -= 1;
  }
}

function changeRandomPage(direction: "next" | "prev") {
  if (direction === "next" && randomCurrentPage.value * batchSize < questionNumbers.length) {
    randomCurrentPage.value += 1;
  } else if (direction === "prev" && randomCurrentPage.value > 1) {
    randomCurrentPage.value -= 1;
  }
}

async function createAssignment() {
  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";
  try {
    const dueDate = new Date(dueDateInput.value).toISOString();
    const guaranteedQuestions = guaranteedQuestionIDs;
    const randomQuestions = randomQuestionIDs;
    await submitCreateAssignment(name.value, courseID, guaranteedQuestions.value, randomQuestions.value, dueDate, numQuestions.value, lateSubmissions.value, timeAllotted.value, attemptsAllowed.value);
    successMessage.value = "Assignment created successfully!";
  } catch (error) {
    errorMessage.value = "Failed to create assignment.";
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 1;
  cursor: pointer;
}
</style>
