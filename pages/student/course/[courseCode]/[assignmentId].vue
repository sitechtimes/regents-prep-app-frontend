<template>
  <div class="flex w-full h-full">
    <!-- Sliding menu -->
    <div class="fixed top-0 left-0 transition-all duration-300" :class="{ 'w-64': showSideMenu, 'w-0': !showSideMenu }">
      <div class="bg-white h-full shadow-lg overflow-y-auto">
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-4">Questions</h2>
          <div v-if="currentAssignment?.question.length > 0">
            <div v-for="(question, index) in currentAssignment.question" :key="question.id" class="mb-2">
              <button @click="navigateToQuestion(question.id)" class="w-full bg-blue-500 text-white py-2 rounded">
                Question {{ index + 1 }}
              </button>
            </div>
          </div>
          <div v-else>
            <p>No questions available.</p>
          </div>
          <button @click="toggleMenu" class="mt-4 text-gray-600">Close Menu</button>
        </div>
      </div>
    </div>

    <!-- Main content area -->
    <div :class="{ 'ml-64': showSideMenu, 'ml-0': !showSideMenu }" class="transition-all duration-300 flex-grow">
      <div class="flex flex-col w-full h-full">
        <!-- Top div: 80% height -->
        <div class="flex-grow bg-gray-200 p-4 flex flex-col space-y-4">
          <!--Assignment Name -->
          <div class="h-1/5 flex items-center justify-center bg-white shadow rounded">
            <h1 class="text-2xl font-bold">{{ currentAssignment?.name || "Assignment Name" }}</h1>
          </div>

          <!-- The div you display questions with-->
          <div class="h-3/5 bg-gray-100 rounded-lg shadow-md">

          </div>

          <div class="h-1/5 flex space-x-4 items-center">
            <!-- Previous Question Button -->
            <div class="flex-1 bg-white rounded shadow-md flex justify-center items-center">
              <button @click="navigateToQuestion(currentQuestionIndex - 1)" :disabled="currentQuestionIndex <= 0"
                class="text-2xl font-bold text-gray-700">
                &lt;
              </button>
            </div>

            <!-- Current Question Display -->
            <div class="flex-1 bg-white rounded shadow-md flex justify-center items-center">
              <p class="text-lg font-semibold">
                {{ currentQuestionIndex + 1 }} / {{ currentAssignment?.question.length }}
              </p>
            </div>

            <!-- Next Question Button -->
            <div class="flex-1 bg-white rounded shadow-md flex justify-center items-center">
              <button @click="navigateToQuestion(currentQuestionIndex + 1)"
                :disabled="currentQuestionIndex >= (currentAssignment?.question.length - 1)"
                class="text-2xl font-bold text-gray-700">
                &gt;
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom div: 20% height -->
        <div class="h-1/5 bg-gray-300 p-4 flex justify-between items-center">
          <!-- Left -->
          <div>
            <p>Attempts Left: {{ currentAssignment?.instanceInfo?.questionsCompleted }} / {{
              currentAssignment?.questionsLength }}</p>
            <p>Due Date: {{ currentAssignment?.dueDate.toLocaleDateString() }}</p>
          </div>
          <!-- Center -->
          <button @click="returnToDashboard" class="bg-gray-500 text-white px-4 py-2 rounded">Return to
            Dashboard</button>
          <!-- Right -->
          <button @click="submitAssignment" class="bg-red-500 text-white px-4 py-2 rounded">Submit Assignment</button>
        </div>
      </div>
    </div>

    <!-- Button to toggle the sliding menu -->
    <button @click="toggleMenu" class="fixed top-4 left-4 bg-blue-500 text-white p-2 rounded z-50">Show
      Questions</button>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "student",
  middleware: ["auth", "add-course"],
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const { currentCourse } = storeToRefs(store);
const currentAssignment = ref<StudentAssignment & { question: QuestionInterface[] }>();
const loaded = ref(false);
const showSideMenu = ref(false);

const toggleMenu = () => {
  showSideMenu.value = !showSideMenu.value;
};

onBeforeMount(() => {
  const routeCode = route.params.assignmentId as string;
  currentAssignment.value = currentCourse.value?.assignments.find(
    (assignment) => assignment.id === Number(routeCode) && "instanceInfo" in assignment
  ) as StudentAssignment & { question: QuestionInterface[] };
});

onMounted(() => {
  if (!currentAssignment.value) return router.push(`/student/dashboard?assignment=${route.params.assignmentId}`);
  loaded.value = true;
});

const startAssignment = () => {
  alert('Starting assignment: ' + currentAssignment.value?.name);
};

const currentQuestionIndex = ref(0);

const navigateToQuestion = (questionIndex: number) => {
  if (questionIndex >= 0 && questionIndex < (currentAssignment.value?.question.length || 0)) {
    currentQuestionIndex.value = questionIndex;
    const questionId = currentAssignment.value?.question[questionIndex].id;
    router.push(`/student/course/${currentCourse.value.id}/assignment/${currentAssignment.value.id}/question/${questionId}`);
  }
};

const returnToDashboard = () => {
  router.push('/student/dashboard');
};

const submitAssignment = () => {
  alert('Assignment submitted!');
};

</script>

<style scoped>
.join-menu-bg {
  z-index: 51;
}
</style>