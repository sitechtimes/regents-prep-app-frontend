<script setup lang="ts">
import { userState } from "~/stores/users";
import { Theme, Information, Assignment } from "~/interfaces/interfaces";

const userStore = userState();
const router = useRouter();

/* onMounted(() => {
  console.log(userStore.user.username);
  let date: Date = new Date();
  console.log(date.toString().split(" ")[0]);
}); */
//This is a placeholder incase the day (Monday or Tuesday, for example) needs to be obtained for fetching the past assignments (since one another day other than the current assignment will be displayed)

const colorThemes = {
  purple: {
    assignment: `text-[#674A68]`,
    title: `text-stone-50`,
    border: `bg-[#B77CB7]`,
    background: `bg-[#EACBEB]`,
  } as Theme,
  blue: {
    assignment: "text-[#4A5868]",
    title: `text-gray-50`,
    border: `bg-[#7CB7B4]`,
    background: `bg-[#95EBE6]`,
  } as Theme,
};

//Above are the color themes that will be used within for both the class previews and the classes as well. These will be stored within the backend, and are currently here as placeholders.
// TRANSFER THEM TO A TYPESCRIPT FILE TO BE USED GLOBALLY

const classInfo = {
  physics: {
    theme: colorThemes.purple,
    information: {
      title: "Regents Physics - P1",
      teacher: "Mr. Colangelo",
      classCode: 1,
    } as Information,
    assignment: {
      today: ["Kinematics (5)"],
      otherDay: ["Energy (10)", "Circuits (4)"],
    } as Assignment,
  },
  chemistry: {
    theme: colorThemes.blue,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as Information,
    assignment: {
      today: ["Atomic Weights (5)", " Stochiometry (2)"],
      otherDay: ["Sig Figs (10)", "Temperature (1)"],
    } as Assignment,
  },
};

//Above are the format in which props will be passed into the class previews. The theme, followed by the information (the title of the class as well as the teacher), the assignments (for the current and a past day), and the class Code. This is only the format, and is a placeholder until the backend will be connected to the frontend.

/*
Purple,
Blue,
Red- DF6161,
Green,
Orange
Pink
*/
</script>

<template>
  <StudentComponentsClasspreview
    v-for="item in classInfo"
    :theme="item.theme"
    :information="item.information"
    :assignment="item.assignment"
  />

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
