<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-gray py-12">
    <div class="flex items-center justify-center flex-col bg-[color:var(--bg-color)] p-4 rounded-3xl mb-4">
      <h1>Create New Class</h1>
      <div class="relative flex items-start justify-center flex-col gap-1">
        <label for="class-name">Class Name:</label>
        <input id="class-name" type="class-name" required v-model="className" />
      </div>
      <div>
        <label for="">Choose Course Type:</label>
        <select name="" id=""></select>
      </div>
      <button>Create</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const className = ref("");
</script>

<style scoped></style>
