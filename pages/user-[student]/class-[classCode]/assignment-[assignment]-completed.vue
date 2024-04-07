<script setup>
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div
    class="flex flex-col h-[50rem] max-w-[80%] mx-auto items-center justify-evenly text-center text-4xl font-semibold"
  >
    <h3 class="rounded-[25px] p-[5rem] bg-[#f9f8e3] font-bold">
      Your score for this assignment is shown below
    </h3>

    <div
      class="rounded-[50px] p-[2rem] bg-[#aab941] text-white text-[50px] font-bold"
    >
      5 / 5
    </div>

    <button
      class="rounded-[50px] p-[2rem] bg-[#5c8335] shadow-black shadow-innertop text-white font-bold hover:scale-105 hover:drop-shadow-2xl duration-300 hover:shadow-transparent"
    >
      View Statistics
    </button>
  </div>
</template>

<style scoped></style>
