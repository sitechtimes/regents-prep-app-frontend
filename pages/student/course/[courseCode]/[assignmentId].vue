<template>
  <div class="flex flex-col items-center justify-start w-full h-full">
    <div v-if="!loaded">
      <p>loading...............................</p>
      <!-- maybe put an animation here -->
    </div>

    <div class="w-full flex items-center justify-center" v-else>
      <div v-if="!currentCourse" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <NotFound message="assignment" />
      </div>

      <div class="w-2/3 flex flex-col items-center justify-center" v-else>
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
const store = useUserStore();
const currentAssignment = ref<StudentAssignmentOverview>();
const { currentCourse } = storeToRefs(store);

const loaded = ref(false);

onBeforeMount(() => {
  const routeCode = route.params.assignmentId as string;
  currentAssignment.value = currentCourse.value?.assignments.filter((assignment) => assignment.type === "student").find((assignment) => assignment.id === Number(routeCode));

  // get assignment instance
});

onMounted(() => {
  loaded.value = true;
});
</script>

<style scoped></style>
