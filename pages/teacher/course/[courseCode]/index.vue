<template>
  <div>
    <div v-if="!loaded">
      <p>loading very hard............</p>
    </div>

    <div v-else>
      <div class="w-full h-[80%] flex gap-4 p-4">
        
        <!-- Current Assignments Section -->
        <div class="bg-[var(--light-gray)] flex-1 flex flex-col items-center border-2 border-[var(--faded-bg-color)] rounded-lg p-4">
          <h3 class="font-bold text-xl pb-2">Current Assignments:</h3>
          <p class="text-center mb-4" v-if="!currentAssignments.length">No Current Assignments</p>
          <div class="w-full flex flex-col gap-4">
            <div v-for="assignment in currentAssignments" :key="assignment.id" 
                 class="border-2 border-[var(--faded-bg-color)] rounded-lg p-2 bg-[var(--light-gray)] shadow-md transition-transform duration-200 hover:scale-105 w-[100%] mb-2">
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
        <div class="flex-1 flex flex-col items-center border-2 border-[var(--faded-bg-color)] rounded-lg p-4">
          <h3 class="font-bold text-xl pb-2">Past Assignments:</h3>
          <p class="text-center mb-4" v-if="!pastAssignments.length">No Past Assignments</p>
          <div class="w-full flex flex-col gap-4">
            <div v-for="assignment in pastAssignments" :key="assignment.id" class="border-2 border-[var(--faded-bg-color)] rounded-lg p-2 bg-[var(--light-gray)] shadow-md transition-transform duration-200 hover:scale-105 w-[100%] mb-2">
              <p class="font-medium text-center">{{ assignment.name }}</p>
              <p class="text-center">Submitted: {{ formatDate(assignment.dueDate, currentDate) }}</p>
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
    </div>

    <div class="w-full flex gap-4 p-4">
      <button class="justify-center w-[50%] flex items-center bg-green-accent text-black text-2xl font-semibold px-6 py-2 rounded-full transition-transform duration-300 ease-in-out">
        <h3>View Student List</h3>
      </button>

      <button class="justify-center w-[50%] flex items-center bg-green-accent text-black text-2xl font-semibold px-6 py-2 rounded-full transition-transform duration-300 ease-in-out">
        <h3>Assign Student Homework</h3>
      </button>
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

// Filter current and past assignments based on dueDate
const currentAssignments = ref<TeacherAssignment[]>(
  (currentCourse.value?.assignments.filter((a) => new Date(a.dueDate) >= currentDate.value) as TeacherAssignment[]) ?? []
);

const pastAssignments = ref<TeacherAssignment[]>(
  (currentCourse.value?.assignments.filter((a) => new Date(a.dueDate) < currentDate.value) as TeacherAssignment[]) ?? []
);

userStore.$subscribe(async (mutation, state) => {
  console.log('Mutation:', mutation);
  console.log('State:', state);
  if (!userStore.initComplete) return;
  console.log('User store initComplete:', userStore.initComplete);
  
  let findCourse = courses.value.find((c) => c.id === Number(route.params.courseCode));
  console.log('Found Course:', findCourse);

  if (!findCourse) return router.push(`/teacher/dashboard?course=${route.params.courseCode}`);
  currentCourse.value = findCourse;
  console.log('Course Code:', route.params.courseCode);
  
  currentAssignments.value = (currentCourse.value?.assignments.filter((a) => new Date(a.dueDate) >= currentDate.value) as TeacherAssignment[]) ?? [];
  pastAssignments.value = (currentCourse.value?.assignments.filter((a) => new Date(a.dueDate) < currentDate.value) as TeacherAssignment[]) ?? [];

  loaded.value = true;
});

onMounted(async() => {
  loaded.value = true;
  await getAssignments();
});
async function getAssignments(){
  loaded.value = false;
  loaded.value = true;
}
</script>

<style scoped>
.opacity-enter-active,
.opacity-leave-active {
  transition: 0.25s ease;
}
.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>