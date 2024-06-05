<script setup lang="ts">
import studentAuth from "~/middleware/studentAuth";
import { userState } from "~/stores/users";
import { useQuestions } from "~/stores/questions";
import { userClass } from "~/stores/class";

const router = useRouter();
const userStore = userState();
const userQuestions = useQuestions();
const classStore = userClass();

const classCode = ref(classStore.classCode);

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
/* (function () {
  classStore.assignments.forEach((assignment: studentAssignments) => {
    if (
      !classStore.currentAssignments.some(
        (item) => item.datetime_due === assignment.datetime_due
      )
    ) {
      classStore.pastAssignments.push({
        id: assignment.id,
        name: assignment.name,
        datetime_due: assignment.datetime_due,
        datetime_assigned: assignment.datetime_assigned,
        question_number: assignment.question_number,
        timer_style: assignment.timer_style,
        time_allotted: assignment.time_allotted,
        attempts_allowed: assignment.attempts_allowed,
        questions_completed: assignment.questions_completed,
      });
    }
  });
})(); */

const currentDates = ref<Array<string>>([]);
const pastDates = ref<Array<string>>([]);
(async function () {
  classStore.currentAssignments.forEach((assignment1: any) => {
    const date = assignment1.datetime_due;
    if (!currentDates.value.some((item) => item === date)) {
      currentDates.value.push(date);
    }
  });
  classStore.pastAssignments.forEach((assignment2: any) => {
    const date = assignment2.datetime_due;
    if (!pastDates.value.some((item) => item === date)) {
      pastDates.value.push(date);
    }
  });
})();

onMounted(async () => {
  //  await classStore.$getCourseAssignments(classStore.courseId);
});
onUnmounted(() => {
  // classStore.$reset();
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
        <label class="switch relative inline-block h-full aspect-[1.75]">
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
          async function update() {
            await userQuestions.$updateState(
              classStore.tempSelectedAssignment,
              classStore.classCode
            );
          }
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
        v-for="assignment in currentDates"
        :date="assignment"
      />
      <StudentComponentsPastAssignments
        v-if="PastStatus"
        v-for="assignment in pastDates"
        :date="assignment"
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
