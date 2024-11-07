<template>
  <div>
    <!-- Loading screen -->
    <div v-if="!loaded" class="fixed inset-0 bg-black bg-opacity-85 flex flex-col items-center justify-center text-white z-50">
      <div class="flex space-x-3">
        <div class="w-4 h-4 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0s;"></div>
        <div class="w-4 h-4 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
        <div class="w-4 h-4 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
      </div>
      <p class="mt-4 text-2xl font-bold text-white opacity-90">Loading your content...</p>
    </div>

    <div v-else>
      <!-- Main content container -->
      <div class="w-full h-[80%] flex gap-4 p-4">
        
        <!-- Current Assignments Section -->
        <div class=" flex-1 flex flex-col items-center border-2 border-gray-200 rounded-lg p-4">
          <h3 class="font-bold text-3xl pb-2">Current Assignments:</h3>
          <p class="text-center mb-4" v-if="!currentAssignments.length">No Current Assignments</p>
          <div class="w-full flex flex-col gap-4">
            <div v-for="assignment in currentAssignments" :key="assignment.id"
              class="border-2 border-gray-200 rounded-lg p-2 bg-gray-100 shadow-md transition-transform duration-200 hover:scale-105 mb-2">
              <p class="font-medium text-center">{{ assignment.name }}</p>
              <p class="text-center">Due: {{ formatDate(assignment.dueDate, currentDate) }}</p>
              <div class="text-center mt-2">
                <span class="font-semibold mr-1">Class Submissions:</span>
                <div class="border border-gray-400 rounded-full px-2 py-1 inline-block mt-1">
                  {{ assignment.submissions }}/{{ (currentCourse as TeacherCourse).students ?? 0 }} Students
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Past Assignments Section -->
        <div class="flex-1 flex flex-col items-center border-2 border-gray-200 rounded-lg p-4">
          <h3 class="font-bold text-3xl pb-2">Past Assignments:</h3>
          <p class="text-center mb-4" v-if="!pastAssignments.length">No Past Assignments</p>
          <div class="w-full flex flex-col gap-4">
            <div v-for="assignment in pastAssignments" :key="assignment.id"
              class="border-2 border-gray-200 rounded-lg p-2 bg-gray-100 shadow-md transition-transform duration-200 hover:scale-105 mb-2">
              <p class="font-medium text-center">{{ assignment.name }}</p>
              <p class="text-center">Due: {{ formatDate(assignment.dueDate, currentDate) }}</p>
              <div class="text-center mt-2">
                <span class="mr-1">Class Submissions:</span>
                <div class="border border-gray-400 rounded-full px-2 py-1 inline-block mt-1">
                  {{ assignment.submissions }}/{{ (currentCourse as TeacherCourse).students ?? 0 }} Students
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="w-full flex gap-4 p-4">
        <button class="w-1/2 flex justify-center items-center bg-green-500 text-black text-2xl font-semibold px-6 py-2 rounded-full transition-transform duration-300 ease-in-out">
          <h3>View Student List</h3>
        </button>
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
const { courses, currentCourse } = storeToRefs(userStore);
const currentDate = ref(new Date());

const loaded = ref(false);
const currentAssignments = ref<TeacherAssignment[]>([]);
const pastAssignments = ref<TeacherAssignment[]>([]);

async function fetchAndSetAssignments(courseId: number) {
  loaded.value = false;

  try {
    const assignments = await getAssignments(courseId);
    currentAssignments.value = assignments.filter((a) => new Date(a.dueDate) >= currentDate.value) as TeacherAssignment[];
    pastAssignments.value = assignments.filter((a) => new Date(a.dueDate) < currentDate.value) as TeacherAssignment[];
  } catch (error) {
    console.error("Error fetching assignments:", error);
    await router.push(`/teacher/dashboard?course=${courseId}`);
  } finally {
    setTimeout(() => {
      loaded.value = true;
    }, 250);
  }
}

userStore.$subscribe(async (mutation, state) => {
  if (!userStore.initComplete) return;

  const courseId = Number(route.params.courseCode);
  let findCourse = courses.value.find((c) => c.id === courseId);

  if (!findCourse) return router.push(`/teacher/dashboard?course=${courseId}`);

  currentCourse.value = findCourse;

  await fetchAndSetAssignments(courseId);
});

onMounted(async () => {
  const courseId = Number(route.params.courseCode);
  await fetchAndSetAssignments(courseId);
});
</script>