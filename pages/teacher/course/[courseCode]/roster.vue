<template>
  <div class="flex w-full flex-col items-center py-12">
    <div class="relative flex w-full flex-col items-center justify-center gap-1">
      <input
        class="mb-6 h-10 w-2/3 rounded-lg border bg-[var(--bg-color)] px-2 py-1 transition-all duration-500 hover:border-[var(--primary)]"
        type="text"
        placeholder="Search for Student..."
        v-model="searchTerm"
      />
      <div class="items relative flex w-full items-center justify-center overflow-x-auto rounded-b-box rounded-se-box">
        <table class="table w-3/4 items-center justify-center">
          <thead>
            <tr>
              <th class="px-10 py-3">First Name</th>
              <th class="px-10 py-3">Last Name</th>
              <th class="px-10 py-3">Remove Student</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t" v-for="(student, index) in filteredStudents" :key="student.id">
              <td class="justify-center justify-items-center px-10 py-3">{{ student.firstName }}</td>
              <td class="px-10 py-3">{{ student.lastName }}</td>
              <td class="px-10 py-3">
                <button @click="removeStudent(index)" class="btn btn-sm transition-300 flex h-8 items-center justify-center rounded-xl bg-[#fd7e78] p-3 hover:brightness-110">Remove</button>
              </td>
            </tr>
            <tr v-if="filteredStudents.length === 0" class="border-t">
              <td colspan="4" class="items-center justify-center px-10 py-3 text-center">No students</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="router.push(`/teacher/course/${route.params.courseCode}`)" class="mt-4 rounded-xl bg-[var(--primary)] px-6 py-2 text-[var(text-color)]">Return To Class Page</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import studentList from "~/server/api/courses/[courseId]/teacher/student-list";

definePageMeta({
  layout: "teacher",
  middleware: "auth",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const searchTerm = ref("");
const { courses, currentCourse, initComplete } = storeToRefs(userStore);

const courseId = Number(route.params.courseCode);

/* const students = await getCourseStudents(courseId); */
const filteredStudents = ref<TeacherStudentList[]>([]);

/* const filteredStudents = computed(() =>
  students.value.filter((student) => student.firstName.toLowerCase().includes(searchTerm.value.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.value.toLowerCase()))
); */

onMounted(async () => {
  getCourse();
  getStudents();
});

userStore.$subscribe(async () => {
  getCourse();
  getStudents();
});

async function getCourse() {
  if (!initComplete.value) return;
  const courseId = Number(route.params.courseCode);

  currentCourse.value = courses.value.find((course) => course.id === courseId);
  if (!currentCourse.value) return router.push(`/teacher/dashboard?course=${courseId}`);
}

async function getStudents() {
  try {
    const students = await getCourseStudents(courseId);
    filteredStudents.value = students.filter(
      (student) => student.firstName.toLowerCase().includes(searchTerm.value.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  } catch (error) {
    console.error("Error fetching assignments:", error);
  }
}

function removeStudent(index: number) {
  filteredStudents.value.splice(index, 1);
}

onMounted(async () => {
  await getCourseStudents;
});
</script>

<style scoped></style>
