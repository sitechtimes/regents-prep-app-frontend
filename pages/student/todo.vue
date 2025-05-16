<template>
  <div v-if="!loaded" class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start"></div>
  <div v-else class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start" @click="deselectFilters = true">
    <StudentTodoToolbar :close-toolbar="deselectFilters" @sort="(sorter) => (currentSorter = sorter)" @filter="(filter) => (currentFilters = filter)" @search="(term) => (currentSearch = term)" />

    <div v-if="filteredAssignments" class="mt-5 flex w-4/5 flex-col items-center justify-center gap-4 sm:w-[90%] md:w-[80%]">
      <div v-for="assignment in filteredAssignments" :key="assignment.id" class="flex h-full w-full items-center justify-center gap-2">
        <NuxtLink
          :to="`/student/course/${assignment.assignment.course?.id}`"
          class="h-32 w-2 rounded-full sm:h-20"
          :title="assignment.assignment.course?.name"
          :style="{
            backgroundColor: subjectColors[assignment.assignment.course?.subject ?? 'Math']
          }"
        />
        <StudentAssignmentCard :assignment="assignment" />
      </div>
    </div>
    <button v-if="showScrollToTop" class="fixed bottom-6 right-6 z-10 rounded-lg bg-gray-200 px-4 py-2 text-lg shadow-lg" type="button" @click="scrollToTop">↑</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  requiresAuth: true,
  redirectIfAuth: false
});
const route = useRoute();
const userStore = useUserStore();
const { studentCourses, studentCurrentCourse } = storeToRefs(userStore);

useSeoMeta({
  title: () => "All Assignments"
});

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

const assignments = ref<StudentAssignment[]>();
const filteredAssignments = computed(() => {
  if (!currentFilters.value || !currentSorter.value) return;
  const filters = currentFilters.value;
  const sorter = currentSorter.value;
  const search = currentSearch.value;
  const displayedAssignments = assignments.value
    ?.filter(filters)
    .filter((assignment) => assignment.assignment?.name.toLowerCase().includes(search.toLowerCase()))
    .sort(sorter);

  if (route.query.class?.length) return displayedAssignments?.filter((assignment) => route.query.class?.includes(String(assignment.assignment.course?.id)));
  return displayedAssignments;
});
const showScrollToTop = ref(false);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function checkScroll() {
  const pageHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const scrollTop = window.scrollY;

  if (pageHeight > viewportHeight * 2 && scrollTop > viewportHeight / 2) {
    showScrollToTop.value = true;
  } else {
    showScrollToTop.value = false;
  }
}

onMounted(async () => {
  const { data, error } = await tryRequestEndpoint<StudentAssignment[]>("courses/0/assignments/");
  if (error) return console.error(error);

  assignmentToDate(data);
  assignments.value = data;

  studentCurrentCourse.value = undefined;
  loaded.value = true;
  window.addEventListener("scroll", checkScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScroll);
});

// for vitest
defineExpose({ studentCourses, loaded, deselectFilters, assignments, filteredAssignments });
</script>

<style scoped></style>
