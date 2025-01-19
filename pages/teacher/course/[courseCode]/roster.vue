<template>
  <div class="flex min-h-screen w-screen flex-col items-center justify-center py-12">
    <div class="relative flex flex-col items-center justify-center gap-1">
      <input
        v-model="searchTerm"
        class="mb-6 h-10 w-96 rounded-lg border bg-[var(--bg-color)] px-2 py-1 transition-all duration-500 hover:border-[var(--primary)]"
        type="text"
        placeholder="Search for Student..."
      />
      <div class="items relative overflow-x-auto rounded-b-box rounded-se-box">
        <table class="table items-center justify-center">
          <thead>
            <tr>
              <th class="px-10 py-3"></th>
              <th class="px-10 py-3">First Name</th>
              <th class="px-10 py-3">Last Name</th>
              <th class="px-10 py-3">Remove Student</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in filteredStudents" :key="student.id" class="border-t">
              <th class="px-10 py-3">{{ student.id }}</th>
              <td class="px-10 py-3">{{ student.firstName }}</td>
              <td class="px-10 py-3">{{ student.lastName }}</td>
              <td class="flex items-center justify-center px-10 py-3">
                <button class="btn btn-sm transition-300 flex h-8 w-8 items-center justify-center rounded-full pt-0.5 hover:bg-[var(--gray)]" type="button" @click="removeStudent(index)">✕</button>
              </td>
            </tr>
            <tr v-if="filteredStudents.length === 0" class="border-t">
              <td colspan="4" class="items-center justify-center px-10 py-3 text-center">No students</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="mt-4 rounded-xl bg-[var(--primary)] px-6 py-2 text-[var(text-color)]" type="button" @click="router.push(`/teacher/course/${route.params.courseCode}`)">
        Return To Class Page
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();

const searchTerm = ref("");

// does this even work?
// TODO: actually get students
const students = ref<TeacherStudentList[]>([]);

const filteredStudents = computed(() =>
  students.value.filter((student) => student.firstName.toLowerCase().includes(searchTerm.value.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.value.toLowerCase()))
);

function removeStudent(index: number) {
  students.value.splice(index, 1);
}
</script>

<style scoped></style>
