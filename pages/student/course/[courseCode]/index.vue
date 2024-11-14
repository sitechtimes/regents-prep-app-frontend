<template>
  <div class="flex flex-col items-center justify-start w-full h-full min-h-[calc(100vh-6rem)]">
    <div class="w-full flex items-center justify-center">
      <div class="w-2/3 flex flex-col items-center justify-center" v-if="currentCourse">
        <div class="flex flex-col items-start justify-end w-full h-52 p-6 rounded-2xl" :style="{ backgroundColor: subjectColors[currentCourse.subject] }">
          <h1 class="text-4xl font-semibold">{{ currentCourse.name }}</h1>
          <h3 class="text-lg">Period {{ currentCourse.period }}</h3>
          <h3 class="text-xl">{{ currentCourse.teacher }}</h3>
        </div>

        <div class="w-full flex flex-col items-center justify-center gap-4 mt-5">
          <StudentFilters :assignments="assignments" :deselect="deselectFilters" @filteredAssignments="(filteredAssignments) => (assignments = filteredAssignments)" @refresh="loadAssignments(true)" />

          <div class="loading-div w-full h-36 p-6 rounded-2xl flex items-center justify-center gap-2 border-2 border-gray-accent" v-if="!loaded"></div>
          <StudentAssignmentCard
            v-else-if="loaded && assignments.length > 0"
            v-for="assignment in assignments"
            :key="assignment.id"
            @click="router.push(`/student/course/${currentCourse.id}/${assignment.id}`)"
            :assignment="assignment"
            clickable
          />

          <div id="no-assignments" v-else-if="loaded && assignments.length === 0">
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
  middleware: "auth",
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
  getCourse();
});

userStore.$subscribe(async () => {
  getCourse();
});

function getCourse() {
  if (!initComplete.value) return;
  const courseCode = Number(route.params.courseCode);

  currentCourse.value = courses.value.find((course) => course.id === courseCode);
  if (!currentCourse.value) return router.push(`/student/dashboard?course=${courseCode}`);

  loadAssignments();
}

let ran = false;
async function loadAssignments(redirect = false) {
  if (ran && !redirect) return;
  ran = true;
  assignments.value = (await getAssignments(Number(route.params.courseCode))) as StudentAssignment[];
  loaded.value = true;
}

// for vitest
defineExpose({ loaded, courses, currentCourse, initComplete, assignments });
</script>

<style scoped>
@keyframes shift {
  0% {
    background-position-x: -100%;
  }
  100% {
    background-position-x: 100%;
  }
}

.loading-div {
  background-image: linear-gradient(to right, var(--gray), var(--bg-color), var(--gray));
  background-size: 200% 100%;
  animation: shift 1.5s infinite linear;
}
</style>
