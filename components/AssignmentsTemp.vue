<script setup lang="ts">
import { ref, onMounted } from "vue";
import { currentA } from "../tempArray.js";

const props = defineProps({
  name: String,
  questions: String,
});
let n = props.name;

const currentDates: any[] = [];
(function () {
  currentA.forEach((e: any) => {
    if (currentDates.includes(e.date)) {
    } else {
      currentDates.push(e.date);
    }
  });
})();

const assignmentsArr: any[] = [];
(function () {})();

let datevalue = ref(true);
(function () {
  for (let i = 0; i < currentDates.length; i++) {
    if (currentDates[i] === n) {
      let datevalue = true;
    }
  }
})();
</script>

<template>
  <div class="">
    <div
      v-if="datevalue"
      class="w-max h-[75px] mb-[2rem] flex flex-row relative bg-purple-400 bg-opacity-50 rounded-full shadow-black shadow-innervar hover:shadow-none"
    >
      <div class="text-[50px] px-[2rem] font-medium">{{ name }}</div>

      <div
        class="w-[75px] h-full right-[0%] bg-purple-400 rounded-full shadow-black shadow-innervar"
      >
        <div
          class="w-full h-full text-center text-white text-[50px] font-medium"
        >
          {{ questions }}
        </div>
      </div>
    </div>
  </div>
</template>
