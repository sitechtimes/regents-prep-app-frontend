<template>
  <div>
    <h1>Class {{ route.params.courseCode }}</h1>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Remove Student</th>
          </tr>
        </thead>
        <tbody v-for="student in students" :key="student.id">
          <!-- row 1 -->
          <tr>
            <th></th>
            <td>{{ student.firstName }}</td>
            <td>{{ student.lastName }}</td>
            <td><button>✕</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="pushUserBack" class="du-btn du-btn-wide du-btn-md bg-green-accent">Return To Class Page</button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

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

function pushUserBack() {
  router.push(`/teacher/course/${route.params.courseCode}`);
}
</script>

<style scoped></style>
