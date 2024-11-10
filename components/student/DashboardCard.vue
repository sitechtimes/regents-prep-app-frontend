<template>
  <div
    class="hover:border-[var(--text-color)] hover:shadow-lg hover:dark:shadow-[var(--gray)] cursor-pointer border-2 border-[var(--faded-bg-color)] rounded-lg overflow-hidden w-[45rem] flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
  >
    <div class="w-full h-24 flex flex-col items-center justify-end p-2 drop-shadow-md" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="text-2xl text-center font-semibold text-nowrap overflow-ellipsis w-full overflow-hidden">{{ course.name }}</h2>
      <p class="text-sm">Period {{ course.period }}</p>
      <p>{{ course.teacher }}</p>
    </div>
    <!-- Above is the code for the top of the course card -->
    <div class="flex flex-col items-center justify-start w-full min-h-36 h-full p-2 bg-[var(--bg-color)]">
      <h3 class="font-bold text-xl pt-1 pb-2">Assignments</h3>
      <div class="flex flex-wrap items-start justify-around w-full h-full gap-7" v-if="course.assignments.length > 0">
        <div
          v-for="assignment in props.course.assignments"
          :key="assignment.id"
          class="flex flex-col items-center justify-center h-full min-w-[45%] px-5"
          :class="props.course.assignments.length === 1 ? 'w-full' : ''"
        >
          <p class="font-medium text-center" :title="assignment.dueDate.toLocaleString()">Due {{ formatDate(assignment.dueDate, currentTime) }}</p>
          <div class="flex flex-col items-center justify-start w-full h-full">
            <NuxtLink
              class="text-xl hover:underline hover:underline-offset-1 w-[70%] text-center text-nowrap overflow-hidden overflow-ellipsis"
              :to="`/student/course/${course.id}/${assignment.id}`"
              @click.stop
              >{{ assignment.name }}</NuxtLink
            >
            <div @click.stop="router.push(`/student/course/${course.id}/${assignment.id}`)" class="relative flex items-center rounded-full w-full h-full bg-[var(--gray)] overflow-hidden">
              <span
                class="absolute size-full"
                :style="{ transform: `translateX(-${(1 - assignment.questionsCompleted / assignment.numOfQuestions) * 100 + '%'})`, backgroundColor: subjectColors[course.subject] }"
                v-if="assignment.questionsCompleted > 0"
              ></span>
              <span class="w-full z-10 text-center font-mono px-2" v-if="assignment.questionsCompleted > 0"> {{ assignment.questionsCompleted }}/{{ assignment.numOfQuestions }} </span>
              <span class="w-full z-10 text-center px-2" v-else>Assignment not started</span>
            </div>
          </div>
        </div>
      </div>
      <p v-else>No assignments</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps<{
  course: StudentCourse;
}>();
const currentTime = ref(new Date());
</script>

<style scoped>
.assignment {
  display: grid;
  gap: 0.8ch;
  grid-template-columns: min-content auto;
  padding: 2px 0;
}
</style>
