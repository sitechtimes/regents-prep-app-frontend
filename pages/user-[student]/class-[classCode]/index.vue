<script setup lang="ts">
import { ref } from "vue";
import CurrentAssignments from "../../components/CurrentAssignments.vue";
import PastAssignments from "../../components/PastAssignments.vue";
import { currentA, pastA } from "../../../tempArray.js";

let toggle = ref("Current");
let CurrentStatus = ref(true);
let PastStatus = ref(false);
function toggleAssignments() {
  if (CurrentStatus.value === true) {
    CurrentStatus.value = false;
    toggle.value = "Past";
  } else if (CurrentStatus.value === false) {
    CurrentStatus.value = true;
    toggle.value = "Current";
  }
  if (PastStatus.value === true) {
    PastStatus.value = false;
    toggle.value = "Current";
  } else if (PastStatus.value === false) {
    PastStatus.value = true;
    toggle.value = "Past";
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
  <div class="max-w-md mx-auto md:max-w-2xl">
    <div
      class="h-[38px] flex flex-row justify-between mb-[1rem] text-[26px] font-medium"
    >
      <div class="pr-5 flex items-center bg-yellow-50 rounded-[27px]">
        <label class="switch">
          <input @click="toggleAssignments" type="checkbox" checked />
          <span class="slider round"></span>
        </label>

        <div class="w-[80%] right-[0%] pl-4">{{ toggle }} Assignments</div>
      </div>

      <button
        v-if="CurrentStatus"
        class="px-5 text-center text-white bg-[#C898C8] rounded-[27px]"
      >
        Start Assignment
      </button>
      <button
        v-if="PastStatus"
        class="px-5 text-center text-white bg-[#C898C8] rounded-[27px]"
      >
        View Statistics
      </button>

      <CurrentAssignments v-if="CurrentStatus" v-for="a in currentArr" :a="a" />
      <PastAssignments v-if="PastStatus" v-for="a in pastArr" :a="a" />
    </div>
  </div>
</template>

<style scoped></style>
