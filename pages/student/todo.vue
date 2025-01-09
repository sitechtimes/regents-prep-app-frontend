<template>
  <div class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start" v-if="!loaded"></div>
  <div class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start" @click="deselectFilters = true" v-else>
    <div class="flex w-2/3 flex-col items-center justify-center">
      <StudentTodoToolbar
        :closeToolbar="deselectFilters"
        :assignments="assignments"
        @sort="(sorter) => (currentSorter = sorter)"
        @filter="(filter) => (currentFilters = filter)"
        @search="(term) => (currentSearch = term)"
      />
    </div>

    <div class="mt-5 flex w-2/3 flex-col items-center justify-center gap-4" v-if="filteredAssignments">
      <div class="flex h-full w-full items-center justify-center gap-2" v-for="assignment in filteredAssignments" :key="assignment.id">
        <NuxtLink
          :to="`/student/course/${findCourse(assignment)?.id}`"
          class="h-20 w-2 rounded-full"
          :title="findCourse(assignment)?.name"
          :style="{
            backgroundColor: subjectColors[findCourse(assignment)?.subject ?? 'Math']
          }"
        ></NuxtLink>
        <StudentAssignmentCard
          @click="router.push(`/student/course/${courses.find((course) => course.assignments.map((assignment) => assignment.id).includes(assignment.id))?.id}/${assignment.id}`)"
          :assignment="assignment"
          clickable
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
  console.log(assignments.value);
  loaded.value = true;
});
</script>

<style scoped></style>
