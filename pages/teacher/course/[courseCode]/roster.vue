<template>
  <div class="flex w-full flex-col items-center py-12">
    <div class="relative flex w-full flex-col items-center justify-center gap-1">
      <input
        class="mb-6 h-10 w-2/3 rounded-lg border bg-[var(--bg-color)] px-2 py-1 transition-all duration-500 hover:border-[var(--primary)]"
        type="text"
        placeholder="Search for Student..."
        v-model="searchTerm"
        @click=""
      />
      <div class="items relative flex w-full items-center justify-center overflow-x-auto rounded-b-box rounded-se-box">
        <table class="table w-3/4">
          <thead>
            <tr class="border-b border-[#d6d6d6]">
              <th class="py-3 pl-10 text-start font-bold">First Name</th>
              <th class="py-3 pl-10 text-start font-bold">Last Name</th>
              <th class="py-3 font-bold">Remove Student</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t" v-for="(student, index) in filteredStudents" :key="student.id">
              <td class="py-3 pl-10">{{ student.firstName }}</td>
              <td class="py-3 pl-10">{{ student.lastName }}</td>
              <td class="flex items-center justify-center py-3">
                <button @click="removeStudent(index)" class="btn btn-sm transition-200 flex h-8 items-center justify-center rounded-xl bg-[#fd7e78] p-3 hover:brightness-125">✕</button>
              </td>
            </tr>
            <tr v-if="filteredStudents.length === 0" class="border-t">
              <td colspan="4" class="items-center justify-center px-10 py-3 text-center">No students</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="router.push(`/teacher/course/${route.params.courseCode}`)" class="mt-6 rounded-xl bg-[var(--primary)] px-6 py-2 text-[var(text-color)]">Return To Class Page</button>
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

const searchTerm = ref("").value.toLowerCase();
const courseId = Number(route.params.courseCode);
const { courses, currentCourse, initComplete } = storeToRefs(userStore);

const students: Ref<TeacherStudentList[]> = ref([]);
const filteredStudents: Ref<TeacherStudentList[]> = ref([]);

async function getStudents() {
  try {
    const fetchedStudents = await getCourseStudents(courseId);
    students.value = fetchedStudents;
    filteredStudents.value = students.value.filter((student) => student.firstName.toLowerCase().includes(searchTerm) || student.lastName.toLowerCase().includes(searchTerm));

    /*     watch(searchTerm, () => {
  filteredStudents.value = students.value.filter((student) =>
    student.firstName.toLowerCase().includes(searchTerm) ||
    student.lastName.toLowerCase().includes(searchTerm)
  );
}); */
  } catch (error) {
    console.error("Error fetching students:", error);
  }
}

async function removeStudent(index: number) {
  const studentId = filteredStudents.value[index].id;
  const courseId = Number(route.params.courseCode);
  try {
    await removeStudents(courseId, studentId);
    filteredStudents.value.splice(index, 1);
  } catch (error) {
    console.error(error);
  }
}

async function getCourse() {
  if (!initComplete.value) return;
  const courseId = Number(route.params.courseCode);

  currentCourse.value = courses.value.find((course) => course.id === courseId);
  if (!currentCourse.value) return router.push(`/teacher/dashboard?course=${courseId}`);
}

onMounted(async () => {
  getCourse();
  getStudents();
});

userStore.$subscribe(async () => {
  getCourse();
  getStudents();
});
</script>

<style scoped></style>
