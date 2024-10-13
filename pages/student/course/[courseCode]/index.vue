<template>
  <div class="flex flex-col items-center justify-start w-screen min-h-screen">
    <div v-if="!loaded">
      <p>loading...............................</p>
      <!-- maybe put an animation here -->
    </div>

    <div v-else>
      <div v-if="!currentCourse">
        <h1>this class doesnt exist L</h1>
        <NuxtLink to="/student/dashboard">go back</NuxtLink>
      </div>

      <div v-else>
        <div class="flex flex-col items-center justify-start gap-2">
          <h1 class="text-4xl">{{ currentCourse.name }}</h1>
          <h3 class="text-lg">Period {{ currentCourse.period }}</h3>
          <h3 class="text-xl">{{ currentCourse.teacher }}</h3>
        </div>

        <div class="flex flex-col items-center justify-center gap-4">
          <div v-for="assignment in currentCourse.assignments">
            <p>due {{ formatDate(assignment.due, currentTime) }}</p>
            <p>{{ assignment.questionsCompleted }}/{{ assignment.questionsLength }}</p>
            <div class="w-full h-3 bg-gray-600 rounded-full">
              <div class="min-w-[5%] h-full bg-green-500 rounded-full" :style="{ width: (assignment.questionsCompleted / assignment.questionsLength) * 100 + '%' }"></div>
            </div>
            <NuxtLink :to="`/student/course/${currentCourse.id}/${assignment.id}`">{{ assignment.name }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const store = useUserStore();

const { courses } = storeToRefs(store);
const currentCourse = ref<StudentCourseInfo>();
const currentTime = ref(new Date());

const loaded = ref(false);

onBeforeMount(() => {
  const routeCode = route.params.courseCode as string;
  console.log(courses.value);
  currentCourse.value = courses.value.filter((course) => course.type === "student").find((course) => course.id === Number(routeCode));
});

onMounted(() => {
  loaded.value = true;
});
</script>

<style scoped></style>
