<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-gray py-12">
    <div class="flex items-center justify-center flex-col bg-[color:var(--bg-color)] p-4 rounded-3xl mb-4">
      <h1 class="text-5xl font-bold mb-4">Create New Class</h1>
      <form class="login flex items-center justify-center flex-col gap-7 w-full" @submit="createNewClass" @submit.prevent>
        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="class-name">Class Name <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[var(--bg-color)]"
            id="class-name"
            type="class-name"
            required
            v-model="className"
          />
        </div>
        <div class="relative flex items-start justify-center flex-col gap-1">
          <label for="course-type">Choose Course Type <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <select
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[var(--bg-color)]"
            name="course-type"
            id="course-type"
            required
            v-model="selectedOption"
          >
            <option v-for="regents in regentsTypes" :key="regents.id" :value="regents.name">{{ regents.name }}</option>
          </select>
        </div>
        <button class="du-btn du-btn-wide du-btn-md bg-green-accent" onclick="my_modal_3.showModal()">Create</button>
        <dialog id="my_modal_3" class="modal rounded-2xl w-2/6 h-30 p-6">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute rounded-full right-2 top-2 h-8 w-8 text-sm duration-300 hover:bg-[var(--gray)]">✕</button>
            </form>
            <h3 class="text-xl font-bold">Congrats!</h3>
            <p class="py-4 text-md">You've made a new {{ selectedOption }} class - "{{ className }}"</p>
          </div>
        </dialog>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher"
});

const className = ref("");
const selectedOption = ref("");
const router = useRouter();

interface regents {
  id: number;
  name: string;
}

const regentsTypes: regents[] = [
  { id: 1, name: "Physics" },
  { id: 2, name: "Algebra" },
  { id: 3, name: "Chemistry" }
];

function createNewClass() {
  console.log("you created a new class!");
  router.push("/teacher/dashboard");
}
</script>

<style scoped></style>
