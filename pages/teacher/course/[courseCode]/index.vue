<template>
  <div v-if="loaded && teacherCurrentCourse" class="flex w-full flex-col items-start justify-start gap-5 p-4 px-64">
    <div class="flex w-full flex-col items-end justify-center gap-4">
      <div class="flex h-52 w-full flex-col items-start justify-end rounded-2xl p-6" :style="{ backgroundColor: subjectColors[teacherCurrentCourse.subject] }">
        <h1 class="text-4xl font-semibold">{{ teacherCurrentCourse.name }}</h1>
        <h3 class="text-xl">Period {{ teacherCurrentCourse.period }}</h3>
      </div>

      <div class="flex items-center justify-center gap-4">
        <NuxtLink
          class="flex h-9 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white p-0 transition duration-500 hover:border-neutral-400 lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-700"
          :to="`/teacher/course/${teacherCurrentCourse.id}/roster`"
        >
          <img class="size-5 transition duration-500 dark:invert" src="/ui/users.svg" aria-hidden="true" />
          <p class="hidden grow translate-y-px transition duration-500 lg:block">View Students</p>
        </NuxtLink>
        <NuxtLink
          class="flex h-9 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white p-0 transition duration-500 hover:border-neutral-400 lg:justify-start lg:p-2 lg:px-4 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-700"
          :to="`/teacher/course/${teacherCurrentCourse.id}/create-assignment`"
        >
          <img class="size-5 transition duration-500 dark:invert" src="/ui/plus.svg" aria-hidden="true" />
          <p class="hidden grow translate-y-px transition duration-500 lg:block">New Assignment</p>
        </NuxtLink>
      </div>
    </div>

    <div class="flex w-full items-start justify-start border-b border-neutral-300">
      <button
        class="translate-y-0.5 border-b-4 p-2 px-8 text-2xl font-semibold transition"
        :class="{ 'text-neutral-500 grayscale hover:grayscale-[.66]': currentTab === 'past' }"
        :style="{ borderColor: subjectColors[teacherCurrentCourse.subject] }"
        type="button"
        @click="currentTab = 'current'"
      >
        Current
      </button>
      <button
        class="translate-y-0.5 border-b-4 p-2 px-8 text-2xl font-semibold transition"
        :class="{ 'text-neutral-500 grayscale hover:grayscale-[.66]': currentTab === 'current' }"
        :style="{ borderColor: subjectColors[teacherCurrentCourse.subject] }"
        type="button"
        @click="currentTab = 'past'"
      >
        Past
      </button>
    </div>

    <div class="mt-5 flex w-full flex-wrap items-center justify-center gap-4">
      <TeacherAssignmentCard v-for="assignment in filteredAssignments" :key="assignment.id" :course="teacherCurrentCourse" :assignment="assignment" :current-date="currentDate" />
      <p v-if="!filteredAssignments?.length" class="mb-4 text-center">No {{ currentTab }} assignments</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course"
});

const userStore = useUserStore();
const { teacherCourses, teacherCurrentCourse } = storeToRefs(userStore);

const currentDate = new Date();
const currentTab = ref<"current" | "past">("current");

const loaded = ref(false);
const assignments = computed(() => teacherCurrentCourse.value?.assignments);
const filteredAssignments = computed(() =>
  assignments.value?.filter((assignment) => (currentTab.value === "current" ? new Date(assignment.dueDate) >= currentDate : new Date(assignment.dueDate) < currentDate))
);

onMounted(() => (loaded.value = true));

// for vitest
defineExpose({ teacherCourses, teacherCurrentCourse, loaded, filteredAssignments });
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
