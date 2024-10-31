<template>
  <div class="flex flex-col items-center justify-start w-full h-full min-h-[calc(100vh-6rem)]" @click="deselectFilters = true">
    <div v-if="!loaded">
      <p>loading...............................</p>
      <!-- maybe put an animation here -->
    </div>

    <div class="w-full flex items-center justify-center" v-else>
      <div class="w-2/3 flex flex-col items-center justify-center" v-if="currentCourse">
        <div class="flex flex-col items-start justify-end w-full h-52 p-6 rounded-2xl" :style="{ backgroundColor: subjectColors[currentCourse.subject] }">
          <h1 class="text-4xl font-semibold">{{ currentCourse.name }}</h1>
          <h3 class="text-lg">Period {{ currentCourse.period }}</h3>
          <h3 class="text-xl">{{ currentCourse.teacher }}</h3>
        </div>

        <div class="w-full flex flex-col items-center justify-center gap-4 mt-5">
          <StudentFilters :assignments="assignments" :deselect="deselectFilters" @filteredAssignments="(a) => (assignments = a)" @refresh="getAssignments" />

          <StudentAssignmentCard
            v-for="assignment in assignments"
            :key="assignment.id"
            @click="router.push(`/student/course/${currentCourse.id}/${assignment.id}`)"
            :assignment="assignment"
            clickable
          />
        </div>
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
const userStore = useUserStore();

const deselectFilters = ref(false);
watch(deselectFilters, async () => {
  await delay(50);
  deselectFilters.value = false;
});

const { courses, currentCourse } = storeToRefs(userStore);
const assignments = ref<StudentAssignment[]>(currentCourse.value?.assignments.filter((a) => "instanceInfo" in a) ?? []);

const loaded = ref(false);
userStore.$subscribe(async (mutation, state) => {
  if (!userStore.initComplete) return;
  let findCourse = courses.value.find((c) => c.id === Number(route.params.courseCode));
  if (!findCourse) return router.push(`/student/dashboard?course=${route.params.courseCode}`);
  currentCourse.value = findCourse;
  loaded.value = true;
  await getAssignments();
});
onMounted(() => {
  if (!userStore.initComplete) return;
  currentCourse.value = courses.value.find((c) => c.id === Number(route.params.courseCode));
  loaded.value = true;
});
async function getAssignments() {
  loaded.value = false;
  /* fetch the rest of the course assignments
  and add it to currentcourse.assignments
  and then find the course in courses and add it to that */
  loaded.value = true;
}
</script>

<style scoped></style>
