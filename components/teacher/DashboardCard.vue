<template>
  <div
    class="flex w-[32rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-[var(--faded-bg-color)] transition-all duration-300 ease-in-out hover:border-[var(--primary)] hover:shadow-lg hover:dark:shadow-[var(--gray)]"
  >
    <div class="flex h-1/2 w-full flex-col items-center justify-end p-2 drop-shadow-md" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="mt-4 h-1/2 w-full overflow-hidden overflow-ellipsis text-nowrap text-center text-4xl font-semibold">{{ course.name }}</h2>

      <p v-if="!course.teacher" class="h-1/4 text-2xl">{{ userStore.name }}</p>
      <p v-else class="h-1/4 text-xl">{{ course.teacher }}</p>
      <div class="w-full">
        <p class="h-1/4 pr-1 text-end text-xl">Period {{ course.period }}</p>
      </div>
    </div>
    <!-- Above is the code for the top of the course card -->

    <div class="flex h-full min-h-24 w-full columns-2 rounded-3xl bg-[var(--bg-color)] p-2">
      <div class="w-full">
        <div class="h-1/2 text-center text-3xl font-semibold"><h3 class="self-center pt-3">Join Code</h3></div>
        <div class="h-1/2 text-center text-3xl">
          <h2 id="copy" class="self-center">{{ props.course.joinCode }}</h2>
        </div>
      </div>
      <div class="divider fo-divider fo-divider-horizontal flex"></div>
      <div class="w-full">
        <div class="h-full content-center text-center text-3xl">
          <h3 class="self-center">{{ course.numOfStudents }} {{ course.numOfStudents <= 0 ? `Students` : `Student` }}</h3>
        </div>
      </div>
    </div>
    <!-- Above is the code for the bottom of the cours card-->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ course: TeacherCourse }>();
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
