<script setup lang="ts">
import { userState } from "~/stores/users";
import { Theme, Information, Assignment } from "~/interfaces/interfaces";

const userStore = userState();
const router = useRouter();

onMounted(() => {
  console.log(userStore.user.username);
  let date: Date = new Date();
  console.log(date.toString().split(" ")[0]);
});

function getClass() {
  router.push({ path: `/user-${userStore.user.username}/studentclass` });
}

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

const classInfo = {
  physics: {
    theme: colorThemes.purple,
    information: {
      title: "Regents Physics - P1",
      teacher: "Mr. Colangelo",
      classCode: 1
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
      classCode: 2
    } as Information,
    assignment: {
      today: ["Atomic Weights (5)", " Stochiometry (2)"],
      otherDay: ["Sig Figs (10)"],
    } as Assignment,
  },
};

/*
Purple,
Blue,
Red- DF6161,
Green,
Orange
Pink
*/

//All color themes for student's classes are fetched.
//Below is an example of one of the color themes being fetched and having the hex value of the class accordingly changed.
// Every 'color scheme' for each class will have to be organized into three categories: an assignment color, background color, and a button color.
</script>

<template>
  <!-- <div
    id="navbar"
    class="w-[max] h-[8rem] bg-lime-100 drop-shadow-lg py-7 px-5"
  >
    <div class="w-[373px] h-[83px] bg-lime-100 rounded-2xl shadow-1xl">
      <div
        class="w-[max] h-[max] text-center text-stone-600 text-[55px] font-medium"
      >
        Student Name
      </div>
    </div>

    <div
      class="w-[277px] h-[73px] bg-lime-800 rounded-[20px] shadow shadow-inner"
    >
      <div
        class="w-[max] h-[max] text-center text-white text-[50px] font-medium"
      >
        Dashboard
      </div>
    </div>

    <div class="w-[74px] h-[74px] relative">
      <div
        class="w-[74px] h-[74px] left-0 top-0 absolute bg-lime-800 rounded-[14px] shadow-inner"
      ></div>
      <div
        class="w-[42px] h-[42px] left-[16px] top-[16px] absolute bg-white rounded-[5px]"
      ></div>
    </div>

    <div class="w-[73px] h-[73px] relative">
      <div
        class="w-[73px] h-[73px] left-0 top-0 absolute bg-lime-800 rounded-full shadow-inner"
      ></div>
      <div
        class="w-[41px] h-[41px] left-[16px] top-[16px] absolute bg-white rounded-[36.50px]"
      ></div>
    </div>

    <div class="w-[200px] h-[73px] bg-lime-800 rounded-[20px] shadow">
      <div
        class="w-[max] h-[max] text-center text-stone-50 text-[50px] font-medium"
      >
        Logout
      </div>
    </div>
  </div> -->
  <!-- nuxt navbar to be inserted here -->

  <StudentComponentsClasspreview
    v-for="item in classInfo"
    :theme="item.theme"
    :information="item.information"
    :assignment="item.assignment"
  />

  <!-- :assignment="item.theme.assignment"
    :title="item.theme.title"
    :border="item.theme.border"
    :background="item.theme.background" -->
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
