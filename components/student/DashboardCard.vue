<template>
  <div class="card cursor-pointer border-2 border-gray rounded-lg overflow-hidden w-80 flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
    <div class="w-full h-24 flex flex-col items-start justify-end p-2" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h3 class="text-2xl font-semibold">{{ course.name }}</h3>
      <p class="text-sm">Period {{ course.period }}</p>
      <p>{{ course.teacher }}</p>
    </div>
    <div class="flex flex-col items-start justify-start w-full min-h-64 p-2">
      <h2 class="font-bold text-xl pt-1 pb-2">Assignments</h2>
      <div class="flex flex-col items-start justify-center" v-if="course.assignments.length > 0">
        <div v-for="assignment in course.assignments">
          <p class="font-medium" :title="assignment.due.toLocaleString()">Due {{ formatDate(assignment.due, currentTime) }}</p>
          <NuxtLink class="assignment" :to="`/student/course/${course.id}/${assignment.id}`" @click="$event.stopPropagation()">
            <span>{{ assignment.name }}</span>
            <span v-if="assignment.type === 'student'"> ({{ assignment.questionsCompleted }}/{{ assignment.questionsLength }})</span>
          </NuxtLink>
        </div>
      </div>
      <p v-else>No assignments</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useUserStore();
const router = useRouter();
const props = defineProps<{
  course: StudentCourseInfo;
}>();

const { courses } = storeToRefs(store);
const currentTime = ref(new Date());

const subjectColors = {
  Math: "#B4CBDB", //blue
  English: "#D1ACA4", //pink
  Science: "#C2D2B5", //green
  History: "#ECDDBF", //yellow
  Russian: "#BDAFD1" //purple
};
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    --tw-shadow: 0 35px 25px -15px rgba(0, 0, 0, 0.2);
    --tw-shadow-colored: 0 35px 25px -15px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    --tw-border-opacity: 1;
    border-color: rgb(229 231 235 / var(--tw-border-opacity)) /* #e5e7eb */;
  }

  .assignment:hover {
    text-decoration: underline;
    text-underline-offset: 1px;
  }
}
</style>
