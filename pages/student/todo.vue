<template>
  <div v-if="!loaded" class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start"></div>
  <div v-else class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start" @click="deselectFilters = true">
    <div class="flex w-2/3 flex-col items-center justify-center">
      <StudentTodoToolbar
        :close-toolbar="deselectFilters"
        :assignments="assignments"
        @sort="(sorter) => (currentSorter = sorter)"
        @filter="(filter) => (currentFilters = filter)"
        @search="(term) => (currentSearch = term)"
      />
    </div>

    <div v-if="filteredAssignments" class="mt-5 flex w-2/3 flex-col items-center justify-center gap-4">
      <div v-for="assignment in filteredAssignments" :key="assignment.id" class="flex h-full w-full items-center justify-center gap-2">
        <NuxtLink
          :to="`/student/course/${findCourse(assignment)?.id}`"
          class="h-20 w-2 rounded-full"
          :title="findCourse(assignment)?.name"
          :style="{
            backgroundColor: subjectColors[findCourse(assignment)?.subject ?? 'Math']
          }"
        />
        <StudentAssignmentCard
          :assignment="assignment"
          clickable
          @click="router.push(`/student/course/${courses.find((course) => course.assignments.map((assignment) => assignment.id).includes(assignment.id))?.id}/${assignment.id}`)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  requiresAuth: true
});

const router = useRouter();
const userStore = useUserStore();
const { courses } = storeToRefs(userStore);

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
    .filter((assignment) => assignment.assignment.name.toLowerCase().includes(search.toLowerCase()))
    .sort(sorter);
});

function findCourse(findAssignment: StudentAssignment) {
  return userStore.courses.find((course) => course.assignments.some((assignment) => assignment.id === findAssignment.id && "assignment" in assignment));
}

onMounted(async () => {
  assignments.value = await getStudentTodo();
  loaded.value = true;
});
</script>

<style scoped></style>
