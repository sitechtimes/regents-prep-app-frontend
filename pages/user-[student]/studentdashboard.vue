<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();

onMounted(() => {
  console.log(userStore.user.username);
});

function getClass() {
  router.push({ path: `/user-${state.user.name}/class` });
}
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
  nuxt navbar to be inserted here

  <!-- assignments -->
  <div class="w-[390px] h-[371px] relative m-12">
    <!-- top -->
    <div
      class="w-full h-[371px] absolute bg-pink-200 bg-opacity-30 rounded-[60px] shadow-inner"
    >
      <div
        class="w-full text-stone-50 text-center text-xl font-medium self-stretch shadow-md bg-indigo-400 pt-12 pb-6 px-5 rounded-[60px_60px_0px_0px] max-md:px-5"
      >
        <span v-on:click="getClass" class="text-white text-[35px]"
          >Regents Physics - P1
        </span>
        <br />
        <span class="text-white text-xl">with Mr. Colangelo </span>
      </div>

      <!-- center -->
      <div class="w-full h-[155.31px] top-[155px] absolute text-center">
        <span class="text-violet-700 text-[27px] font-semibold"
          >Due today:
        </span>
        <button class="text-violet-700 text-[27px]">Kinematics (5)</button
        ><br />
        <button class="text-violet-700 text-[27px]">Power (2)</button><br />
        <span class="text-violet-700 text-[27px] font-semibold"
          >Due Wednesday: </span
        ><button class="text-violet-700 text-[27px]">Energy (10)</button>
      </div>

      <!-- bottom -->
      <div
        class="w-full h-[65px] left-[390px] top-[371px] rotate-180 self stretch absolute origin-top-left bg-indigo-400 rounded-tl-[60px] rounded-tr-[60px] shadow-inner"
      >
        <button
          class="w-full h-full relative text-center text-stone-50 text-[32.50px] font-medium rotate-180"
        >
          Past assignments
        </button>
      </div>
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
