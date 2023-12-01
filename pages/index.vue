<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();

</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center gap-[57px]">
    <h1
      class="w-[1800px] h-[167px] text-center text-black text-[150px] font-medium drop-shadow-xl"
    >
      Regents Prep App
    </h1>
    <label>
      <NuxtLink
        to="/login"
        class="loginLink w-[294px] h-[50px] text-center text-white text-[37px] font-medium tracking-wide"
        ><button
          id="loginRedirect"
          class="button bg-[#426B1F] w-[265px] h-24 pt-[19.72px] rounded-[20px] shadow-innervar shadow-black flex-col items-center gap-[447.72px] inline-flex hover:scale-105 hover:drop-shadow-2xl hover:shadow-transparent duration-300"
        >
          Login
        </button></NuxtLink
      >
    </label>
  </div>
</template>

<style lang="css" scoped></style>
