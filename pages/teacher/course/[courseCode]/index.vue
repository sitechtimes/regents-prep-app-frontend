<template>
  <div class="flex w-full items-center justify-center p-4">
    <div v-if="loaded && teacherCurrentCourse" class="flex w-1/2 flex-col items-start justify-start gap-5">
      <div class="flex w-full flex-col items-end justify-center gap-4">
        <div class="flex h-52 w-full flex-col items-start justify-end rounded-2xl p-6" :style="{ backgroundColor: subjectColors[teacherCurrentCourse.subject] }">
          <h1 class="text-4xl font-semibold">{{ teacherCurrentCourse.name }}</h1>
          <h3 class="text-xl">Period {{ teacherCurrentCourse.period }}</h3>
        </div>

        <div class="flex items-center justify-center gap-4">
          <TeacherCourseActionButton :to="`/teacher/course/${teacherCurrentCourse.id}/roster`" img="/ui/users.svg" text="View Students" />
          <TeacherCourseActionButton :to="`/teacher/course/${teacherCurrentCourse.id}/create-assignment`" img="/ui/plus.svg" text="New Assignment" />
          <TeacherAssignmentCatalogQuestionButton img="/ui/trash.svg" class="text-red-500 hover:underline" text="Delete Course" :click-function="confirmDeleteCourse" />
        </div>
      </div>

      <div class="flex w-full items-start justify-start border-b border-neutral-300">
        <TeacherCourseTabButton :course="teacherCurrentCourse" tab-name="current" :current-tab="currentTab" @switch-tab="(tab) => (currentTab = tab)" />
        <TeacherCourseTabButton :course="teacherCurrentCourse" tab-name="past" :current-tab="currentTab" @switch-tab="(tab) => (currentTab = tab)" />
      </div>

      <div v-for="assignment in filteredAssignments" :key="assignment.id" class="flex w-full items-center gap-4">
        <TeacherAssignmentCard :course="teacherCurrentCourse" :assignment="assignment" :current-date="currentDate" @delete-assignment="confirmDeleteAssignment" />
      </div>
      <DeleteModal v-model="isModalVisible" @confirm="handleConfirm" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course"
});

const userStore = useUserStore();
const { teacherCourses, teacherCurrentCourse } = storeToRefs(userStore);
const router = useRouter();
const currentDate = new Date();
const currentTab = ref<"current" | "past">("current");
const loaded = ref(false);
const assignments = computed(() => teacherCurrentCourse.value?.assignments);
const filteredAssignments = computed(() =>
  assignments.value?.filter((assignment) => (currentTab.value === "current" ? new Date(assignment.dueDate) >= currentDate : new Date(assignment.dueDate) < currentDate))
);
const isModalVisible = ref(false);
const deleteAction = ref<() => Promise<void>>();

function showDeleteModal(action: () => Promise<void>) {
  deleteAction.value = action;
  isModalVisible.value = true;
}

async function handleConfirm() {
  if (deleteAction.value) {
    await deleteAction.value();
    isModalVisible.value = false;
  }
}

function confirmDeleteCourse() {
  if (!teacherCurrentCourse.value?.id) return;

  showDeleteModal(async () => {
    if (!teacherCurrentCourse.value) return;
    const { error } = await tryCatch(deleteCourse(teacherCurrentCourse.value.id));
    if (error) return console.error("Failed to delete course:", error);
    userStore.teacherCourses = userStore.teacherCourses.filter((course) => course.id !== teacherCurrentCourse.value?.id);
    teacherCurrentCourse.value = undefined;
    void router.push("/teacher/dashboard");
  });
}

function confirmDeleteAssignment(assignmentId: number) {
  showDeleteModal(async () => {
    if (!teacherCurrentCourse.value) return;
    const { error } = await tryCatch(deleteAssignment(assignmentId));
    if (error) return console.error("Failed to delete assignment:", error);
    teacherCurrentCourse.value.assignments = teacherCurrentCourse.value.assignments.filter((assignment) => assignment.id !== assignmentId);
  });
}
onMounted(() => (loaded.value = true));
// for vitest
defineExpose({ teacherCourses, teacherCurrentCourse, loaded, filteredAssignments });
</script>

<style scoped>
@keyframes shift {
  0% {
    background-position-x: -100%;
  }

  100% {
    background-position-x: 100%;
  }
}

.loading-div {
  background-image: linear-gradient(to right, var(--gray), var(--bg-color), var(--gray));
  background-size: 200% 100%;
  animation: shift 1.5s infinite linear;
}
</style>
