<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();

//The properties below are placeholder refs in order to adhere to typescript declaration.
const className = ref();
const courseName = ref();
const courses = ref([]);
const courseColor = ref();

function createClass() {
  console.log("Class Created");
  console.log(className.value);
  className.value = "";
}

definePageMeta({
  layout: "createclass",
});
</script>

<template>
  <form
    @submit.prevent="createClass"
    class="flex items-center justify-center m-auto flex-col"
  >
    <div
      class="w-[795px] h-[661px] flex flex-col bg-[#F2F0CC] rounded-2xl text-center m-auto border-solid border-2 border-[#AAB840]"
    >
      <div
        class="bg-[#AAB840] bg-opacity-[60%] w-[795px] h-[115px] rounded-t-2xl items-center justify-center ml-[-2px]"
      >
        <h1
          id="header"
          class="m-auto w-[795px] h-[115px] text-center text-[#FDFDF0] font-medium text-[90px] mt-[-10px]"
        >
          Create New Class
        </h1>
      </div>
      <div>
        <div class="flex flex-col m-auto items-center justify-center pt-[35px]">
          <label
            for="classInput"
            class="text-black text-[50px] font-semibold drop-shadow-md pr-[260px]"
            >Class Name:</label
          >
          <input
            class="w-[541px] h-[65px] bg-[#FAF9E5] border border-neutral-500 text-[35px] px-1"
            type="text"
            name="classname"
            id="classInput"
            v-model="className"
          />
        </div>
        <div class="pt-[35px]">
          <label
            for="courseType"
            class="text-black text-[50px] font-semibold drop-shadow-md pr-[65px]"
            >Choose Course Type:</label
          >
          <select
            id="courseType"
            class="w-[541px] h-[65px] bg-[#FAF9E5] border border-neutral-500 text-[35px]"
            name="type"
            v-model="courseName"
          >
          <option>Regents Something</option>
            <option
              v-for="course in courses"
              class="bg-[#FAF9E5] pt-[-2px] border border-neutral-500"
            >
              {{ course }}
            </option>
          </select>
        </div>
        <!-- <div class="pt-[20px] pb-[32px]">
          <label
            for="courseColor"
            class="text-black text-[50px] font-semibold drop-shadow-md pr-[215px]"
            >Choose Color:</label
          >
          <select
            id="courseColor"
            name="color"
            v-model="courseColor"
            class="w-[541px] h-[65px] bg-[#FAF9E5] border border-neutral-500 text-[35px]"
          >
          <option>Some Color</option>
            <option v-for="color in courses">{{ color }}</option>
          </select>
        </div> -->
        <button
          class="w-[217.55px] h-[73.26px] text-center text-stone-50 text-[40px] font-medium bg-[#AAB840] rounded-[20px] shadow-innervar shadow-black justify-center items-center hover:scale-105 hover:drop-shadow-2xl duration-300 hover:shadow-transparent mt-[55px]"
        >
          Create
        </button>
      </div>
    </div>
  </form>
</template>

<style>
#header {
  -webkit-text-stroke: 1.5px black;
}
</style>

<!-- <div class="w-[795px] h-[824px] relative">
  <div class="w-[795px] h-[824px] left-0 top-0 absolute bg-lime-100 rounded-2xl shadow-inner"></div>
  <div class="w-[795px] h-[115px] left-0 top-0 absolute bg-lime-400 bg-opacity-60 rounded-tl-2xl rounded-tr-2xl shadow shadow-inner"></div>
  <div class="w-[795px] h-[90px] left-0 top-[12px] absolute text-center text-amber-50 text-[90px] font-medium font-['Outfit']">Create New Class</div>
  <div class="w-[218.18px] h-[75.15px] left-[288px] top-[693px] absolute bg-lime-400 rounded-[20px] shadow-inner justify-center items-center inline-flex">
      <div class="w-[217.55px] h-[73.26px] text-center text-stone-50 text-[40px] font-medium font-['Outfit']">Create</div>
  </div>
  <div class="w-[543px] h-[123px] left-[127px] top-[508px] absolute">
      <div class="w-[541px] h-[65px] left-[1px] top-[57px] absolute bg-yellow-50 border border-neutral-500"></div>
      <div class="w-[346px] h-10 left-[1px] top-0 absolute text-black text-[50px] font-normal font-['Orienta']">Choose Color: </div>
      <div class="w-[53px] h-[53px] left-[533px] top-[63px] absolute origin-top-left rotate-90">
          <div class="w-[53px] h-[53px] left-0 top-0 absolute bg-lime-100 rounded-full shadow-inner"></div>
      </div>
  </div>
  <div class="w-[543px] h-[123px] left-[126px] top-[336px] absolute">
      <div class="w-[541px] h-[65px] left-[1px] top-[57px] absolute bg-yellow-50 border border-neutral-500"></div>
      <div class="w-[532px] h-10 left-[1px] top-0 absolute text-black text-[50px] font-normal font-['Orienta']">Choose Course Type:</div>
      <div class="w-[53px] h-[53px] left-[533px] top-[63px] absolute origin-top-left rotate-90">
          <div class="w-[53px] h-[53px] left-0 top-0 absolute bg-lime-100 rounded-full shadow-inner"></div>
      </div>
  </div>
  <div class="h-[123px] px-px pb-px left-[125px] top-[164px] absolute flex-col justify-center items-start gap-[17px] inline-flex">
      <div class="w-[532px] h-10 text-black text-[50px] font-normal font-['Orienta']">Class Name:</div>
      <div class="w-[541px] h-[65px] bg-yellow-50 border border-neutral-500"></div>
  </div>
</div> -->
