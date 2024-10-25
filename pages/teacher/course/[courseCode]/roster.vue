<template>
  <div>
    <h1>Class {{ route.params.courseCode }}</h1>
    <div class="relative flex items-start justify-center flex-col gap-1">
      <div>
        <label class="input input-bordered flex items-center gap-2 min-w-[18rem] max-w-4xl">
          <input type="text" class="grow" placeholder="Search" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
          </svg>
        </label>
      </div>
      <div class="rounded-b-box rounded-se-box relative overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Remove Student</th>
            </tr>
          </thead>
          <tbody class="border-t" v-for="student in students" :key="student.id">
            <tr>
              <th class="py-3 px-4">{{ student.id }}</th>
              <td class="py-3 px-4">{{ student.firstName }}</td>
              <td class="py-3 px-4">{{ student.lastName }}</td>
              <td class="py-3 px-4 place-content-center"><button>✕</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="pushUserBack" class="du-btn du-btn-wide du-btn-md bg-green-accent">Return To Class Page</button>
    </div>
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
