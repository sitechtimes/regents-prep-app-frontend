<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
});
</script>

<template>
  <div
    class="w-[549px] h-[57px] flex flex-col items-center justify-center bg-[#AAB941] bg-opacity-62 rounded-full"
  >
    <h2 id="assignmentName" class="place-content-center text-black">
      {{ name }}
    </h2>
    <div>
      <h3 id="dueDate" class="text-black">Due: {{ month }}/{{ day }}</h3>
    </div>
  </div>
</template>

<style></style>
