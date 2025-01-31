<template>
  <div class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start" @click="deselectFilters = !deselectFilters">
    <div v-if="loaded" class="flex w-full items-center justify-center">
      <div v-if="studentCurrentCourse" class="flex flex-col items-center justify-center">
        <div class="flex h-52 w-full flex-col items-start justify-end rounded-2xl p-6" :style="{ backgroundColor: subjectColors[studentCurrentCourse.subject] }">
          <h1 class="text-4xl font-semibold">{{ studentCurrentCourse.name }}</h1>
          <h3 class="text-lg">Period {{ studentCurrentCourse.period }}</h3>
          <h3 class="text-xl">{{ studentCurrentCourse.teacher }}</h3>
        </div>

        <div class="mt-5 flex w-full flex-col items-center justify-center gap-4">
          <StudentTodoToolbar
            :close-toolbar="deselectFilters"
            :assignments="assignments"
            @sort="(sorter) => (currentSorter = sorter)"
            @filter="(filter) => (currentFilters = filter)"
            @search="(term) => (currentSearch = term)"
          />

          <div v-if="!assignments" class="loading-div flex h-36 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-color)] p-6"></div>
          <StudentAssignmentCard
            v-for="assignment in assignments"
            v-else-if="assignments.length > 0"
            :key="assignment.id"
            :assignment="assignment"
            clickable
            @click="router.push(`/student/course/${studentCurrentCourse.id}/${assignment.id}`)"
          />

          <div v-else-if="assignments.length === 0" id="no-assignments" class="flex flex-col items-center justify-center overflow-visible p-8 text-center text-gray-accent">
            <img src="https://cdn-icons-png.flaticon.com/512/109/109613.png" alt="No assignments icon" class="mb-4 h-16 w-16 dark:invert" />
            <h3 class="mb-2 text-2xl font-semibold">No Assignments Yet</h3>
            <p class="text-lg">You're all caught up!</p>
            <p class="mt-2 text-sm">Check back later for new assignments.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { studentCurrentCourse } = storeToRefs(userStore);

definePageMeta({
  layout: "student",
  middleware: "student-get-course",
  requiresAuth: true
});

useSeoMeta({
  title: () => studentCurrentCourse.value?.name ?? "Class Details"
});

const router = useRouter();

const loaded = ref(false);

const currentFilters = ref<TodoFilter>();
const currentSorter = ref<TodoSorter>();
const currentSearch = ref("");
const deselectFilters = ref(false);
watch(deselectFilters, async (val) => {
  if (!val) return;
  await nextTick();
  deselectFilters.value = false;
});

const assignments = computed(() => {
  if (!currentFilters.value || !currentSorter.value) return;
  const filters = currentFilters.value;
  const sorter = currentSorter.value;
  const search = currentSearch.value;

  return studentCurrentCourse.value?.assignments
    .filter(filters)
    .filter((assignment) => assignment.assignment.name.toLowerCase().includes(search.toLowerCase()))
    .sort(sorter);
});

onMounted(() => (loaded.value = true));

// for vitest
defineExpose({ loaded, studentCurrentCourse, currentFilters, currentSorter, currentSearch, assignments });
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
