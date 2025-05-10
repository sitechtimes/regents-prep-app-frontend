<template>
  <NuxtLink
    :to="`/teacher/course/${course.id}`"
    class="flex w-115 flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-300 bg-body transition hover:border-neutral-600/50 hover:shadow-lg dark:border-neutral-600 dark:hover:border-neutral-300/50"
  >
    <!-- course information -->
    <div class="flex h-24 w-full flex-col items-center justify-end p-2" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="w-72 overflow-hidden overflow-ellipsis text-nowrap text-center text-2xl font-semibold">{{ course.name }}</h2>
      <p class="text-sm">Period {{ course.period }}</p>
      <p>{{ course.teacher }}</p>
      <p v-if="!course.teacher">{{ userStore.name }}</p>
    </div>

    <div class="flex h-full min-h-24 w-full columns-2 rounded-3xl p-2">
      <div class="w-full">
        <div class="h-1/2 text-center text-2xl font-semibold"><h3 class="self-center pt-3">Join Code</h3></div>
        <div class="h-1/2 text-center text-2xl">
          <h2 id="copy" class="self-center">{{ course.joinCode }}</h2>
        </div>
      </div>
      <div class="h-20 w-[1px] bg-neutral-300 dark:bg-neutral-600"></div>
      <div class="w-full">
        <div class="h-full content-center text-center text-2xl">
          <h3 class="self-center">{{ course.numStudents }} {{ course.numStudents <= 0 ? `Students` : `Student` }}</h3>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ course: TeacherCourse }>();
const userStore = useUserStore();
</script>

<style scoped>
.assignment {
  display: grid;
  gap: 0.8ch;
  grid-template-columns: min-content auto;
  padding: 2px 0;
}
</style>
