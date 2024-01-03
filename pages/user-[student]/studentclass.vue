<script setup lang="ts">
import { ref, onMounted } from "vue";
import CurrentAssignments from "../components/CurrentAssignments.vue";
import PastAssignments from "../components/PastAssignments.vue";
import { currentA, pastA } from "../tempArray";

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

/* const currentDates: { date: string }[] = [];
const pastDates: { date: string }[] = [];
(function () {
  currentA.forEach((e: any) => {
    if (currentDates.includes(e.date)) {
    } else {
      currentDates.push(e.date);
    }
  });
  pastA.forEach((e: any) => {
    if (pastDates.includes(e.date)) {
    } else {
      pastDates.push(e.date);
    }
  });
})(); */

console.log(currentA[1].assignments[0].name);
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
    </div>

    <CurrentAssignments
      v-if="CurrentStatus"
      v-for="a in currentA"
      :currentAssignmentDate="a.date"
    />
    <PastAssignments
      v-if="PastStatus"
      v-for="a in pastA"
      :pastAssignmentDate="a.date"
    />
  </div>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  height: 100%;
  aspect-ratio: 1.75;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 32px;
  aspect-ratio: 1;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #426b1f;
}

input:focus + .slider {
  box-shadow: 0 0 1px #426b1f;
}

input:checked + .slider:before {
  -webkit-transform: translateX(28px);
  -ms-transform: translateX(28px);
  transform: translateX(28px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
