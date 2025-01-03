<template>
  <div class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start" @click="deselectFilters = !deselectFilters">
    <div class="flex w-full items-center justify-center">
      <div class="flex w-2/3 flex-col items-center justify-center" v-if="currentCourse">
        <div class="flex h-52 w-full flex-col items-start justify-end rounded-2xl p-6" :style="{ backgroundColor: subjectColors[currentCourse.subject] }">
          <h1 class="text-4xl font-semibold">{{ currentCourse.name }}</h1>
          <h3 class="text-lg">Period {{ currentCourse.period }}</h3>
          <h3 class="text-xl">{{ currentCourse.teacher }}</h3>
        </div>

        <div class="mt-5 flex w-full flex-col items-center justify-center gap-4">
          <StudentFilters
            :assignments="currentCourse.assignments.filter((a) => 'assignment' in a)"
            :deselect="deselectFilters"
            @filteredAssignments="(filteredAssignments) => (assignments = filteredAssignments)"
            @refresh="loadAssignments(true)"
          />

          <div class="loading-div flex h-36 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-color)] p-6" v-if="!loaded"></div>
          <StudentAssignmentCard
            v-else-if="loaded && assignments.length > 0"
            v-for="assignment in assignments"
            :key="assignment.id"
            @click="router.push(`/student/course/${currentCourse.id}/${assignment.id}`)"
            :assignment="assignment"
            clickable
          />

          <div id="no-assignments" v-else-if="loaded && assignments.length === 0" class="flex flex-col items-center justify-center overflow-visible p-8 text-center text-gray-accent">
            <img src="https://cdn-icons-png.flaticon.com/512/109/109613.png" alt="No assignments icon" class="mb-4 h-16 w-16 dark:invert" />
            <h3 class="mb-2 text-2xl font-semibold">No Assignments Yet</h3>
            <p class="text-lg">You're all caught up!</p>
            <p class="mt-2 text-sm">Check back later for new assignments.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { a } from "vitest/dist/chunks/suite.B2jumIFP.js";

definePageMeta({
  layout: "student",
  middleware: "auth",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const deselectFilters = ref(false);

const { courses, currentCourse, initComplete } = storeToRefs(userStore);
const assignments = ref<newStudentAssignment[]>(currentCourse.value.assignments.filter((a) => "assignment" in a));

console.log(currentCourse.value?.assignments.filter((a) => "assignment" in a));

const loaded = ref(false);

onMounted(() => {
  getCourse();
});

userStore.$subscribe(async () => {
  getCourse();
});

function getCourse() {
  if (!initComplete.value) return;
  const courseCode = Number(route.params.courseCode);

  currentCourse.value = courses.value.find((course) => course.id === courseCode);
  if (!currentCourse.value) return router.push(`/student/dashboard?course=${courseCode}`);

  loadAssignments();
}

let ran = false;
async function loadAssignments(redirect = false) {
  if (!currentCourse.value || (ran && !redirect)) return;
  ran = true;
  assignments.value = (await getAssignments(Number(route.params.courseCode))) as newStudentAssignment[];
  currentCourse.value.assignments = assignments.value;
  loaded.value = true;
}

// for vitest
defineExpose({ loaded, courses, currentCourse, initComplete, assignments });
</script>

<style scoped>
@keyframes shift {
  0% {
    background-position-x: -100%;
  }

  100% {
    background-position-x: 100%;
  }
}

.loading-div {
  background-image: linear-gradient(to right, var(--gray), var(--bg-color), var(--gray));
  background-size: 200% 100%;
  animation: shift 1.5s infinite linear;
}
</style>
