<template>
  <div
    class="flex w-[45rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-[var(--faded-bg-color)] transition-all duration-300 ease-in-out hover:border-[var(--primary)] hover:shadow-lg hover:dark:shadow-[var(--gray)]"
  >
    <div class="flex h-28 w-full flex-col items-center justify-end p-2 drop-shadow-md" :style="{ backgroundColor: subjectColors[course.subject] }">
      <h2 :title="course.name" class="w-full overflow-hidden overflow-ellipsis text-nowrap text-center text-4xl font-semibold">{{ course.name }}</h2>
      <p class="text-3xl">Period {{ course.period }}</p>
      <p v-if="!course.teacher">{{ userStore.name }}</p>
      <p v-else>{{ course.teacher }}</p>
    </div>
    <!-- Above is the code for the top of the course card -->
    <div class="flex h-full min-h-36 w-full columns-2 bg-[var(--bg-color)] p-2">
      <div class="w-full">
        <div class="h-16 text-center text-5xl font-bold"><h3 class="self-center pt-3 underline">Class Code</h3></div>
        <div class="h-8 text-center text-5xl font-bold">
          <h2 class="self-center" id="copy">{{ props.course.joinCode }}</h2>
        </div>
      </div>
      <div class="divider fo-divider fo-divider-horizontal flex"></div>
      <div class="w-full">
        <div class="h-16 text-center text-5xl font-bold"><h3 class="self-center pt-3 underline">Students</h3></div>
        <div class="h-8 text-center text-5xl font-bold">
          <h2 @click="" class="self-center">{{ props.course.numOfStudents }}</h2>
        </div>
      </div>
    </div>
    <!-- Above is the code for the bottom of the cours card-->
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps<{
  course: TeacherCourse;
}>();
const userStore = useUserStore();
const currentTime = ref(new Date());

async function copy(data: number) {
  try {
    await navigator.clipboard.writeText(String(data));
    console.log("Page URL copied to clipboard");
  } catch (err) {
    console.log(err);
  }
}

/*
function copy() {
  let copyText = document.querySelector("#input");
  copyText.select();
  document.execCommand("copy");
}

document.querySelector("#copy").addEventListener("click", copy);
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
