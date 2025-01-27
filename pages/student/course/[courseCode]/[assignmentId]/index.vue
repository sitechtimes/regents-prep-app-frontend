<template>
  <div class="flex h-full w-full flex-col items-center justify-start">
    <div v-if="studentCurrentCourse" class="flex w-2/3 flex-col items-center justify-center">
      <StudentAssignmentCard v-if="currentAssignment" :assignment="currentAssignment" />

        <NuxtLink :to="`/student/course/${courseCode}/${assignmentId}/stats`">Subject Review / Assignment</NuxtLink>
        <!-- placeholder text for now -->
        <button class="mt-4 rounded-lg bg-green-accent px-4 py-2 text-white transition duration-200 hover:bg-gray-600">Start</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "student-get-course",
  requiresAuth: true
});

const route = useRoute();
const userStore = useUserStore();
const currentAssignment = ref<StudentAssignment>();
const assignmentId = route.params.assignmentId;
const courseCode = Number(route.params.courseCode);
const { studentCurrentCourse } = storeToRefs(userStore);

function warnForUnsavedChanges(event: BeforeUnloadEvent) {
  event.preventDefault();
  // TODO: add api call to save progress
}

onMounted(() => window.addEventListener("beforeunload", warnForUnsavedChanges));
onBeforeUnmount(() => window.removeEventListener("beforeunload", warnForUnsavedChanges));
</script>

<style scoped></style>
