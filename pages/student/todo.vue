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
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "student" });

const userStore = useUserStore();
const { studentCourses, studentCurrentCourse } = storeToRefs(userStore);

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

  return assignments.value
    ?.filter(filters)
    .filter((assignment) => assignment.assignment?.name.toLowerCase().includes(search.toLowerCase()))
    .sort(sorter);
});

onMounted(async () => {
  assignments.value = await getStudentTodo();
  studentCurrentCourse.value = undefined;

  loaded.value = true;
});

// for vitest
defineExpose({ studentCourses, loaded, deselectFilters, assignments, filteredAssignments });
</script>

<style scoped></style>
