<template>
  <div class="flex flex-col items-center justify-start w-full h-full min-h-[calc(100vh-6rem)]" @click="deselectFilters = true">
    <div class="w-2/3 flex flex-col items-center justify-center">
      <StudentFilters
        :assignments="
          userStore.courses
            .filter((c): c is StudentCourse => c.assignments.some((a) => 'instanceInfo' in a))
            .map((c: StudentCourse) => c.assignments.filter((a) => 'instanceInfo' in a))
            .flat()
        "
        :deselect="deselectFilters"
        @filteredAssignments="(a) => (assignments = a)"
        @refresh="getAssignments"
      />
    </div>

    <div v-if="!loaded">
      <p>loading...............................</p>
      <!-- maybe put an animation here -->
    </div>

    <div class="w-2/3 flex flex-col items-center justify-center" v-else>
      <div class="w-full flex flex-col items-center justify-center gap-4 mt-5">
        <div class="w-full h-full flex items-center justify-center gap-2" v-for="assignment in assignments" :key="assignment.id">
          <NuxtLink
            :to="`/student/course/${findCourse(assignment)?.id}`"
            class="w-2 h-20 rounded-full"
            :title="findCourse(assignment)?.name"
            :style="{
              backgroundColor: subjectColors[findCourse(assignment)?.subject ?? 'Math']
            }"
          ></NuxtLink>
          <StudentAssignmentCard
            @click="router.push(`/student/course/${courses.find((c) => c.assignments.map((a) => a.id).includes(assignment.id))?.id}/${assignment.id}`)"
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
  middleware: ["auth", "remove-course"],
  requiresAuth: true
});

const router = useRouter();
const userStore = useUserStore();

const deselectFilters = ref(false);
watch(deselectFilters, async () => {
  await delay(50);
  deselectFilters.value = false;
});

const { courses } = storeToRefs(userStore);
const assignments = ref<StudentAssignment[]>(
  courses.value
    .filter((c): c is StudentCourse => "instanceInfo" in c.assignments[0])
    .map((c: StudentCourse) => c.assignments.filter((a) => "instanceInfo" in a))
    .flat()
);

function findCourse(assignment: StudentAssignment) {
  return userStore.courses.find((c: StudentCourse | TeacherCourse) => c.assignments.some((a) => a.id === assignment.id && "instanceInfo" in a));
}

const loaded = ref(false);

onMounted(async () => {
  await getAssignments();
});

async function getAssignments() {
  loaded.value = false;
  /* fetch the rest of the course assignments
  and add it to currentcourse.assignments
  and then find the course in courses and add it to that */
  loaded.value = true;
}
</script>

<style scoped></style>
