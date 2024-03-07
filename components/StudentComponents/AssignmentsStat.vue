<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { pastA } from "../../tempArray.js";
const props = defineProps({
  name: String,
  score: String,
});
const instance = getCurrentInstance();
const parentDate = instance.parent?.exposed.props.date;
let dateValue = false;
const filter = pastA.filter((assignment) => assignment.date === parentDate);
filter.forEach((assignment) => {
  if (assignment.name.includes(props.name)) {
    dateValue = true;
  }
});
</script>

<template>
  <div
    v-if="dateValue"
    class="w-max h-[75px] mb-[2rem] flex flex-row relative bg-purple-400 bg-opacity-50 rounded-full shadow-black shadow-innervar hover:shadow-none"
  >
    <div class="text-[50px] px-[2rem] font-medium">{{ name }}</div>

    <div
      class="w-[100px] h-full right-[0%] bg-purple-400 rounded-full shadow-black shadow-innervar"
    >
      <div class="w-full h-full text-center text-white text-[50px] font-medium">
        {{ score }}
      </div>
    </div>
  </div>
</template>
