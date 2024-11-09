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
  currentAssignment.value = currentCourse.value?.assignments.find((assignment) => assignment.id === Number(routeCode) && "instanceInfo" in assignment) as StudentAssignment;
  console.log(currentCourse.value);
});

onMounted(() => {
  if (!currentAssignment.value) return router.push(`/student/dashboard?assignment=${route.params.assignmentId}`);
  loaded.value = true;
});
</script>

<style scoped></style>
