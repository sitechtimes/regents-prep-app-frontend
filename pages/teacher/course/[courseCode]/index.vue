<template>
  <div>
    <div v-if="currentCourse">
      <!-- Main content container -->
      <div class="w-full h-[80%] flex gap-4 p-4">
        <!-- Current Assignments Section -->
        <div class="flex-1 flex flex-col items-center border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 class="font-bold text-3xl pb-2">Current Assignments:</h3>
          <div class="loading-div w-full h-28 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-md" v-if="!loaded"></div>
          <div class="flex flex-col items-center justify-center w-full" v-else>
            <p class="text-center mb-4" id="no-current-assignments" v-if="!currentAssignments.length">No Current Assignments</p>
            <div class="w-full flex flex-col gap-4">
              <TeacherAssignmentCard
                v-for="assignment in currentAssignments"
                :key="assignment.id"
                :course="currentCourse"
                :assignment="assignment"
                :current-date="currentDate"
                @click="router.push(`/teacher/course/${currentCourse.id}/${assignment.id}`)"
              />
            </div>
          </div>
        </div>

        <!-- Past Assignments Section -->
        <div class="flex-1 flex flex-col items-center border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 class="font-bold text-3xl pb-2">Past Assignments:</h3>
          <div class="loading-div w-full h-28 rounded-lg border-2 border-gray-200 dark:border-gray-900 p-2 shadow-md" v-if="!loaded"></div>
          <div class="flex flex-col items-center justify-center w-full" v-else>
            <p class="text-center mb-4" id="no-past-assignments" v-if="!pastAssignments.length">No Past Assignments</p>
            <div class="w-full flex flex-col gap-4">
              <TeacherAssignmentCard
                v-for="assignment in pastAssignments"
                :key="assignment.id"
                :course="currentCourse"
                :assignment="assignment"
                :current-date="currentDate"
                @click="router.push(`/teacher/course/${currentCourse.id}/${assignment.id}`)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="w-full flex gap-4 p-4">
        <NuxtLink
          :to="`/teacher/course/${currentCourse.id}/roster`"
          class="w-1/2 flex justify-center items-center bg-green-500 text-black text-2xl font-semibold px-6 py-2 rounded-full transition-transform duration-300 ease-in-out"
        >
          <h3>View Student List</h3>
        </NuxtLink>
        <button class="w-1/2 flex justify-center items-center bg-green-500 text-black text-2xl font-semibold px-6 py-2 rounded-full transition-transform duration-300 ease-in-out">
          <h3>Assign Student Homework</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: ["auth", "add-course"],
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { courses, currentCourse, initComplete } = storeToRefs(userStore);
const currentDate = ref(new Date());

const loaded = ref(false);
const currentAssignments = ref<TeacherAssignment[]>([]);
const pastAssignments = ref<TeacherAssignment[]>([]);

onMounted(async () => {
  await getCourse();
});

userStore.$subscribe(async () => {
  await getCourse();
});

async function getCourse() {
  if (!initComplete.value) return;
  const courseId = Number(route.params.courseCode);

  currentCourse.value = courses.value.find((course) => course.id === courseId);
  if (!currentCourse.value) return router.push(`/teacher/dashboard?course=${courseId}`);

  await fetchAndSetAssignments(courseId);
}

let ran = false;
async function fetchAndSetAssignments(courseId: number, redirect = false) {
  if (ran && !redirect) return;
  ran = true;
  loaded.value = false;

  try {
    const assignments = await getAssignments(courseId);
    currentAssignments.value = assignments.filter((assignment) => new Date(assignment.dueDate) >= currentDate.value) as TeacherAssignment[];
    pastAssignments.value = assignments.filter((assignment) => new Date(assignment.dueDate) < currentDate.value) as TeacherAssignment[];
  } catch (error) {
    console.error("Error fetching assignments:", error);
    await router.push(`/teacher/dashboard?course=${courseId}`);
  } finally {
    loaded.value = true;
  }
}

// for vitest
defineExpose({ courses, currentCourse, loaded, currentAssignments, pastAssignments, initComplete });
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
