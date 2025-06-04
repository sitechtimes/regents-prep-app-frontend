<template>
  <div class="flex w-full flex-col items-center py-12">
    <div class="relative flex w-full flex-col items-center justify-center gap-1">
      <input
        v-model="searchTerm"
        class="mb-6 h-10 w-2/3 rounded-lg border border-neutral-300 px-2 py-1 focus:outline focus:outline-1 focus:outline-neutral-600/50 dark:border-neutral-600 dark:hover:border-neutral-300/50"
        type="text"
        placeholder="Search for Student..."
      />
      <div class="items relative flex w-full items-center justify-center overflow-x-auto rounded-b-box rounded-se-box">
        <table class="table w-3/4">
          <thead>
            <tr class="border-b border-neutral-300 dark:border-neutral-600">
              <th class="py-3 pl-10 text-start font-bold">First Name</th>
              <th class="py-3 pl-10 text-start font-bold">Last Name</th>
              <th class="py-3 font-bold">Remove Student</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in filteredStudents" :key="student.id" class="border-t">
              <td class="py-3 pl-10">{{ student.firstName }}</td>
              <td class="py-3 pl-10">{{ student.lastName }}</td>
              <td class="flex items-center justify-center py-3">
                <button class="btn btn-sm transition-200 flex h-8 items-center justify-center rounded-xl bg-red-500 p-1 hover:brightness-125" type="button" @click="removeStudent(student)">
                  <img class="size-7 group-active:scale-90 dark:invert" src="/ui/trash.svg" alt="Remove Student" />
                </button>
              </td>
            </tr>
            <tr v-if="filteredStudents.length === 0" class="border-t">
              <td colspan="4" class="items-center justify-center px-10 py-3 text-center">No students</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="mt-6 rounded-xl bg-[var(--primary)] px-6 py-2 text-[var(text-color)]" type="button" @click="router.push(`/teacher/course/${route.params.courseCode}`)">
        Return To Class Page
      </button>
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
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course",
  requiresAuth: true,
  redirectIfAuth: false
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { teacherCurrentCourse } = storeToRefs(userStore);
useSeoMeta({
  title: () => `${teacherCurrentCourse.value?.name ?? "Class Details"} - Roster List`
});

const courseId = Number(route.params.courseCode);

const searchTerm = ref("");
const students = ref<StudentData[]>([]);
const showDeleteModal = ref(false);
const deleteStep = ref<1 | 2>(1);
const deleteType = ref<"student">();
const currentStudentId = ref<number>();
watch(deleteType, (type) => {
  if (type) return (showDeleteModal.value = true);
});
watch(showDeleteModal, (val) => {
  if (!val) {
    deleteStep.value = 1;
    deleteType.value = undefined;
  }
});

const filteredStudents = computed(() =>
  students.value.filter((student) => student.firstName.toLowerCase().includes(searchTerm.value.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.value.toLowerCase()))
);

onMounted(async () => {
  const { data, error } = await tryRequestEndpoint<StudentData[]>(`courses/${courseId}/teacher/student-list/`);
  if (error) return console.error(error);
  students.value = data;
});

async function removeStudent(student: StudentData) {
  currentStudentId.value = student.id;
  showDeleteModal.value = true;
  deleteType.value = "student";
}

async function confirmDelete() {
  if (deleteType.value === "student" && currentStudentId.value !== undefined) {
    const student = students.value.find((s) => s.id === currentStudentId.value);
    if (student) {
      students.value.splice(students.value.indexOf(student), 1);
      const { error } = await tryRequestEndpoint<StudentData[]>(`courses/teacher/remove-student/${courseId}/${student.id}`, "DELETE");
      if (error) return console.error(error);
    }
    showDeleteModal.value = false;
    deleteType.value = undefined;
    currentStudentId.value = undefined;
    deleteStep.value = 1;
  }
}
</script>

<style scoped></style>
