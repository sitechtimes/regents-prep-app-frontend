<template>
  <div>
    <div v-if="!loaded">
      <p>loading very hard............</p>
      <!-- maybe put an animation here -->
    </div>

    <div v-else>
      <div class="w-full h-[80%] flex gap-4 p-4">
        <div class="bg-[var(--light-gray)] flex-1 flex flex-col items-center border-2 border-[var(--faded-bg-color)] rounded-lg p-4">
          <h3 class="font-bold text-xl pb-2">Current Assignments:</h3>
          <p class="text-center mb-4">No Current Assignments</p>
          <div v-for="assignment in currentAssignments" :key="assignment.id"
            class="border-2 border-[var(--faded-bg-color)] rounded-lg p-2 bg-[var(--light-gray)] shadow-md transition-transform duration-200 hover:scale-105 w-[100%] mb-2">
            <p class="font-medium text-center">{{ assignment.name }}</p>
            <p class="text-center">Due: {{ assignment.dueDate }}</p>
            <div class="text-center mt-2">
              <span class="font-semibold mr-1">Class Submissions:</span>
              <div class="border border-gray-400 rounded-full px-2 py-1 inline-block mt-1"> {{
                assignment.submissionsCount }}/{{ assignment.totalStudents }} Students </div>
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col items-center border-2 border-[var(--faded-bg-color)] rounded-lg p-4">
          <h3 class="font-bold text-xl pb-2">Past Assignments:</h3>
          <p class="text-center mb-4">No Past Assignments</p>
          <div v-for="assignment in pastAssignments" :key="assignment.id"
            class="border-2 border-[var(--faded-bg-color)] rounded-lg p-2 bg-[var(--light-gray)] shadow-md transition-transform duration-200 hover:scale-105 w-[100%] mb-2">
            <p class="font-medium text-center">{{ assignment.name }}</p>
            <p class="text-center">Submitted: {{ assignment.submissionDate }}</p>
            <div class="text-center mt-2">
              <span class=" mr-1">Class Submissions:</span>
              <div class="border border-gray-400 rounded-full px-2 py-1 inline-block mt-1"> {{
                assignment.submissionsCount }}/{{ assignment.totalStudents }} Students </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex gap-4 p-4">
      <div  class="flex-1 border-2 border-[var(--faded-bg-color)] rounded-lg p-4 bg-[var(--light-gray)] shadow-lg transition-transform duration-300 ease-in-out">
        <h3 class="font-bold text-xl pb-2 text-center ">View Student List</h3>
      </div>

      <div  class="text-center flex-1 border-2 border-[var(--faded-bg-color)] rounded-lg p-4 bg-[var(--light-gray)] shadow-lg transition-transform duration-300 ease-in-out">
        <h3 class="font-bold text-xl pb-2 text-center ">Assign Student Homework</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: ["auth", "remove-course"],
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const { courses } = storeToRefs(store);

const showNotFound = ref(false);
const loaded = ref(false);

const currentAssignments = [
  {
    id: 1,
    name: "Math Homework",
    dueDate: "2024-10-30",
    submissionsCount: 5,
    totalStudents: 10,
  },
  {
    id: 2,
    name: "Math Homework",
    dueDate: "2024-10-30",
    submissionsCount: 5,
    totalStudents: 10,
  },
  {
    id: 3,
    name: "Math Homework",
    dueDate: "2024-10-30",
    submissionsCount: 5,
    totalStudents: 10,
  },
  {
    id: 4,
    name: "Math Homework",
    dueDate: "2024-10-30",
    submissionsCount: 5,
    totalStudents: 10,
  },
];

const pastAssignments = [
  {
    id: 1,
    name: "Science Project",
    submissionDate: "2024-09-30",
    submissionsCount: 8,
    totalStudents: 10,
  },
  {
    id: 1,
    name: "Science Project",
    submissionDate: "2024-09-30",
    submissionsCount: 8,
    totalStudents: 10,
  },
  {
    id: 1,
    name: "Science Project",
    submissionDate: "2024-09-30",
    submissionsCount: 8,
    totalStudents: 10,
  },
  {
    id: 1,
    name: "Science Project",
    submissionDate: "2024-09-30",
    submissionsCount: 8,
    totalStudents: 10,
  },
];

onMounted(() => {
  loaded.value = true;
});
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
