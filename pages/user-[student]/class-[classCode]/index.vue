<script setup lang="ts">
import studentAuth from "~/middleware/studentAuth";
import { userState } from "~/stores/users";
import { useQuestions } from "~/stores/questions";
import { userClass } from "~/stores/class";
import { studentAssignments } from "~/interfaces/interfaces";

const router = useRouter();
const userStore = userState();
const userQuestions = useQuestions();
const classStore = userClass();

const classCode = ref(classStore.classCode);

let assignmentStatus = classStore.assignmentStatus;
let CurrentStatus = ref<boolean>(true);
let PastStatus = ref<boolean>(false);
function toggleAssignments() {
  CurrentStatus.value = !CurrentStatus.value;
  PastStatus.value = !PastStatus.value;
  if (assignmentStatus === "Current") {
    CurrentStatus.value = true;
    PastStatus.value = false;
    console.log("current");
  } else if (assignmentStatus === "Past") {
    CurrentStatus.value = false;
    PastStatus.value = true;
    console.log("past");
  } else {
    console.error();
  }
}

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
      <select
        name="assignments"
        id="assignmentSelect"
        v-model="assignmentStatus"
        @change="toggleAssignments"
      >
        <option disabled selected>Select Assignment</option> 
        <option value="Current">Current Assignments</option>
        <option value="Past">Past Assignments</option>
      </select>

      <button
        v-if="CurrentStatus"
        v-on:click="
          async function update() {
            await userQuestions.$updateState(
              classStore.tempSelectedAssignment as studentAssignments,
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
        v-for="assignment in classStore.currentAssignments"
        :date="assignment.datetime_due"
      />
      <StudentComponentsPastAssignments
        v-if="PastStatus"
        v-for="assignment in classStore.pastAssignments"
        :date="assignment.datetime_due"
      />
    </div>
  </div>
</template>