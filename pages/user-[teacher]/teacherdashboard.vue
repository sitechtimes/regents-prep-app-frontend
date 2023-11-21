<script setup>
import { userState } from "~/stores/users";
import { TeacherClass } from "#components";

const userStore = userState();

onMounted(() => {
  console.log(userStore.user.email);
});
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div
    class="w-[840px] h-[825px] flex flex-col items-center justify-center m-auto"
  >
    <div
      class="w-[840px] h-[720px] bg-[#426B1F] rounded-[30px] border-2 border-black"
    >
      <h1
        class="w-[291px] h-[90px] text-center text-white text-[85px] font-medium m-auto mb-[40px]"
      >
        Classes
      </h1>
      <div
        class="w-[787px] h-[553px] bg-[#EAE9CA] rounded-[23px] border-2 border-black m-auto mt-[30px]"
      >
        <TeacherClass
          v-for="teacherclass in teacherclasses"
          :key="teacherclass.name"
          :name="teacherclass.name"
          :code="teacherclass.code"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacherDashboard",
  components: {
    TeacherClass,
  },
  data() {
    return {
      teacherclasses: [
        {
          name: "Physics - P1",
          code: 11111,
        },
        {
          name: "Chemistry - P2",
          code: 22222,
        }
      ]
    }
  }
} 
</script>

<style scoped>
h1 {
  -webkit-text-stroke: 2px black;
}
</style>

<!-- 
  <div class="w-[840px] h-[690px] relative flex-col justify-start items-start inline-flex">
    <div class="w-[840px] h-[690px] bg-lime-800 rounded-[30px] border-2 border-black"></div>
    <div class="w-[291px] h-[78px] text-center text-white text-[85px] font-medium font-['Outfit']">Classes</div>
    <div class="w-[787px] h-[553px] bg-lime-100 rounded-[23px] border-2 border-black"></div>
    <div class="w-[787px] h-[93px] relative bg-zinc-400 rounded-[21px] shadow-inner border-2 border-black">
        <div class="w-[330px] h-[93px] left-[23px] top-0 absolute text-white text-[35px] font-medium font-['Outfit']">Regents Physics - P1</div>
        <div class="w-[330px] h-[93px] left-[421px] top-0 absolute text-right text-white text-[35px] font-medium font-['Outfit']">Access Code: mo31b</div>
        <div class="w-[330px] h-[93px] left-[421px] top-0 absolute text-right text-white text-[35px] font-medium font-['Outfit']">Access Code: mo31b</div>
    </div>
    <div class="w-[787px] px-0.5 pt-[39px] justify-center items-center inline-flex">
        <div class="w-[783px] h-[184px] bg-lime-600"></div>
    </div>
    <div class="w-[7px] h-[541px] bg-black rounded-[10px]"></div>
    <div class="pl-[22.14px] pr-9 bg-lime-400 rounded-[21px] shadow-inner border-2 border-black justify-start items-center gap-[68.01px] inline-flex">
        <div class="w-[330px] h-[99px] text-white text-[35px] font-medium font-['Outfit']">Regents Physics - P2</div>
        <div class="w-[330px] h-[93px] text-right text-white text-[35px] font-medium font-['Outfit']">Access Code: 98bh8</div>
    </div>
    <div class="pl-[22.14px] pr-[39px] bg-lime-400 rounded-[21px] shadow-inner border-2 border-black justify-start items-center gap-[65.01px] inline-flex">
        <div class="w-[330px] h-[99px] text-white text-[35px] font-medium font-['Outfit']">Regents Physics - P4</div>
        <div class="w-[330px] h-[93px] text-right text-white text-[35px] font-medium font-['Outfit']">Access Code:  bn43j</div>
    </div>
</div>
-->
