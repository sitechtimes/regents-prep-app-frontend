<template>
  <div class="flex flex-col items-center justify-start w-full h-full">
    <Loading :show="!loaded" />

    <div class="w-full flex items-center justify-center" v-if="loaded">
      <div class="w-2/3 flex flex-col items-center justify-center" v-if="currentCourse">
        <StudentAssignmentCard v-if="currentAssignment" :assignment="currentAssignment" />

        <p>Subject Review / Assignment</p>
        <!-- placeholder text for now -->
        <button class="mt-4 px-4 py-2 bg-green-accent text-white rounded-lg hover:bg-gray-600 transition duration-200">Start</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "auth",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const currentAssignment = ref<StudentAssignment>();
const { courses, currentCourse, initComplete } = storeToRefs(userStore);

const loaded = ref(false);

onMounted(() => {
  getCourse();
});

userStore.$subscribe(async () => {
  getCourse();
});

function getCourse() {
  if (!initComplete.value) return;

  const routeCode = route.params.assignmentId as string;
  const courseCode = Number(route.params.courseCode);
  currentCourse.value = courses.value.find((course) => course.id === courseCode);
  currentAssignment.value = currentCourse.value?.assignments.find((assignment) => assignment.id === Number(routeCode) && "instanceInfo" in assignment) as StudentAssignment;

  if (!currentCourse.value) return router.push(`/student/dashboard?course=${courseCode}`);
  if (!currentAssignment.value) return router.push(`/student/dashboard?assignment=${routeCode}`);
  loaded.value = true;
}
</script>

<style scoped></style>
