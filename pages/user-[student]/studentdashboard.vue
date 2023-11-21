<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();
const router = useRouter();

onMounted(() => {
  console.log(userStore.user.username);
});

function getClass() {
  router.push({ path: `/user-${userStore.user.username}/studentclass` });
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
  <!-- nuxt navbar to be inserted here -->

  <StudentComponentsClasspreview />

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
