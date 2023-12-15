<template>
  <div class="w-[390px] h-[371px] relative mx-[5rem]">
    <div
      class="w-full h-[371px] relative bg-pink-200 bg-opacity-30 rounded-[60px]"
    >
      <div
        class="w-full text-stone-50 text-center text-xl font-medium bg-indigo-400 pt-12 pb-6 px-5 rounded-[60px_60px_0px_0px] max-md:px-5 shadow-black shadow-innervar"
      >
        <span v-on:click="getClass" class="text-white text-[35px]"
          >Regents Physics - P1
        </span>
        <span class="text-white text-xl">Mr. Colangelo</span>
      </div>

      <div
        class="h-[180px] relative text-[27px] py-5 relative text-center shadow-black shadow-innervar"
      >
        <span class="text-violet-700 font-semibold">Due Today: </span>
        <span class="text-violet-700">Kinematics (5)</span> <br />
        <span class="text-violet-700">Power (2)</span> <br />
        <span class="text-violet-700 font-semibold">Due Wednesday: </span
        ><span class="text-violet-700">Energy (10)</span>
      </div>

      <div
        class="w-full h-[65px] bottom-[0%] absolute bg-indigo-400 rounded-b-[60px] shadow-black shadow-innervar2"
      >
        <button
          class="w-full h-full relative text-center text-stone-50 text-[32px] font-medium"
        >
          Past assignments
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userState } from "~/stores/users";
import { currentA } from "../tempArray";

const userStore = userState();
const router = useRouter();

function getClass() {
  router.push({ path: `/user-${userStore.user.username}/studentclass` });
  console.log(currentA);
}
</script>

<style scoped></style>
