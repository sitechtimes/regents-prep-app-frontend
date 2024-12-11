<template>
  <div class="flex h-full w-full flex-col items-center justify-start">
    <Loading :show="!loaded" />

    <div class="flex w-full items-center justify-center" v-if="loaded">
      <div class="flex w-[90vw] h-[90vh] flex-col items-center justify-center" v-if="currentCourse">
        <div
          class="rounded-[7px] w-full h-[90vh]"
          v-if="currentAssignment"
          :assignment="currentAssignment"
        >
          <div class="w-full h-[10%] rounded-t-[7px] overflow-hidden overflow-ellipsis text-nowrap text-5xl font-semibold flex justify-center items-center">
            Assignment Name
          </div>
          <div class="w-full h-[70%] bg-gray-300 rounded-lg border border-[var(--faded-bg-color)] transition-all duration-300 ease-in-out hover:border-[var(--primary)] hover:shadow-lg hover:dark:shadow-[var(--gray)]">
            <div>
              <!-- Display question text -->
            </div>
          </div>
          <div class="font-bold text-3xl w-full h-[5%] flex justify-center items-center">
            <div class="pt-4">Question x / y</div>
          </div>
          <div class="w-full h-[15%] flex justify-between items-center p-3">
            <div class="w-[50%] font-bold text-2xl m-2">
              <div>Attempts Left: </div>
              <div>Due Oct. 20, 2024 11:59PM</div>
            </div>
            <button 
              class="w-[50%] font-bold text-2xl flex items-center justify-center"
              @click="getNextQuestion"
            >
              <div class="bg-green-300 p-2 pl-4 pr-4 rounded-lg border-2 border-black">
                Next Question
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "auth",
  requiresAuth: true,
});

import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { courses, currentCourse, initComplete } = storeToRefs(userStore);

const currentAssignment = ref<StudentAssignment | null>(null);
const loaded = ref(false);

onMounted(() => {
  getCourse();
});

userStore.$subscribe(async () => {
  getCourse();
});

async function fetchFromApi(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Ensures cookies are sent with the request
  });

  if (!response.ok) {
    throw new Error(`Error fetching from API: ${response.statusText}`);
  }

  return response.json();
}

async function getCourse() {
  if (!initComplete.value) return;

  const routeCode = route.params.assignmentId as string;
  const courseCode = Number(route.params.courseCode);

  if (!courses.value.length) {
    try {
      const data = await fetchFromApi("/init/");
      userStore.$patch({ courses: data.courses });
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  }

  currentCourse.value = courses.value.find((course) => course.id === courseCode);
  currentAssignment.value = currentCourse.value?.assignments.find(
    (assignment) => assignment.id === Number(routeCode) && "instanceInfo" in assignment
  ) || null;

  if (currentAssignment.value) {
    console.log("Current Assignment:", currentAssignment.value);
  } else {
    console.error("Assignment not found.");
  }

  if (!currentCourse.value) return router.push(`/student/dashboard?course=${courseCode}`);
  if (!currentAssignment.value) return router.push(`/student/dashboard?assignment=${routeCode}`);

  loaded.value = true;
}
getNextQuestionHandler();
async function getNextQuestionHandler() {
  if (!currentAssignment.value) {
    console.error("No current assignment to fetch the next question for.");
    return;
  }

  try {
    const nextQuestionData = await getNextQuestion(currentAssignment.value.id);
    if (nextQuestionData) {
      currentAssignment.value = { ...currentAssignment.value, question: nextQuestionData };
      console.log("Next Question Fetched:", nextQuestionData);
    } else {
      console.error("Invalid response structure for next question.");
    }
  } catch (error) {
    console.error("Failed to fetch the next question:", error);
  }
}
</script>


<style scoped></style>
