<template>
  <div>
    <h1>roster view for class {{ route.params.courseCode }}</h1>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          <!-- row 2 -->
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="pushUserBack">Return To Class Page</button>
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
