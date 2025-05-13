<template>
  <div class="flex h-full min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-start">
    <div v-if="loaded && teacherCurrentCourse" class="flex w-[90%] flex-col items-center justify-center sm:w-[80%] md:w-[70%] xl:w-[60%] 2xl:w-[50%]">
      <div class="flex w-full flex-col items-end justify-center gap-4">
        <div class="flex h-52 w-full flex-col items-start justify-end rounded-2xl p-6" :style="{ backgroundColor: subjectColors[teacherCurrentCourse.subject] }">
          <h1 class="text-4xl font-semibold">{{ teacherCurrentCourse.name }}</h1>
          <h3 class="text-xl">Period {{ teacherCurrentCourse.period }}</h3>
        </div>

        <div class="flex items-center justify-center gap-4">
          <TeacherCourseActionButton type="link" :to="`/teacher/course/${teacherCurrentCourse.id}/roster`" img="/ui/users.svg" text="View Students" />
          <TeacherCourseActionButton type="link" :to="`/teacher/course/${teacherCurrentCourse.id}/create-assignment`" img="/ui/plus.svg" text="New Assignment" />
          <TeacherCourseActionButton type="button" img="/ui/trash.svg" text="Delete Course" class="hover:bg-red-400" @on-click="deleteType = 'course'" />
        </div>
      </div>

      <div class="my-4 flex w-full items-start justify-start border-b border-neutral-300">
        <TeacherCourseTabButton :course="teacherCurrentCourse" tab-name="current" :current-tab="currentTab" @switch-tab="(tab) => (currentTab = tab)" />
        <TeacherCourseTabButton :course="teacherCurrentCourse" tab-name="past" :current-tab="currentTab" @switch-tab="(tab) => (currentTab = tab)" />
      </div>

      <div class="flex w-full flex-col items-center gap-4">
        <TeacherAssignmentCard
          v-for="assignment in filteredAssignments"
          :key="assignment.id"
          :course="teacherCurrentCourse"
          :assignment="assignment"
          :current-date="currentDate"
          @delete-assignment="(deleteType = 'assignment'), (currentDeleteAssignmentId = assignment.id)"
        />
      </div>

      <FullScreenModal transition-name="scale-75" :show-modal="showDeleteModal" @close="showDeleteModal = false">
        <div class="flex flex-col items-center justify-center">
          <h2 class="mb-2 text-xl font-semibold">Confirm Deletion</h2>
          <p class="mb-4 text-gray-600">{{ deleteStep === 1 ? `Are you sure you want to delete this ${deleteType}?` : "Are you really sure?" }}</p>
          <div class="flex justify-center gap-4">
            <TeacherCourseActionButton v-if="deleteStep === 1" type="button" img="/ui/trash.svg" text="Confirm" class="!bg-red-200 hover:!bg-red-400" @on-click="deleteStep++" />
            <TeacherCourseActionButton v-else type="button" img="/ui/trash.svg" text="Yes, Delete" class="!bg-red-200 hover:!bg-red-400" @on-click="confirmDelete" />
            <TeacherCourseActionButton type="button" img="/ui/close.svg" text="Cancel" @on-click="showDeleteModal = false" />
          </div>
        </div>
      </FullScreenModal>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course",
  requiresAuth: true,
  redirectIfAuth: false
});

const router = useRouter();
const userStore = useUserStore();
const { teacherCourses, teacherCurrentCourse } = storeToRefs(userStore);

const currentDate = new Date();
const currentTab = ref<"current" | "past">("current");
const loaded = ref(false);

const assignments = computed(() => teacherCurrentCourse.value?.assignments);
const filteredAssignments = computed(() =>
  assignments.value?.filter((assignment) => (currentTab.value === "current" ? new Date(assignment.dueDate) >= currentDate : new Date(assignment.dueDate) < currentDate))
);

const showDeleteModal = ref(false);
const deleteStep = ref<1 | 2>(1);
const deleteType = ref<"course" | "assignment">();
const currentDeleteAssignmentId = ref<number>();
watch(deleteType, (type) => {
  if (type) return (showDeleteModal.value = true);
});
watch(showDeleteModal, (val) => {
  if (!val) {
    deleteStep.value = 1;
    deleteType.value = undefined;
    currentDeleteAssignmentId.value = undefined;
  }
});

useSeoMeta({
  title: () => teacherCurrentCourse.value?.name ?? "Class Details"
});

async function confirmDeleteCourse() {
  if (!teacherCurrentCourse.value?.id) return;

  const { error } = await tryRequestEndpoint<TeacherCourse>(`/courses/teacher/delete/course/${teacherCurrentCourse.value.id}`, "DELETE");
  if (error) return console.error("Failed to delete course:", error);

  userStore.teacherCourses = userStore.teacherCourses.filter((course) => course.id !== teacherCurrentCourse.value?.id);
  teacherCurrentCourse.value = undefined;
  void router.push("/teacher/dashboard");
}
async function confirmDeleteAssignment() {
  if (!teacherCurrentCourse.value || !currentDeleteAssignmentId.value) return;

  const { error } = await tryRequestEndpoint<TeacherAssignment>(`/courses/teacher/delete/assignment/${currentDeleteAssignmentId.value}`, "DELETE");
  if (error) return console.error("Failed to delete assignment:", error);

  teacherCurrentCourse.value.assignments = teacherCurrentCourse.value.assignments.filter((assignment) => assignment.id !== currentDeleteAssignmentId.value);
  showDeleteModal.value = false;
}
function confirmDelete() {
  if (deleteType.value === "course") void confirmDeleteCourse();
  else if (deleteType.value === "assignment") void confirmDeleteAssignment();
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
