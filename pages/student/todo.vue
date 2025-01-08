<template>
  <div class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start" @click="deselectFilters = true">
    <div class="flex w-2/3 flex-col items-center justify-center">
      <StudentFilters
        :assignments="(userStore.courses.filter((course) => course.assignments.some((assignment) => 'instanceInfo' in assignment)) as StudentCourse[]).map((course) => course.assignments).flat()"
        :deselect="deselectFilters"
        @filteredAssignments="(filteredAssignments) => (assignments = filteredAssignments)"
      />
    </div>

    <Loading :show="!loaded" />

    <div class="flex w-2/3 flex-col items-center justify-center" v-if="loaded">
      <div class="mt-5 flex w-full flex-col items-center justify-center gap-4">
        <div class="flex h-full w-full items-center justify-center gap-2" v-for="assignment in assignments" :key="assignment.id">
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

const deselectFilters = ref(false);
watch(deselectFilters, async () => {
  await nextTick();
  deselectFilters.value = false;
});

const assignments = ref<StudentAssignment[]>();

function findCourse(findAssignment: StudentAssignment) {
  return userStore.courses.find((course) => course.assignments.some((assignment) => assignment.id === findAssignment.id && "assignment" in assignment));
}

const loaded = ref(false);

onMounted(async () => {
  assignments.value = await getStudentTodo();
});
</script>

<style scoped></style>
