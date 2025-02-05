<template>
  <div
    class="flex w-[45rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-[var(--faded-bg-color)] transition-all duration-300 ease-in-out hover:border-[var(--primary)] hover:shadow-lg hover:dark:shadow-[var(--gray)]"
  >
    <div class="flex h-24 w-full flex-col items-center justify-end p-2" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="w-full overflow-hidden overflow-ellipsis text-nowrap text-center text-2xl font-semibold">{{ course.name }}</h2>
      <p class="text-sm">Period {{ course.period }}</p>
      <p>{{ course.teacher }}</p>
    </div>
    <!-- Above is the code for the top of the course card -->
    <div class="flex h-full min-h-36 w-full flex-col items-center justify-start space-y-4 bg-[var(--bg-color)] p-2">
      <h3 class="pb-2 pt-1 text-xl font-bold">Assignments</h3>
      <div v-if="course.assignments.length > 0" class="flex h-full w-full flex-wrap items-start justify-around gap-7">
        <div
          v-for="assignment in course.assignments"
          :key="assignment.id"
          class="flex h-full min-w-[45%] flex-col items-center justify-center px-5"
          :class="course.assignments.length === 1 ? 'w-full' : ''"
        >
          <ClientOnly>
            <p class="text-center font-medium" :title="assignment.assignment.dueDate.toLocaleString()">Due {{ formatDate(assignment.assignment.dueDate, currentTime) }}</p>
          </ClientOnly>
          <div class="flex h-full w-full flex-col items-center justify-start">
            <NuxtLink
              class="w-[70%] overflow-hidden overflow-ellipsis text-nowrap text-center text-xl hover:underline hover:underline-offset-1"
              :to="`/student/course/${course.id}/${assignment.id}`"
              @click.stop
            >
              {{ assignment.assignment.name }}
            </NuxtLink>
            <div class="relative flex h-full w-full items-center overflow-hidden rounded-full bg-[var(--gray)]" @click.stop="router.push(`/student/course/${course.id}/${assignment.id}`)">
              <div
                class="absolute left-0 h-full"
                :style="{ width: (assignment.questionsCompleted / assignment.assignment.numOfQuestions) * 100 + '%', backgroundColor: subjectColors[course.subject] }"
              ></div>
              <span class="z-10 w-full px-2 text-center font-mono"> {{ assignment.questionsCompleted }}/{{ assignment.assignment.numOfQuestions }} </span>
            </div>
          </div>
        </div>
      </div>
      <p v-else>No assignments</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ course: StudentCourse }>();

const router = useRouter();
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
