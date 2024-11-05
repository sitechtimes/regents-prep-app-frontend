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
          <StudentFilters :assignments="assignments" :deselect="deselectFilters" @filteredAssignments="(a) => (assignments = a)" @refresh="loadAssignments" />

          <StudentAssignmentCard
            v-if="assignments.length > 0"
            v-for="assignment in assignments"
            :key="assignment.id"
            @click="router.push(`/student/course/${currentCourse.id}/${assignment.id}`)"
            :assignment="assignment"
            clickable
          />

          <div id="no-assignments" v-else>
            <p>no assignments!!!!</p>
            <p>for now................................</p>
          </div>
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
watch(deselectFilters, () => {
  if (deselectFilters.value) deselectFilters.value = false;
});

const { courses, currentCourse, initComplete } = storeToRefs(userStore);
const assignments = ref<StudentAssignment[]>(currentCourse.value?.assignments.filter((a) => "instanceInfo" in a) ?? []);

const loaded = ref(false);

onMounted(() => {
  if (!initComplete.value) return;

  currentCourse.value = courses.value.find((c) => c.id === Number(route.params.courseCode));
  if (!currentCourse.value) return router.push(`/student/dashboard?course=${route.params.courseCode}`);

  loadAssignments();
});

userStore.$subscribe(async () => {
  if (!initComplete.value) return;

  const findCourse = courses.value.find((c) => c.id === Number(route.params.courseCode));
  if (!findCourse) return router.push(`/student/dashboard?course=${route.params.courseCode}`);

  currentCourse.value = findCourse;
  loadAssignments();
});

async function loadAssignments() {
  assignments.value = (await getAssignments(Number(route.params.courseCode))) as StudentAssignment[];
  loaded.value = true;
}

// for vitest
defineExpose({ loaded, courses, currentCourse, initComplete, assignments });
</script>

<style scoped></style>
