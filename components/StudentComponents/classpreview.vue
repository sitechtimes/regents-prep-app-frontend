<script setup lang="ts">
let color = "violet";
</script>

<template>
  <div class="w-[390px] h-[371px] relative m-12">
    <div
      class="w-full h-[371px] relative bg-pink-200 bg-opacity-30 rounded-[60px] shadow-inner"
    >
      <div
        class="w-full text-stone-50 text-center text-xl font-medium shadow-md bg-indigo-400 pt-12 pb-6 px-5 rounded-[60px_60px_0px_0px] max-md:px-5"
      >
        <span v-on:click="getClass" class="text-white text-[35px]"
          >Regents Physics - P1
        </span>
        <span class="text-white text-xl">Mr. Colangelo</span>
      </div>

      <div class="text-[27px] py-5 relative text-center">
        <span class="text-violet-700 font-semibold">Due today: </span>
        <button class="text-violet-700">Kinematics (5)</button> <br />
        <button class="text-violet-700">Power (2)</button> <br />
        <span class="text-violet-700 font-semibold">Due Wednesday: </span
        ><button class="text-violet-700">Energy (10)</button>
      </div>

      <div
        class="w-full h-[65px] bottom-[0%] absolute bg-indigo-400 rounded-b-[60px] shadow-inner"
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
