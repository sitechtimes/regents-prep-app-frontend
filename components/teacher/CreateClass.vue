<template>
  <Transition name="join-menu-scale">
    <div v-show="props.show" @click="emit('close')" class="join-menu-bg fixed top-0 left-0 bg-[rgba(0,0,0,0.25)] w-screen min-h-screen flex items-center justify-center z-[51]">
      <div @click.stop class="join-menu bg-white p-6 rounded-lg flex flex-col items-center justify-center">
        <h2 class="text-xl">Create New Course</h2>
        <form id="create-course" class="flex flex-col mb-4" @submit.prevent="createCourse">
          <label class="du-label" for="course-name">Course Name <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input class="du-input bg-gray-200 w-96" id="course-name" type="text" v-model="courseName" required placeholder="Enter the name of the course" />

          <label class="du-label" for="course-subject">Course Subject <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <select class="du-select bg-gray-200 w-96" id="course-subject" v-model="courseSubject" required>
            <option value="" selected>Select the subject of the course</option>
            <option v-for="regents in Object.values(regentsTypes).flat()" :key="regents" :value="regents">{{ regents }}</option>
          </select>

          <label class="du-label" for="course-name">Period <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <div class="flex items-center justify-between w-96">
            <button
              class="h-12 duration-200 flex-1"
              :class="{ 'rounded-l-lg': num == 1, 'rounded-r-lg': num == 9, 'bg-gray-accent': num != coursePeriod, 'bg-green-accent': num == coursePeriod }"
              v-for="num in 9"
              :key="num"
              @click="coursePeriod = num"
              type="button"
            >
              {{ num }}
            </button>
          </div>
        </form>
        <div class="flex w-full justify-end gap-2">
          <button class="du-btn du-btn-md" @click="emit('close')">Cancel</button>
          <button class="du-btn du-btn-md bg-green-accent" form="create-course" type="submit">Create</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["close"]);

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
