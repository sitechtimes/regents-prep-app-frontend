<template>
  <div
    class="flex w-[45rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-[var(--faded-bg-color)] transition-all duration-300 ease-in-out hover:border-[var(--primary)] hover:shadow-lg hover:dark:shadow-[var(--gray)]"
  >
    <div class="flex h-28 w-full flex-col items-center justify-end p-2 drop-shadow-md" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="w-full overflow-hidden overflow-ellipsis text-nowrap text-center text-2xl font-semibold">{{ course.name }}</h2>
      <p class="text-sm">Period {{ course.period }}</p>
      <p>{{ course.teacher }}</p>
    </div>
    <!-- Above is the code for the top of the course card -->
    <div class="flex h-full min-h-36 w-full columns-2 bg-[var(--bg-color)] p-2">
      <div class="w-full">
        <div class="h-16 text-center text-4xl font-bold"><h3 class="self-center pt-3 underline">Class Code</h3></div>
      </div>
      <div class="divider divider-dark-border"></div>
      <div class="w-full">
        <div class="h-16 text-center text-4xl font-bold"><h3 class="self-center pt-3 underline">Students in class</h3></div>
      </div>
      <!--       <div class="card grid h-20 flex-grow place-items-center rounded-box bg-base-300">content</div>
      <div class="divider divider-horizontal divider-neutral">test</div>
      <div class="card grid h-20 flex-grow place-items-center rounded-box bg-base-300">content</div> -->
    </div>
    <!-- Above is the code for the bottom of the cours card-->
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps<{
  course: TeacherCourse;
}>();
const currentTime = ref(new Date());

/* 
  const filter = computed((arr: teacherAssignmentOverview[]) => {
  
  }); 
  */
</script>

<style scoped>
.assignment {
  display: grid;
  gap: 0.8ch;
  grid-template-columns: min-content auto;
  padding: 2px 0;
}
</style>
