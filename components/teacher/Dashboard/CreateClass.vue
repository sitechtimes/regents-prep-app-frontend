<template>
  <FullScreenModal transition-name="scale-75" :show-modal="show" width-class="w-auto" @close="closeModal">
    <h2 class="text-xl">Create New Course</h2>
    <form id="create-course" class="mb-4 flex flex-col" @submit.prevent="createCourse">
      <label class="du-label" for="course-name">Course Name <span title="Required" class="font-2xl text-red-500">*</span></label>
      <input id="course-name" v-model="courseName" class="xs:w-80 du-input w-72 bg-neutral-200 sm:w-96 dark:bg-neutral-700" type="text" placeholder="Enter the name of the course" />

      <label class="du-label" for="course-subject">Course Subject <span title="Required" class="font-2xl text-red-500">*</span></label>
      <select id="course-subject" v-model="courseSubject" class="xs:w-80 du-select w-72 bg-neutral-200 sm:w-96 dark:bg-neutral-700">
        <option value="" selected>Select the subject of the course</option>
        <option v-for="regents in Object.values(regentsTypes).flat().sort()" :key="regents" :value="regents">{{ regents }}</option>
      </select>

      <label class="du-label" for="course-name">Period <span title="Required" class="font-2xl text-red-500">*</span></label>
      <div class="xs:w-80 flex w-72 items-center justify-between sm:w-96">
        <button
          v-for="i in 9"
          :key="i"
          class="h-12 flex-1 duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600"
          :class="{ 'rounded-l-lg': i === 1, 'rounded-r-lg': i === 9, 'bg-gray-accent dark:bg-neutral-700': i !== coursePeriod, '!bg-green-accent hover:!bg-green-accent': i === coursePeriod }"
          type="button"
          @click="coursePeriod = i"
        >
          {{ i }}
        </button>
      </div>
    </form>
    <div class="flex w-full justify-end gap-2">
      <button class="du-btn du-btn-md" type="button" @click="closeModal">Cancel</button>
      <button
        class="du-btn du-btn-md bg-green-accent dark:!text-white"
        :class="{ grayscale: !courseName || !courseSubject || !coursePeriod }"
        :disabled="!courseName || !courseSubject || !coursePeriod"
        form="create-course"
        type="submit"
      >
        Create
      </button>
    </div>
  </FullScreenModal>

  <FullScreenModal transition-name="scale-75" :show-modal="showSuccessModal" @close="showSuccessModal = false">
    <div class="flex w-full flex-col">
      <h3 class="text-2xl font-bold">Success!</h3>
      <!-- prettier-ignore -->
      <p class="pb-4">You have created <span class="font-bold">{{ courseName }}</span>.</p>

      <div class="flex w-full items-center justify-end gap-2">
        <TeacherCourseActionButton type="link" img="/ui/arrowRight.svg" text="Go to Course" :to="`/teacher/course/${newCourseId}`" @click="showSuccessModal = false" />
        <TeacherCourseActionButton type="button" img="/ui/close.svg" text="Close" @on-click="showSuccessModal = false" />
      </div>
    </div>
  </FullScreenModal>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>();
const emit = defineEmits<{ close: [void] }>();

const userStore = useUserStore();

const showSuccessModal = ref(false);
const newCourseId = ref<number>();

const regentsTypes = {
  Math: ["Algebra I", "Geometry", "Algebra II"],
  Science: ["Chemistry", "Physics", "Biology"],
  English: ["English"],
  History: ["World History", "US History"],
  "Foreign Language": ["Russian"]
} as const satisfies Record<Subject, string[]>;

const courseName = ref("");
const courseSubject = ref("");
const coursePeriod = ref(0);

function closeModal() {
  courseName.value = "";
  courseSubject.value = "";
  coursePeriod.value = 0;
  emit("close");
}

async function createCourse() {
  if (!courseName.value || !courseSubject.value || !coursePeriod.value) return;

  const subjectCode = Object.values(regentsTypes).findIndex((regents) => regents.includes(courseSubject.value as never));

  const { data: course, error } = await tryRequestEndpoint<CreateCourse>("courses/teacher/create-course/", "POST", { name: courseName.value, period: coursePeriod.value, subject: subjectCode });
  if (error) return console.error("Failed to create course:", error);

  newCourseId.value = course.id;
  userStore.teacherCourses.push({
    id: course.id,
    joinCode: course.joinCode,
    name: courseName.value,
    subject: Object.keys(regentsTypes)[subjectCode] as keyof typeof regentsTypes,
    period: coursePeriod.value,
    numStudents: 0,
    teacher: userStore.name,
    assignments: [],
    assignmentsFetched: false
  });

  showSuccessModal.value = true;
  closeModal();
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

.du-btn {
  @apply rounded-2xl;
}
</style>
