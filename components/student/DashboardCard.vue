<template>
  <div class="card hover:shadow-lg cursor-pointer border-2 border-gray-300 rounded-lg overflow-hidden w-80 flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
    <div class="w-full h-24 flex flex-col items-start justify-end p-2" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="text-2xl font-semibold text-nowrap overflow-ellipsis w-full overflow-hidden">{{ course.name }}</h2>
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
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    --tw-border-opacity: 1;
    border-color: rgb(229 231 235 / var(--tw-border-opacity)) /* #e5e7eb */;
  }

  .assignment:hover {
    text-decoration: underline;
    text-underline-offset: 1px;
  }
}
</style>
