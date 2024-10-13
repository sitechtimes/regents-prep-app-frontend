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
          <div
            class="assignment w-full p-6 rounded-2xl cursor-pointer flex items-center justify-center gap-2 border-2 border-gray-accent"
            @click="router.push(`/student/course/${currentCourse.id}/${assignment.id}`)"
            v-for="assignment in currentCourse.assignments"
          >
            <div class="flex flex-col items-start justify-start w-1/2">
              <h3 class="text-2xl font-semibold overflow-hidden overflow-ellipsis w-full text-nowrap">{{ assignment.name }}</h3>
              <p>Assigned {{ formatDate(assignment.assigned, currentTime) }}</p>
              <p>Due {{ formatDate(assignment.due, currentTime) }}</p>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 w-1/2" v-if="assignment.type === 'student'">
              <p class="text-xl font-medium">{{ assignment.questionsCompleted }}/{{ assignment.questionsLength }}</p>
              <div class="w-full h-4 bg-gray-800 rounded-full">
                <div class="min-w-[5%] h-full bg-green-500 rounded-full" :style="{ width: (assignment.questionsCompleted / assignment.questionsLength) * 100 + '%' }"></div>
              </div>
            </div>
          </div>
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
const currentTime = ref(new Date());

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

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .assignment:hover {
    @apply bg-gray-accent duration-200;
  }
}
</style>
