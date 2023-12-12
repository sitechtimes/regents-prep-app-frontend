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
  <form @submit.prevent="createClass" class="m-auto w-[795px] h-[760px] items-center justify-center flex flex-col">
    <div
      class="w-[795px] h-[760px] flex flex-col bg-[#F2F0CC] rounded-2xl mt-[30px] shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]"
    >
      <div class="bg-[#AAB840] bg-opacity-[55%] w-[795px] h-[115px] rounded-t-2xl items-center justify-center shadow-inner">
        <h1
          class="m-auto"
        >
          Create new Class
        </h1>
      </div>
      <div>
        <div>
          <h2>Class name</h2>
          <label for="classInput"></label>
          <input
            type="text"
            name="classname"
            id="classInput"
            v-model="className"
          />
        </div>
        <div>
          <h2>Choose Course Type</h2>
          <label for="courseType"></label>
          <select id="courseType" name="type" v-model="courseName">
            <option v-for="course in courses">{{ course }}</option>
          </select>
        </div>
        <div>
          <h2>Choose Color</h2>
          <label for="courseColor"></label>
          <select id="courseColor" name="color" v-model="courseColor">
            <option v-for="color in courses">{{ color }}</option>
          </select>
        </div>
        <submitButton>
          <button
            class="font-bold py-2 px-4 rounded bg-blue-500 text-white self-center"
          >
            Create
          </button></submitButton
        >
      </div>
    </div>
  </form>
</template>

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
