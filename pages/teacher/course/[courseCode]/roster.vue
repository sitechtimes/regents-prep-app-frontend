<template>
  <div class="flex w-full flex-col items-center py-12">
    <div class="relative flex w-full flex-col items-center justify-center gap-1">
      <input
        v-model="searchTerm"
        class="mb-6 h-10 w-2/3 rounded-lg border bg-[var(--bg-color)] px-2 py-1 transition duration-500 hover:border-[var(--primary)] focus:outline focus:outline-2 focus:outline-[color:var(--primary)]"
        type="text"
        placeholder="Search for Student..."
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
            <tr v-for="student in filteredStudents" :key="student.id" class="border-t">
              <td class="py-3 pl-10">{{ student.firstName }}</td>
              <td class="py-3 pl-10">{{ student.lastName }}</td>
              <td class="flex items-center justify-center py-3">
                <button class="btn btn-sm transition-200 flex h-8 items-center justify-center rounded-xl bg-[#fd7e78] p-3 hover:brightness-125" type="button" @click="removeStudent(student)">✕</button>
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "teacher-get-course",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const courseId = Number(route.params.courseCode);

const searchTerm = ref("");

const students = ref<TeacherStudentList[]>([]);

const filteredStudents = computed(() =>
  students.value.filter((student) => student.firstName.toLowerCase().includes(searchTerm.value.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.value.toLowerCase()))
);

onMounted(async () => {
  try {
    students.value = await getCourseStudents(courseId);
  } catch (error) {
    console.error(error);
  }
});

async function removeStudent(student: TeacherStudentList) {
  try {
    students.value.splice(students.value.indexOf(student), 1);
    await removeStudents(courseId, student.id);
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped></style>
