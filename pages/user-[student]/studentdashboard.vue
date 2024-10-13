<script setup lang="ts">
import studentAuth from "~/middleware/studentAuth";
import { userState } from "~/stores/users";
import { studentUserClass } from "~/stores/studentStore/class";
import { useQuestions } from "~/stores/StudentStore/questions";
import assignmentInstance from "../../json/getstudentassignments.json";
import { studentAssignments } from "~/interfaces/interfaces";

const studentAssignmentInstance = ref(
  assignmentInstance as studentAssignments[]
);
const courseList = ref(userState().studentCourses);
const userClass = studentUserClass();
const questionsStore = useQuestions();
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

onMounted(() => {
  userClass.$reset();
  questionsStore.$reset();
});

const selectCourse = (id: number) => {
  userClass.$getCourseId(id);
};
</script>

<template>
  <div class="h-fit bg-bg-reg">
    <div class="flex flex-wrap items-center space-x-30">
      <StudentComponentsClasspreview
        v-for="item in courseList"
        @click="userClass.$getCourseAssignments(item.id)"
        :key="item.id"
        :information="{
          name: item.name,
          teacher: item.teacher,
          class_code: item.course_code,
          id: item.id,
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
