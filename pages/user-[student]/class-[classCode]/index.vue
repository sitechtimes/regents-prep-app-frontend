<script setup lang="ts">
import studentAuth from "~/middleware/studentAuth";
import { userState } from "~/stores/users";
import { useQuestions } from "~/stores/questions";
import {
  currentA,
  pastA,
} from "../../../constants/tempArray";

import * as data from "~/json/getstudentcourses.json";
import { userClass } from "~/stores/class";
import {
  Assignment,
  assignmentDetails,
} from "~/interfaces/interfaces";

const router = useRouter();
const userStore = userState();
const userQuestions = useQuestions();
const classDetails = userClass();

const props = defineProps<{
  assignments: Assignment;
}>();

/* const qLeft = ref(props.assignment.qLeft); */
const classCode = ref(userQuestions.classCode);

let toggle = ref("Current");
let CurrentStatus = ref(true);
let PastStatus = ref(false);
function toggleAssignments() {
  CurrentStatus.value = !CurrentStatus.value;
  PastStatus.value = !PastStatus.value;
  if (CurrentStatus.value === false) {
    toggle.value = "Past";
  } else {
    toggle.value = "Current";
  }
}
(function () {
  classDetails.assignments.forEach(
    (assignment: assignmentDetails) => {
      if (
        !classDetails.currentAssignments.some(
          (item) => item.datetime_due === assignment.datetime_due
        )
      ) {
        classDetails.pastAssignments.push({
          id: assignment.id,
          name: assignment.name,
          datetime_due: assignment.datetime_due,
        });
      }
    }
  );
})();

onUnmounted(() => {
  //  classDetails.$reset();
});

definePageMeta({
  middleware: studentAuth,
});
</script>

<template>
  <div class="h-fit bg-bg-reg">
    <div
      class="h-[38px] flex flex-row justify-between mb-[1rem] text-[26px] font-medium"
    >
      <div
        class="h-[60px] w-[470px] text-[35px] ml-[80px] mt-[15px] flex items-center bg-bg-light rounded-[27px]"
      >
        <label
          class="switch relative inline-block h-full aspect-[1.75]"
        >
          <input
            class="opacity-0 w-0 h-0"
            @click="toggleAssignments"
            type="checkbox"
            checked
          />
          <span
            class="slider round border-black border-[1px] absolute right-4 before:absolute cursor-pointer inset-0 rounded-[34px] before:rounded-[50%] duration-[0.4s] before:duration-[0.4s] bg-[#ccc] before:bg-bg-dark before:border-[1px] before:border-black before:content[''] before:h-full before:aspect-square"
          ></span>
        </label>

        <div class="w-[80%] right-[0%] text-center m-auto">
          {{ toggle }} Assignments
        </div>
      </div>

      <button
        v-if="CurrentStatus"
        v-on:click="
          router.push({
            path: `/user-${userStore.username}/class-${classCode}/assignment-${userQuestions.assignmentName}`,
          }),
        "
        class="h-[60px] w-[370px] text-[35px] mr-[100px] mt-[15px] text-center text-white bg-secondary rounded-[27px] shadow-innervar shadow-black justify-center items-center hover:scale-105 hover:drop-shadow-2xl duration-300 hover:shadow-transparent"
      >
        Start Assignment
      </button>
      <button
        v-if="PastStatus"
        class="h-[60px] w-[370px] text-[35px] mr-[100px] mt-[15px] text-center text-white bg-secondary rounded-[27px] shadow-innervar shadow-black justify-center items-center hover:scale-105 hover:drop-shadow-2xl duration-300 hover:shadow-transparent"
      >
        View Statistics
      </button>
    </div>

    <div class="max-w-md mx-auto md:max-w-2xl">
      <StudentComponentsCurrentAssignments
        v-if="CurrentStatus"
        v-for="assignment in classDetails.currentAssignments"
        :date="assignment.datetime_due"
      />
      <StudentComponentsPastAssignments
        v-if="PastStatus"
        v-for="assignment in classDetails.pastAssignments"
        :date="assignment.datetime_due"
      />
    </div>
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
