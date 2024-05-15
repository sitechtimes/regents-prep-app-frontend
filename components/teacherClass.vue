<script setup lang="ts">
const props = defineProps<{
  name: string;
  code: string;
}>();
</script>

<template>
  <div class="w-[783px] h-[93px] flex">
    <button
      class="w-[785px] h-[95px] bg-primary rounded-[21px] shadow-[inset_0_4px_3px_rgba(0,0,0,0.3)] relative border-[2px] border-l-0 border-r-0 border-black flex flex-row m-auto ml-[-2px] mt-[-2px] mb-0 z-10"
    >
      <h2 class="h-[93px] text-white text-[35px] font-medium pt-[17px] pl-[3%]">
        {{ props.name }}
      </h2>
      <h3
        class="h-[93px] text-right text-white text-[30px] pt-[22px] font-medium pr-[3%] absolute right-1"
      >
        Access Code: {{ props.code }}
      </h3>
    </button>
  </div>
</template>

<style scoped></style>

<!-- <div class="w-[783px] h-[93px] bg-[#8C9930] flex"></div> -->
