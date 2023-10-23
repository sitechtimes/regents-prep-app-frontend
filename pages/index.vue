<template>
  <div class="h-screen flex flex-col items-center justify-center gap-[57px]">
    <h1
      class="w-[2000px] h-[167px] text-center text-black text-[150px] font-medium drop-shadow-xl"
    >
      Regents Prep App
    </h1>
    <label>
      <button
        id="loginRedirect"
        class="button bg-[#426B1F] w-[265px] h-24 pt-[19.72px] rounded-[20px] shadow-inner flex-col items-center gap-[447.72px] inline-flex hover:scale-105 duration-300"
      >
        <NuxtLink
          to="/login"
          class="loginLink w-[294px] h-[50px] text-center text-white text-[37px] font-medium tracking-wide"
          >Login</NuxtLink
        >
      </button>
    </label>
  </div>
</template>

<script></script>

<style lang="css" scoped>
</style>
