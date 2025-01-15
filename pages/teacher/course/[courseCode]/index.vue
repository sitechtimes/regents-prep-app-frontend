<template>
  <div>
    <div v-if="currentCourse">
      <!-- Main content container -->
      <div class="flex h-[80%] w-full gap-4 p-4">
        <!-- Current Assignments Section -->
        <div class="flex flex-1 flex-col items-center rounded-lg border border-[var(--border-color)] p-4">
          <h3 class="pb-2 text-3xl font-bold">Current Assignments:</h3>
          <div class="loading-div h-28 w-full rounded-lg border border-[var(--border-color)] p-2 shadow-md" v-if="!loaded"></div>
          <div class="flex w-full flex-col items-center justify-center" v-else>
            <p class="mb-4 text-center" id="no-current-assignments" v-if="!currentAssignments.length">No Current Assignments</p>
            <div class="flex w-full flex-col gap-4">
              <TeacherAssignmentCard
                v-for="assignment in currentAssignments"
                :key="assignment.id"
                :course="currentCourse"
                :assignment="assignment"
                :current-date="currentDate"
                @click="router.push(`/teacher/course/${currentCourse.id}/${assignment.id}`)"
              />
            </div>
          </div>
        </div>

        <!-- Past Assignments Section -->
        <div class="flex flex-1 flex-col items-center rounded-lg border border-[var(--border-color)] p-4">
          <h3 class="pb-2 text-3xl font-bold">Past Assignments:</h3>
          <div class="loading-div h-28 w-full rounded-lg border border-[var(--border-color)] p-2 shadow-md" v-if="!loaded"></div>
          <div class="flex w-full flex-col items-center justify-center" v-else>
            <p class="mb-4 text-center" id="no-past-assignments" v-if="!pastAssignments.length">No Past Assignments</p>
            <div class="flex w-full flex-col gap-4">
              <TeacherAssignmentCard
                v-for="assignment in pastAssignments"
                :key="assignment.id"
                :course="currentCourse"
                :assignment="assignment"
                :current-date="currentDate"
                @click="router.push(`/teacher/course/${currentCourse.id}/${assignment.id}`)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex w-full gap-4 p-4">
        <NuxtLink
          :to="`/teacher/course/${currentCourse.id}/roster`"
          class="flex w-1/2 items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-2 text-2xl text-[var(--text-color)] transition-all duration-300 ease-in-out hover:brightness-[0.85] hover:dark:brightness-125"
        >
          <p>View Student List</p>
        </NuxtLink>
        <button
          class="flex w-1/2 items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-2 text-2xl text-[var(--text-color)] transition-all duration-300 ease-in-out hover:brightness-[0.85] hover:dark:brightness-125"
        >
          <p>Assign Student Homework</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { courses, currentCourse, initComplete } = storeToRefs(userStore);
const currentDate = ref(new Date());

const loaded = ref(false);
const currentAssignments = ref<TeacherAssignment[]>([]);
const pastAssignments = ref<TeacherAssignment[]>([]);

onMounted(async () => {
  getCourse();
});

userStore.$subscribe(async () => {
  getCourse();
});

async function getCourse() {
  if (!initComplete.value) return;
  const courseId = Number(route.params.courseCode);

  currentCourse.value = courses.value.find((course) => course.id === courseId);
  if (!currentCourse.value) return router.push(`/teacher/dashboard?course=${courseId}`);

  await fetchAndSetAssignments(courseId);
}

let ran = false;
async function fetchAndSetAssignments(courseId: number, redirect = false) {
  if (ran && !redirect) return;
  ran = true;
  loaded.value = false;

  try {
    const assignments = await getAssignments(courseId);

    currentAssignments.value = assignments.filter((assignment) => new Date((assignment as TeacherAssignment).dueDate) >= currentDate.value) as TeacherAssignment[];
    pastAssignments.value = assignments.filter((assignment) => new Date((assignment as TeacherAssignment).dueDate) < currentDate.value) as TeacherAssignment[];
  } catch (error) {
    console.error("Error fetching assignments:", error);
    await router.push(`/teacher/dashboard?course=${courseId}`);
  } finally {
    loaded.value = true;
  }
}

// for vitest
defineExpose({ courses, currentCourse, loaded, currentAssignments, pastAssignments, initComplete });
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
