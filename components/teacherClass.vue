<template>
  <div class="w-[783px] h-[110px] bg-[#8C9930] flex z-0 rounded-t-[22px]"></div>
  <div>
    <!-- <div class="w-[783px] h-[110px] bg-[#8C9930] absolute z-0 rounded-t-[22px]"></div> -->
    <button
    class="w-[785px] h-[93px] bg-[#AAB840] rounded-[21px] shadow-[inset_0_4px_3px_rgba(0,0,0,0.3)] relative border-[2px] border-l-0 border-r-0 border-black flex flex-row m-auto ml-[-2px] mt-[-2px] mb-0 z-10"
  >
    <h2 class="h-[93px] text-white text-[35px] font-medium pt-[17px] pl-[3%]">
      {{ name }}
    </h2>
    <h3
      class="h-[93px] text-right text-white text-[30px] pt-[22px] font-medium pr-[3%] absolute right-1"
    >
      Access Code: {{ code }}
    </h3>
  </button>
  </div>
  <!-- <div class="w-[783px] h-[110px] bg-[blue] absolute z-0 rounded-t-[22px]"></div> -->
</template>

<script>
export default {
  name: "TeacherClass",
  props: {
    name: String,
    code: String,
  },
};
</script>

<style scoped></style>

<!--
<div class="w-[787px] h-[93px] relative bg-[#AAB840] rounded-[21px] shadow-inner border-2 border-black">
    <div class="w-[330px] h-[93px] left-[23px] top-0 absolute text-white text-[35px] font-medium font-['Outfit']">Regents Physics - P1</div>
    <div class="w-[330px] h-[93px] left-[421px] top-0 absolute text-right text-white text-[35px] font-medium font-['Outfit']">Access Code: mo31b</div>
    <div class="w-[330px] h-[93px] left-[421px] top-0 absolute text-right text-white text-[35px] font-medium font-['Outfit']">Access Code: mo31b</div>
</div>
-->
