<script setup lang="ts">
const props = defineProps({
  name: { type: String },
  month: { type: Number },
  day: { type: Number },
});
</script>

<template>
  <div
    class="max-w-min m-2.5 h-[57px] flex items-center justify-center drop-shadow-md shadow-black bg-primary bg-opacity-62 rounded-full relative shadow-2xl"
  >
    <div class="static w-max mx-12">
      <h2
        id="assignmentName"
        class="text-[36px] place-content-center text-black"
      >
        {{ name }}
      </h2>
    </div>
    <div
      class="flex-col items-center text-center place-content-center justify-center flex right-0 rounded-[73.50px] shadow-innertop shadow-black bg-[#8B9930] h-[57px] w-[107px]"
    >
      <h3
        id="dueDate"
        class="text-[21px] place-content-center m-auto text-white"
      >
        Due: {{ month }}/{{ day }}
      </h3>
    </div>
  </div>
</template>

<style></style>
