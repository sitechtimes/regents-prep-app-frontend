<script setup>
// import the files or json that contains the information regarding the students performance

// the only values we need are the number of questions the student got correct
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div
    class="flex flex-col h-[50rem] max-w-[80%] mx-auto items-center justify-evenly text-center text-4xl"
  >
    <h3
      class="border-solid border-[1px] border-black rounded-[25px] p-[5rem] bg-[#f9f8e3] font-bold"
    >
      Your score for this assignment is shown below
    </h3>

    <div class="rounded-[50px] p-[2rem] bg-[#aab941] text-white font-extrabold">
      5/5
    </div>

    <button
      class="rounded-[50px] p-[2rem] bg-[#5c8335] shadow-black shadow-innertop text-white font-extrabold"
    >
      View Statistics
    </button>
  </div>
</template>

<style scoped></style>
