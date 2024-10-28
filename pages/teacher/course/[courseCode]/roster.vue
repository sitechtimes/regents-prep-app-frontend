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
        <table class="table flex items-center justify-center">
          <thead>
            <tr>
              <th class="py-3 px-10">Class {{ route.params.courseCode }}</th>
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
                <button @click="removeStudent(index)" class="btn btn-sm h-8 w-8 rounded-full transition-300 hover:bg-[var(--gray)] flex items-center justify-center">✕</button>
              </td>
            </tr>
            <tr v-if="filteredStudents.length === 0" class="border-t">
              <td colspan="4" class="text-center items-center justify-center py-3 px-10">No results found</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="pushUserBack" class="du-btn du-btn-wide du-btn-md bg-green-accent mt-4">Return To Class Page</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const searchTerm = ref("");

type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

//placeholder array
const students: Student[] = [
  { id: 1, firstName: "Abigail", lastName: "Labanok" },
  { id: 2, firstName: "Andrea", lastName: "Guo" },
  { id: 3, firstName: "Bridget", lastName: "Feng" }
];

const filteredStudents = computed(() => {
  return students.filter((student) => student.firstName.toLowerCase().includes(searchTerm.value.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

function removeStudent(index: number): void {
  students.splice(index, 1);
}

function pushUserBack() {
  router.push(`/teacher/course/${route.params.courseCode}`);
}
</script>

<style scoped></style>
