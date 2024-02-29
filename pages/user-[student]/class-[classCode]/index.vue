<script setup lang="ts">
import { ref } from "vue";
import CurrentAssignments from "../../components/StudentComponents/CurrentAssignments.vue";
import PastAssignments from "../../components/StudentComponents/PastAssignments.vue";
import { currentA, pastA } from "../../../tempArray.js";

let toggle = ref("Current");
let CurrentStatus = ref(true);
let PastStatus = ref(false);
function toggleAssignments() {
  if (CurrentStatus.value === true) {
    CurrentStatus.value = false;
    PastStatus.value = true;
    toggle.value = "Past";
  } else {
    CurrentStatus.value = true;
    PastStatus.value = false;
    toggle.value = "Current";
  }
}
const currentArr: any[] = [];
const pastArr: any[] = [];
(function () {
  currentA.forEach((e: any) => {
    if (currentArr.includes(e.date)) {
    } else {
      currentArr.push(e.date);
    }
  });
  pastA.forEach((e: any) => {
    if (pastArr.includes(e.date)) {
    } else {
      pastArr.push(e.date);
    }
  });
})();
</script>

<template>
  <div class="h-fit bg-bg-reg">
    <div
      class="h-[38px] flex flex-row justify-between mb-[1rem] text-[26px] font-medium"
    >
      <div class="h-[60px] w-[600px] text-[35px] flex items-center bg-yellow-50 rounded-[27px]">
        <label class="switch relative inline-block h-full aspect-[1.75]">
          <input
            class="opacity-0 w-0 h-0"
            @click="toggleAssignments"
            type="checkbox"
            checked
          />
          <span
            class="slider round absolute before:absolute cursor-pointer inset-0 rounded-[34px] before:rounded-[50%] duration-[0.4s] before:duration-[0.4s] bg-[#ccc] before:bg-white before:content[''] before:h-full before:aspect-square"
          ></span>
        </label>

        <div class="w-[80%] right-[0%] pl-4">{{ toggle }} Assignments</div>
      </div>

      <button
        v-if="CurrentStatus"
        class="h-[60px] w-[350px] text-[35px] text-center text-white bg-secondary rounded-[27px] shadow-innervar shadow-black justify-center items-center hover:scale-105 hover:drop-shadow-2xl duration-300 hover:shadow-transparent"
      >
        Start Assignment
      </button>
      <button
        v-if="PastStatus"
        class="h-[60px] w-[350px] text-[35px] text-center text-white bg-secondary rounded-[27px]"
      >
        View Statistics
      </button>
    </div>
    <div class="max-w-md mx-auto md:max-w-2xl">

    <CurrentAssignments v-if="CurrentStatus" v-for="a in currentArr" :a="a" />
    <PastAssignments v-if="PastStatus" v-for="a in pastArr" :a="a" />
  </div>
  </div>
</template>

<style scoped>
input:checked + .slider {
  background-color: #426b1f; /*cant seem to use the color names from tailwind.config in reg styling */
}
input:checked + .slider:before {
  transform: translateX(30px);
}
</style>
