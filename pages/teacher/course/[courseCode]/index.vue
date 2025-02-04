<template>
  <div v-if="loaded && teacherCurrentCourse">
    <!-- Main content container -->
    <div class="flex h-[80%] w-full gap-4 p-4">
      <!-- Current Assignments Section -->
      <div class="flex flex-1 flex-col items-center rounded-lg border border-[var(--border-color)] p-4">
        <h3 class="pb-2 text-3xl font-bold">Current Assignments:</h3>
        <div v-if="!loaded" class="loading-div h-28 w-full rounded-lg border border-[var(--border-color)] p-2 shadow-md"></div>
        <div v-else class="flex w-full flex-col items-center justify-center">
          <p v-if="!currentAssignments?.length" id="no-current-assignments" class="mb-4 text-center">No Current Assignments</p>
          <div class="flex w-full flex-col gap-4">
            <TeacherAssignmentCard
              v-for="assignment in currentAssignments"
              :key="assignment.id"
              :course="teacherCurrentCourse"
              :assignment="assignment"
              :current-date="currentDate"
              @click="router.push(`/teacher/course/${teacherCurrentCourse.id}/${assignment.id}`)"
            />
          </div>
        </div>
      </div>

      <!-- Past Assignments Section -->
      <div class="flex flex-1 flex-col items-center rounded-lg border border-[var(--border-color)] p-4">
        <h3 class="pb-2 text-3xl font-bold">Past Assignments:</h3>
        <div v-if="!loaded" class="loading-div h-28 w-full rounded-lg border border-[var(--border-color)] p-2 shadow-md"></div>
        <div v-else class="flex w-full flex-col items-center justify-center">
          <p v-if="!pastAssignments?.length" id="no-past-assignments" class="mb-4 text-center">No Past Assignments</p>
          <div class="flex w-full flex-col gap-4">
            <TeacherAssignmentCard
              v-for="assignment in pastAssignments"
              :key="assignment.id"
              :course="teacherCurrentCourse"
              :assignment="assignment"
              :current-date="currentDate"
              @click="router.push(`/teacher/course/${teacherCurrentCourse.id}/${assignment.id}`)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex w-full gap-4 p-4">
      <NuxtLink
        :to="`/teacher/course/${teacherCurrentCourse.id}/roster`"
        class="flex w-1/2 items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-2 text-2xl text-[var(--text-color)] transition-all duration-300 ease-in-out hover:brightness-[0.85] hover:dark:brightness-125"
      >
        <p>View Student List</p>
      </NuxtLink>
      <NuxtLink
        :to="`/teacher/course/${teacherCurrentCourse.id}/create-assignment`"
        class="flex w-1/2 items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-2 text-2xl text-[var(--text-color)] transition-all duration-300 ease-in-out hover:brightness-[0.85] hover:dark:brightness-125"
      >
        <p>Assign Student Homework</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course",
  requiresAuth: true
});

const router = useRouter();
const userStore = useUserStore();
const { teacherCourses, teacherCurrentCourse } = storeToRefs(userStore);
const currentDate = ref(new Date());

const loaded = ref(false);
const assignments = computed(() => teacherCurrentCourse.value?.assignments);
const currentAssignments = computed(() => assignments.value?.filter((assignment) => new Date(assignment.dueDate) >= currentDate.value));
const pastAssignments = computed(() => assignments.value?.filter((assignment) => new Date(assignment.dueDate) < currentDate.value));

onMounted(() => (loaded.value = true));

// for vitest
defineExpose({ teacherCourses, teacherCurrentCourse, loaded, currentAssignments, pastAssignments });
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
