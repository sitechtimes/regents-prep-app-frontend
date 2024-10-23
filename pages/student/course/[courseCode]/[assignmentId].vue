<template>
  <div class="flex flex-col items-center justify-start w-full h-full">
    <div v-if="!loaded">
      <p>loading...............................</p>
      <!-- maybe put an animation here -->
    </div>

    <div class="w-full flex items-center justify-center" v-else>
      <div class="w-2/3 flex flex-col items-center justify-center" v-if="currentCourse">
        <StudentAssignmentCard v-if="currentAssignment" :assignment="currentAssignment" />

        <p>description of assignment</p>
        <p>late submissions?</p>
        <button>start</button>
      </div>
    </div>
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
const currentAssignment = ref<StudentAssignment>();
const { currentCourse } = storeToRefs(store);

const loaded = ref(false);

onBeforeMount(() => {
  const routeCode = route.params.assignmentId as string;
  currentAssignment.value = currentCourse.value?.assignments
    .filter((assignment: StudentAssignment) => assignment.instanceInfo)
    .find((assignment: StudentAssignment) => assignment.id === Number(routeCode));

  // get assignment instance
});

onMounted(() => {
  if (!currentAssignment.value) return router.push(`/student/dashboard?assignment=${route.params.assignmentId}`);
  loaded.value = true;
});
</script>

<style scoped></style>
