<template>
  <div
    class="my-2 flex h-[90%] w-[85%] flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-300 bg-body transition hover:border-neutral-600/50 hover:shadow-lg dark:border-neutral-600 dark:hover:border-neutral-300/50"
  >
    <!-- course information -->
    <div class="flex h-1/2 w-full flex-col items-center justify-end px-2 pt-2" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="my-1 h-1/2 w-full self-center overflow-hidden overflow-ellipsis text-nowrap text-center text-lg font-semibold md:text-2xl lg:text-3xl">
        {{ course.name }}
      </h2>
      <p class="text-sm md:text-lg">Period {{ course.period }}</p>
      <p class="text-center text-sm md:text-lg">{{ course.teacher }}</p>
      <p v-if="!course.teacher" class="mb-1 text-center text-sm md:text-lg">{{ userStore.name }}</p>
    </div>

    <div class="flex h-full min-h-24 w-full columns-2 rounded-3xl bg-body p-2">
      <div class="w-[85%] md:w-full">
        <div class="h-1/2 text-center font-semibold sm:mb-1 sm:text-lg md:text-xl lg:text-2xl"><h3 class="self-center pt-5">Join Code</h3></div>
        <div class="h-1/2 py-2 text-center sm:text-xl md:text-2xl lg:text-3xl">
          <h2 id="copy" class="self-center">{{ course.joinCode }}</h2>
        </div>
      </div>
      <div class="h-20 w-[1px] bg-neutral-300 dark:bg-neutral-600"></div>
      <div class="w-full">
        <div class="h-full content-center text-center sm:text-xl md:text-2xl">
          <h3 class="self-center">{{ course.numStudents }} {{ course.numStudents <= 0 ? `Students` : `Student` }}</h3>
        </div>
      </div>
    </div>
  </div>
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
