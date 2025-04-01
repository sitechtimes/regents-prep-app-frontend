<template>
  <div
    class="flex w-115 flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-300 bg-body transition hover:border-neutral-600/50 hover:shadow-lg dark:border-neutral-600 dark:hover:border-neutral-300/50"
  >
    <!-- course information -->
    <div class="flex h-1/2 w-full flex-col items-center justify-end pt-2 px-2 drop-shadow-md" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="sm:text-l mt-4 h-1/2 w-full overflow-hidden overflow-ellipsis text-nowrap text-center font-semibold md:text-2xl lg:text-3xl self-center -mt-3 -mb-2">{{ course.name }}</h2>
      <p class="text-sm">Period {{ course.period }}</p>
      <p>{{ course.teacher }}</p>
      <p v-if="!course.teacher" class="h-1/4 lg:text-2xl md:text-xl sm:text-l pb-10 -mt-2">{{ userStore.name }}</p>
    </div>

    <div class="flex h-full min-h-24 w-full columns-2 rounded-3xl bg-[var(--bg-color)] p-2">
      <div class="lg:w-full md:w-full w-[calc(50%-18px)]">
        <div class="sm:text-l h-1/2 text-center font-semibold md:text-xl lg:text-2xl"><h3 class="self-center pt-5">Join Code</h3></div>
        <div class="h-1/2 text-center lg:text-3xl md:text-2xl sm:text-xl py-2">
          <h2 id="copy" class="self-center">{{ course.joinCode }}</h2>
        </div>
      </div>
      <div class="h-20 w-[1px] bg-neutral-300 dark:bg-neutral-600"></div>
      <div class="w-full">
        <div class="h-full content-center text-center sm:text-xl md:text-2xl lg:text-2xl">
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
