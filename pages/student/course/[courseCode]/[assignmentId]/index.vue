<template>
  <div class="flex h-full w-full flex-col items-center justify-start">
    <Loading :show="!loaded" />

    <div class="flex w-full items-center justify-center" v-if="loaded">
      <div class="flex w-2/3 flex-col items-center justify-center" v-if="currentCourse">
        <StudentAssignmentCard v-if="currentAssignment" :assignment="currentAssignment" />

        <p>Subject Review / Assignment</p>
        <!-- placeholder text for now -->
        <button class="mt-4 rounded-lg bg-green-accent px-4 py-2 text-white transition duration-200 hover:bg-gray-600">Start</button>
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
const assignmentId = route.params.assignmentId;
const { courses, currentCourse, initComplete } = storeToRefs(userStore);

const loaded = ref(false);

onMounted(() => {
  getCourse();
  console.log(assignmentId)
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
