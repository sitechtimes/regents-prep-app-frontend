<template>
  <div v-if="teacherCurrentCourse && currentAssignment" class="relative flex h-7 w-full items-center justify-center">
    <div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <div
        v-if="currentAssignment.numSubmitted !== teacherCurrentCourse.numStudents"
        class="du-tooltip z-[1] h-full cursor-help rounded-full"
        :style="{ width: `${(numUnsubmitted / teacherCurrentCourse.numStudents) * 100}%` }"
        :data-tip="`${numUnsubmitted} student${numUnsubmitted > 1 ? 's' : ''} did not submit${currentAssignment.dueDate > currentDate || currentAssignment.lateSubmissions ? ' yet' : ''}`"
      ></div>
      <div
        v-if="currentAssignment.numSubmitted"
        class="du-tooltip z-[1] h-full cursor-help rounded-full"
        :style="{ width: `${(currentAssignment.numSubmitted / teacherCurrentCourse.numStudents) * 100}%` }"
        :data-tip="`${currentAssignment.numSubmitted} student${currentAssignment.numSubmitted > 1 ? 's' : ''} submitted`"
      ></div>
    </div>

    <div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-neutral-300">
      <div
        v-if="currentAssignment.numSubmitted !== teacherCurrentCourse.numStudents"
        class="flex h-full items-center justify-center bg-neutral-400"
        :style="{ width: `${(numUnsubmitted / teacherCurrentCourse.numStudents) * 100}%` }"
      >
        <p class="text-bold text-xl">{{ numUnsubmitted }}</p>
      </div>
      <div
        v-if="currentAssignment.numSubmitted"
        class="du-tooltip flex h-full items-center justify-center"
        :style="{ backgroundColor: subjectColors[teacherCurrentCourse.subject], width: `${(currentAssignment.numSubmitted / teacherCurrentCourse.numStudents) * 100}%` }"
      >
        <p class="text-bold text-xl">{{ currentAssignment.numSubmitted }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ currentAssignment: TeacherAssignment | undefined }>();

const userStore = useUserStore();
const { teacherCurrentCourse } = storeToRefs(userStore);

const numUnsubmitted = computed(() => (teacherCurrentCourse.value?.numStudents ?? 0) - (props.currentAssignment?.numSubmitted ?? 0));

const currentDate = new Date();
</script>

<style scoped></style>
