<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen py-12">
    <div class="relative flex items-center justify-center flex-col gap-1">
      <input
        class="input input-bordered w-96 h-10 mb-6 px-2 py-1 rounded-lg border-2 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[var(--bg-color)]"
        type="text"
        placeholder="Search Student..."
        v-model="searchTerm"
      />
      <div class="rounded-b-box rounded-se-box relative overflow-x-auto items">
        <table class="table items-center justify-center">
          <thead>
            <tr>
              <th class="py-3 px-10"></th>
              <th class="py-3 px-10">First Name</th>
              <th class="py-3 px-10">Last Name</th>
              <th class="py-3 px-10">Remove Student</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t" v-for="(student, index) in filteredStudents" :key="student.id">
              <th class="py-3 px-10">{{ student.id }}</th>
              <td class="py-3 px-10">{{ student.firstName }}</td>
              <td class="py-3 px-10">{{ student.lastName }}</td>
              <td class="py-3 px-10 flex items-center justify-center">
                <button @click="removeStudent(index)" class="btn btn-sm h-8 w-8 pt-0.5 rounded-full transition-300 hover:bg-[var(--gray)] flex items-center justify-center">✕</button>
              </td>
            </tr>
            <tr v-if="filteredStudents.length === 0" class="border-t">
              <td colspan="4" class="text-center items-center justify-center py-3 px-10">No results found</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="router.push(`/teacher/course/${route.params.courseCode}`)" class="du-btn du-btn-wide du-btn-md bg-green-accent mt-4">Return To Class Page</button>
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

const students = await getCourseStudents(courseId);

const filteredStudents = computed(() =>
  students.value.filter((student) => student.firstName.toLowerCase().includes(searchTerm.value.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.value.toLowerCase()))
);

onMounted(async () => {
  getCourse();
});

userStore.$subscribe(async () => {
  getCourse();
});

async function getCourse() {
  if (!initComplete.value) return;
  const courseId = Number(route.params.courseCode);

  currentCourse.value = courses.value.find((course) => course.id === courseId);
  if (!currentCourse.value) return router.push(`/teacher/dashboard?course=${courseId}`);
}

function removeStudent(index: number) {
  students.value.splice(index, 1);
}

onMounted(async () => {
  await getCourseStudents;
});
</script>

<style scoped></style>
