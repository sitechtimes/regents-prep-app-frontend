<script setup lang="ts">
import studentAuth from "~/middleware/studentAuth";
import { userState } from "~/stores/users";
import { useQuestions } from "~/stores/StudentStore/questions";
import { userClass } from "~/stores/StudentStore/class";
import { studentAssignments } from "~/interfaces/interfaces";

const router = useRouter();
const userStore = userState();
const userQuestions = useQuestions();
const classStore = userClass();

const classCode = ref(classStore.classCode);

const assignmentStatus = classStore.assignmentStatus;
const currentStatus = ref<boolean>(true);
const pastStatus = ref<boolean>(false);
function toggleAssignments() { //changes whether the status of the page is current or past based on what assignment option is selected
  currentStatus.value = !currentStatus.value;
  pastStatus.value = !pastStatus.value;
  if (assignmentStatus === "Current") { //checks if status is current --> if it is, then current status is set to true, which loads current assignments
    currentStatus.value = true;
    pastStatus.value = false;
    console.log("current");
  } else if (assignmentStatus === "Past") { //checks if status is past --> if it is, then past status is set to true, which loads past assignments
    currentStatus.value = false;
    pastStatus.value = true;
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
      <div
        class="h-[60px] w-[470px] text-[35px] ml-[80px] mt-[15px] flex items-center"
      >
        <select
          name="assignments"
          id="assignmentSelect"
          class="h-[60px] w-[400px] rounded-[24px] text-center text-[35px] bg-bg-light border-bg shadow-black shadow-innervar drop-shadow"
          @change="toggleAssignments"
        >
          <option disabled>Select Assignment Type</option>
          <option value="Current">Current Assignments</option>
          <option value="Past">Past Assignments</option>
        </select>
      </div>

      <button
        v-if="currentStatus"
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
        v-if="pastStatus"
        class="h-[60px] w-[370px] text-[35px] mr-[100px] mt-[15px] text-center text-white bg-secondary rounded-[27px] shadow-innervar shadow-black justify-center items-center hover:scale-105 hover:drop-shadow-2xl duration-300 hover:shadow-transparent"
      >
        View Statistics
      </button>
    </div>

    <div class="max-w-md mx-auto md:max-w-2xl"> <!--if the status is set to current, then current assignments are loaded - if status is set to past, then past assignments are loaded-->
      <StudentComponentsCurrentAssignments 
        v-if="currentStatus"
        v-for="assignment in classStore.currentAssignments"
        :date="assignment.datetime_due"
      />
      <StudentComponentsPastAssignments
        v-if="pastStatus"
        v-for="assignment in classStore.pastAssignments"
        :date="assignment.datetime_due"
      />
    </div>
  </div>
</template>
