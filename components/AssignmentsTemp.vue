<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import { currentA } from "../tempArray.js";

const props = defineProps({
  name: String,
  questions: String,
});
const instance = getCurrentInstance();
const parentDate = instance.parent?.exposed.props.a;
let dateValue = true;
const filter = currentA.filter((a) => a.date === parentDate);
console.log(parentDate, props.name);

console.log(filter, dateValue);
</script>

<template>
  <div
    v-if="dateValue"
    class="w-max h-[75px] mb-[2rem] flex flex-row relative bg-purple-400 bg-opacity-50 rounded-full shadow-black shadow-innervar hover:shadow-none"
  >
    <div class="text-[50px] px-[2rem] font-medium">{{ name }}</div>

    <div
      class="w-[75px] h-full right-[0%] bg-purple-400 rounded-full shadow-black shadow-innervar"
    >
      <div class="w-full h-full text-center text-white text-[50px] font-medium">
        {{ questions }}
      </div>
    </div>
  </div>
</template>

<style></style>
