<template>
  <div class="relative w-full">
    <div class="absolute right-2 top-2 z-10">
      <img
        tabindex="0"
        role="button"
        src="/ui/ellipsis-vertical.svg"
        alt="More options"
        class="h-7 w-7 cursor-pointer select-none rounded-full p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        @click.stop="isOpen = !isOpen"
      />
      <Transition name="slide-up">
        <ul v-show="isOpen" tabindex="0" class="absolute right-0 z-20 mt-2 w-52 rounded-lg border border-[var(--border-color)] bg-body p-2 shadow-lg" @click.stop>
          <li>
            <button class="h-10 w-full rounded-lg pl-4 text-left transition-all hover:bg-red-400/70" type="button" @click="deleteAssignment">Delete</button>
          </li>
        </ul>
      </Transition>
    </div>
    <NuxtLink
      class="relative flex h-fit w-full flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-300 py-4 hover:border-neutral-600 hover:shadow-lg hover:transition sm:flex-row sm:p-6 dark:border-neutral-600 dark:hover:border-neutral-300"
      :to="`/teacher/course/${course.id}/${assignment.id}`"
    >
      <div class="flex w-5/6 flex-col items-start justify-start">
        <h3 class="w-full overflow-hidden overflow-ellipsis text-nowrap text-2xl font-semibold">
          {{ assignment.name }}
        </h3>
        <ClientOnly>
          <p :title="assignment.dueDate.toLocaleString()">Due {{ formatDate(assignment.dueDate, currentDate) }}</p>
        </ClientOnly>
      </div>

      <div class="flex w-5/6 flex-col items-center justify-center gap-1">
        <p class="text-xl font-medium">
          Submissions: {{ assignment.numSubmitted }}/{{ course.numStudents }}
          <span class="text-sm">students</span>
        </p>
        <div class="relative h-2 w-full overflow-hidden rounded-full border border-neutral-300 bg-neutral-100/25">
          <div class="absolute left-0 top-0 h-full" :style="{ width: `${(assignment.numSubmitted / course.numStudents) * 100}%`, backgroundColor: subjectColors[course.subject] }"></div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  course: TeacherCourse;
  assignment: TeacherAssignment;
  currentDate: Date;
}>();
const emit = defineEmits<{ deleteAssignment: [void] }>();
const isOpen = ref(false);

function deleteAssignment() {
  emit("deleteAssignment");
  isOpen.value = false;
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease-in-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
