<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-gray py-12">
    <div class="flex items-center justify-center flex-col bg-[color:var(--bg-color)] p-4 rounded-3xl mb-4">
      <h1 class="text-5xl font-bold mb-4">Create New Class</h1>
      <form class="login flex items-center justify-center flex-col gap-7 w-full" @submit="createNewClass" @submit.prevent>
        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="class-name">Class Name <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[var(--bg-fadded-color)]"
            id="class-name"
            type="class-name"
            required
            v-model="className"
          />
        </div>
        <div class="relative flex items-start justify-center flex-col gap-1">
          <label for="course-type">Choose Course Type <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <select
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[var(--bg-fadded-color)]"
            name="course-type"
            id="course-type"
          >
            <option value="" seletced></option>
            <option value="">physics</option>
          </select>
        </div>
        <button class="du-btn du-btn-wide du-btn-md bg-green-accent">Create</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher"
});

const className = ref("");

function createNewClass() {}
</script>

<style scoped></style>
