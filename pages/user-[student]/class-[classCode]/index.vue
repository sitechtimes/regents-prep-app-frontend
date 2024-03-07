<script setup lang="ts">
import { ref } from "vue";
import { userState } from "~/stores/users";
import CurrentAssignments from "../../components/StudentComponents/CurrentAssignments.vue";
import PastAssignments from "../../components/StudentComponents/PastAssignments.vue";
import { currentA, pastA } from "../../../tempArray.js";
import { currentAssignments, pastAssignments } from "~/interfaces/interfaces";

let toggle = ref("Current");
let CurrentStatus = ref(true);
let PastStatus = ref(false);
function toggleAssignments() {
  if (CurrentStatus.value == true) {
    CurrentStatus.value = false;
    PastStatus.value = true;
    toggle.value = "Past";
  } else {
    CurrentStatus.value = true;
    PastStatus.value = false;
    toggle.value = "Current";
  }
}
const currentArr: currentAssignments = [];
const pastArr: pastAssignments = [];
(function () {
  currentA.forEach((assignment: any) => {
    if (currentArr.includes(assignment.date)) {
    } else {
      currentArr.push(assignment.date);
    }
  });
  pastA.forEach((assignment: any) => {
    if (pastArr.includes(assignment.date)) {
    } else {
      pastArr.push(assignment.date);
    }
  });
})();

definePageMeta({
  middleware: () => {
    const userStore = userState();
    userStore.$studentCheck();
  },
});
</script>

<template>
  <div class="max-w-md mx-auto md:max-w-2xl">
    <div
      class="h-[38px] flex flex-row justify-between mb-[1rem] text-[26px] font-medium"
    >
      <div class="pr-5 flex items-center bg-yellow-50 rounded-[27px]">
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
      v-for="assignment in currentArr"
      :date="assignment"
    />
    <PastAssignments
      v-if="PastStatus"
      v-for="assignment in pastArr"
      :date="assignment"
    />
  </div>
</template>

<style scoped>
input:checked + .slider {
  background-color: #426b1f;
}
input:checked + .slider:before {
  transform: translateX(30px);
}
</style>
