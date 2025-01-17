<template>
  <Transition name="join-menu-scale">
    <div v-if="props.show" class="join-menu-bg fixed left-0 top-0 z-[51] flex min-h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.25)]" @click="emit('close')">
      <div class="join-menu flex flex-col items-center justify-center rounded-lg bg-white p-6" @click.stop>
        <h2 class="text-xl">Create New Course</h2>
        <form id="create-course" class="mb-4 flex flex-col" @submit.prevent="createCourse">
          <label class="du-label" for="course-name">Course Name <span title="Required" class="font-2xl text-red-500">*</span></label>
          <input id="course-name" v-model="courseName" class="du-input w-96 bg-gray-200" type="text" placeholder="Enter the name of the course" />

          <label class="du-label" for="course-subject">Course Subject <span title="Required" class="font-2xl text-red-500">*</span></label>
          <select id="course-subject" v-model="courseSubject" class="du-select w-96 bg-gray-200">
            <option value="" selected>Select the subject of the course</option>
            <option v-for="regents in Object.values(regentsTypes).flat().sort()" :key="regents" :value="regents">{{ regents }}</option>
          </select>

          <label class="du-label" for="course-name">Period <span title="Required" class="font-2xl text-red-500">*</span></label>
          <div class="flex w-96 items-center justify-between">
            <button
              v-for="num in 9"
              :key="num"
              class="h-12 flex-1 duration-200"
              :class="{ 'rounded-l-lg': num == 1, 'rounded-r-lg': num == 9, 'bg-gray-accent': num != coursePeriod, 'bg-green-accent': num == coursePeriod }"
              type="button"
              @click="coursePeriod = num"
            >
              {{ num }}
            </button>
          </div>
        </form>
        <div class="flex w-full justify-end gap-2">
          <button class="du-btn du-btn-md" type="button" @click="emit('close')">Cancel</button>
          <button
            class="du-btn du-btn-md bg-green-accent"
            :class="{ grayscale: !courseName || !courseSubject || !coursePeriod }"
            :disabled="!courseName || !courseSubject || !coursePeriod"
            form="create-course"
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  close: [void];
}>();

const regentsTypes = {
  Math: ["Algebra I", "Geometry", "Algebra II"],
  English: ["English"],
  Science: ["Chemistry", "Physics", "Biology"],
  History: ["World History", "US History"],
  Russian: ["Russian"]
};

const courseName = ref("");
const courseSubject = ref("");
const coursePeriod = ref(0);

onUnmounted(() => {
  courseName.value = "";
  courseSubject.value = "";
  coursePeriod.value = 0;
});

function createCourse() {
  if (!courseName.value || !courseSubject.value || !Object.values(regentsTypes).flat().includes(courseSubject.value) || !coursePeriod.value) return;
  alert("you are now enrolled in jail!");
  // make it join a class 👍
  // no way really? i think it should join a course instead
  emit("close");
}
</script>

<style scoped>
.join-menu-scale-enter-active,
.join-menu-scale-leave-active {
  transition: all 0.2s ease-in-out;
}

.join-menu-scale-enter-from,
.join-menu-scale-leave-to {
  opacity: 0;
}

.join-menu-scale-enter-from .join-menu,
.join-menu-scale-leave-to .join-menu {
  transform: scale(0.75);
}
</style>
