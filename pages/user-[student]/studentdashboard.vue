<script setup lang="ts">
import studentAuth from "~/middleware/studentAuth";
import assignmentInstance from "../../json/getstudentassignments.json";
import studentAssignmentList from "../../json/getstudentcourses.json";
import { course, studentAssignments } from "~/interfaces/interfaces";
import {userState} from "../../stores/users"

const studentAssignmentInstance = ref(
  assignmentInstance as studentAssignments[]
);
let courseList = ref(userState().studentCourses);
/* onMounted(() => {
  console.log(userStore.user.username);
  let date: Date = new Date();
  console.log(date.toString().split(" ")[0]);
}); */
//This is a placeholder incase the day (Monday or Tuesday, for example) needs to be obtained for fetching the past assignments (since one another day other than the current assignment will be displayed)

definePageMeta({
  layout: "dashboard",
  middleware: studentAuth,
});

</script>

<template>
  <div class="h-fit bg-bg-reg">
    <div class="flex flex-wrap items-center space-x-30">
      <StudentComponentsClasspreview
        v-for="item in courseList"
        :key="item.id"
        :information="{
          name: item.name,
          teacher: item.teacher,
          classCode: item.id,
        }"
        :class="item"
        :assignments="item.assignments"
      />
    </div>
  </div>
  <!-- add new class -->
  <!-- <div class="w-[444px] h-[189px] absolute">
    <div
      class="w-[444px] h-[189px] left-0 top-0 absolute bg-lime-800 rounded-[40px] border-2 border-black"
    ></div>
    <div
      class="w-[260px] h-12 left-[93px] top-[114px] absolute bg-yellow-50 rounded-[19px] border border-neutral-500"
    ></div>
    <div
      class="w-[260px] h-[42px] left-[91px] top-[117px] absolute text-center text-[27px] font-medium"
    >
      Enter Class Code
    </div>
    <div
      class="w-[448px] h-[max] absolute text-center text-lime-100 text-[50px] font-normal"
    >
      Add new class:
    </div>
  </div> -->
</template>

<style scoped></style>
