<template>
  <div class="flex flex-col items-center justify-start w-full h-full">
    <div v-if="!loaded">
      <p>loading...............................</p>
      <!-- maybe put an animation here -->
    </div>

    <div class="w-full flex items-center justify-center" v-else>
      <div v-if="!currentCourse">
        <h1>this class doesnt exist L</h1>
        <NuxtLink to="/student/dashboard">go back</NuxtLink>
      </div>

      <div class="w-2/3 flex flex-col items-center justify-center" v-else>
        <div class="flex flex-col items-start justify-end w-full h-52 p-6 rounded-2xl" :style="{ backgroundColor: subjectColors[currentCourse.subject] }">
          <h1 class="text-4xl font-semibold">{{ currentCourse.name }}</h1>
          <h3 class="text-lg">Period {{ currentCourse.period }}</h3>
          <h3 class="text-xl">{{ currentCourse.teacher }}</h3>
        </div>

        <div class="w-full flex flex-col items-center justify-center gap-4 mt-5">
          <StudentAssignmentCard
            v-for="assignment in currentCourse.assignments.filter((assignment) => assignment.type === 'student').sort((a, b) => a.assigned.getTime() - b.assigned.getTime())"
            @click="router.push(`/student/course/${currentCourse.id}/${assignment.id}`)"
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
  middleware: ["auth", "add-course"],
  requiresAuth: true
});

const router = useRouter();
const store = useUserStore();

const { courses, currentCourse } = storeToRefs(store);

const loaded = ref(false);

onBeforeMount(() => {
  // fetch the rest of the course assignments
  // and add it to currentcourse.assignments
  // and then find the course in courses and add it to that
});

onMounted(() => {
  loaded.value = true;
});
</script>

<style scoped></style>
