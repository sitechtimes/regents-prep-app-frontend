<script setup lang="ts">
const props = defineProps({
  name: { type: String },
  month: { type: Number },
  day: { type: Number },
});
</script>

<template>
  <div
    class="max-w-min m-2.5 h-[57px] flex flex-col items-center justify-center bg-[#AAB941] bg-opacity-62 rounded-full relative shadow-2xl"
  >
    <div class="static w-max mx-16">
      <h2
        id="assignmentName"
        class="text-[36px] place-content-center text-black"
      >
        {{ name }}
      </h2>
    </div>
    <div
      class="flex flex-col items-center justify-center absolute right-0 rounded-[73.50px] shadow-black bg-[#8B9930] h-[57px] w-[107px]"
    >
      <h3 id="dueDate" class="text-[21px] text-center text-white">
        Due: {{ month }}/{{ day }}
      </h3>
    </div>
  </div>
</template>

<style></style>
