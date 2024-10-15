<template>
  <div
    class="card hover:shadow-lg hover:dark:shadow-[var(--gray)] cursor-pointer border-2 border-[var(--faded-bg-color)] rounded-lg overflow-hidden w-[45rem] flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
  >
    <div class="w-full h-24 flex flex-col items-start justify-end p-2" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="text-2xl font-semibold text-nowrap overflow-ellipsis w-full overflow-hidden">{{ course.name }}</h2>
      <p class="text-sm">Period {{ course.period }}</p>
      <p>{{ course.teacher }}</p>
    </div>
    <div class="flex flex-col items-start justify-start w-full min-h-64 p-2">
      <h2 class="font-bold text-xl pt-1 pb-2">Assignments</h2>
      <div class="flex flex-col items-start justify-center gap-2" v-if="course.assignments.length > 0">
        <div
          v-for="assignment in course.assignments
            .filter((a) => !a.submitted)
            .sort((a, b) => a.due.getTime() - b.due.getTime())
            .slice(0, 3)"
          :key="assignment.id"
        >
          <p class="font-medium" :title="assignment.due.toLocaleString()">Due {{ formatDate(assignment.due, currentTime) }}</p>
          <NuxtLink class="assignment" :to="`/student/course/${course.id}/${assignment.id}`" @click="$event.stopPropagation()">
            <div class="relative flex items-center rounded-full max-w-2 min-h-4 h-full bg-[var(--gray)] overflow-hidden hover:max-w-16">
              <span
                class="absolute size-full"
                :style="`transform: translateY(${(1 - assignment.questionsCompleted / assignment.questionsLength) * 100}%); background-color: ${subjectColors[course.subject]}`"
              ></span>
              <span class="w-full z-10 text-center font-mono px-2"> {{ assignment.questionsCompleted }}/{{ assignment.questionsLength }} </span>
            </div>
            <span>{{ assignment.name }}</span>
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
.assignment {
  display: grid;
  gap: 0.8ch;
  grid-template-columns: min-content auto;
  padding: 2px 0;
}

@media (hover: hover) and (pointer: fine) {
  .card:hover {
    --tw-border-opacity: 1;
    border-color: calc(var(--text-color) / var(--tw-border-opacity)) /* #e5e7eb */;
  }

  .assignment:hover {
    text-decoration: underline;
    text-underline-offset: 1px;
  }
}
</style>
