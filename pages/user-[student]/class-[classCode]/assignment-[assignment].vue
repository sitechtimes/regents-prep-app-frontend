<script setup lang="ts">
import studentAuth from "~/middleware/studentAuth";
import { useQuestions } from "~/stores/questions";
import { userState } from "~/stores/users";

const route = useRoute();
const userStore = userState();
const userQuestions = useQuestions();

const totalTime = ref<number>(userQuestions.timeLeft.valueOf());
const min = ref<number>(Math.trunc(totalTime.value / 60));
const sec = ref<number>(totalTime.value % 60);
function delay(delay: number) {
  return new Promise((r) => {
    setTimeout(r, delay);
  });
}
(async function () {
  for (let i = 0; i < totalTime.value; i++) {
    await delay(1000);
    if (sec.value !== 0) {
      totalTime.value -= 1;
      sec.value -= 1;
    } else {
      totalTime.value -= 1;
      min.value -= 1;
      sec.value += 59;
    }
  }
})();

onUnmounted(() => {
  userQuestions.$resetQuestion();
  //This unMounted action is used to remove the assignment from the questionState when the user leaves the page. Normally, a function would be created within the questions.ts file such as userQuestions.$reset() in order to avoid re-typing the function every time. However, since all of the properties of the question state are in the return {} due to addressing them with typescript interfaces, no function can be used, even those such as .push for an array. (If there is a way to create a typescript state function and it has simply been missed, please feel free to correct the above.)
});

onMounted(() => {
  // console.log(userQuestions.timeLeft);
});

definePageMeta({
  middleware: studentAuth,
});
</script>

<template>
  <div>
    <div class="w-[96%] h-[580px] bg-bg-light rounded-[24px] border-[2px] border-bg-navbar m-auto flex flex-col mt-[2%]">
      <h1 class="text-[40px] font-semibold ml-[15px]">{{ userQuestions.qText }}</h1>
      <div class="items-center justify-center text-center">
        <div>
          <button 
          v-for="answer in userQuestions.answers"
          class="border-black border-[5px] m-[10px] w-[23%] h-[320px] flex-wrap rounded-[24px]">
            {{ answer }}
          </button>
        </div>
      </div>
      <button class="w-[190px] h-[60px] bg-bg-reg shadow-innertop shadow-innerbottom shadow-[#525148] rounded-[24px] border-[1px] border-black font-semibold text-[40px] m-auto hover:shadow-none">Submit</button>
    </div>
    <div>
      <h2>
        <!--Questions left in assignment {{ assignment.questions.length }} takes length of total array of questions-->
      </h2>
      <h2>{{ userQuestions.qLeft }} Questions Left</h2>

      <div>
        <h2>
          Time Left - {{ min }} min {{ sec }} sec
          <!--Minutes : Seconds-->
          <!--Time is taken by taking the time left for the assignment from the array, then continuing it once the student is on the assignment. -->
          |
          <!--Number of Attempts-->
          Attempts Left
        </h2>
      </div>
    </div>
    <div>
      <h2>
        {{ userQuestions.assignmentName }}
      </h2>
    </div>
  </div>
</template>

<style>
</style>
