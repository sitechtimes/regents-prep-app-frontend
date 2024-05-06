<script setup lang="ts">
import {
  ClassPreviewInformation,
  ClassPreviewAssignments,
} from "~/interfaces/interfaces";
import studentAuth from "~/middleware/studentAuth";
import { useQuestions } from "~/stores/questions";
import { userState } from "~/stores/users";
import { userClass } from "~/stores/class";

const router = useRouter();
const route = useRoute();
const userStore = userState();
const userQuestions = useQuestions();
const userClasses = userClass();

const questionText = userQuestions.qText;
const questionAnswers = userQuestions.answers;
const tempAnswer = ref<number>()

const totalTime = ref<number>(
  userQuestions.timeLeft.valueOf()
);
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
  userClasses.$reset();

  //This unMounted action is used to remove the assignment from the questionState when the user leaves the page. Normally, a function would be created within the questions.ts file such as userQuestions.$reset() in order to avoid re-typing the function every time. However, since all of the properties of the question state are in the return {} due to addressing them with typescript interfaces, no function can be used, even those such as .push for an array. (If there is a way to create a typescript state function and it has simply been missed, please feel free to correct the above.)

  console.log(totalTime.value);
});

console.log(totalTime.value);

definePageMeta({
  middleware: studentAuth,
});
</script>

<template>
  <div class="m-auto items-center text-center">
    <div
      id="display"
      class="w-[96%] h-fit bg-bg-light rounded-[24px] border-[2px] border-bg-navbar m-auto flex flex-col mt-[2%] scroll-smooth overflow-y-auto"
    >
      <div
        v-html="questionText"
        class="text-[40px] font-semibold ml-[15px] mr-[15px] my-[10px]"
      ></div>
      <div class="items-center justify-center text-center">
        <div
          class="justify-center items-center text-center"
        >
          <button
            v-for="answer in questionAnswers"
            v-html="answer.text"
            class="border-black border-[5px] m-[10px] w-[23%] h-[320px] flex-wrap rounded-[24px] font-medium text-[30px] focus:bg-primary focus:bg-opacity-50 mb-[50px]"
            @click="tempAnswer.value = answer.id"
          ></button>
        </div>
      </div>
    </div>
    <button
      @click="
      userQuestions.$submitAnswer(tempAnswer)
        /* router.push({
          path: `/user-${userStore.username}/class-${userQuestions.classCode}/assignment-${userQuestions.assignmentName}-completed`,
        }) */
      "
      class="w-[350px] h-[60px] bg-bg-reg shadow-innertop shadow-[#525148] rounded-[24px] border-[1px] border-black font-semibold text-[40px] m-auto hover:shadow-none mt-[2%] mb-[20px]"
    >
      Submit Answer
    </button>
    <div class="flex flex-row w-[96%] m-auto">
      <!--Questions left in assignment {{ assignment.questions.length }} takes length of total array of questions-->
      <!--       <h2
        class="w-[20%] h-[60px] bg-bg-light rounded-[24px] border-[2px] border-bg-navbar font-semibold text-[37px] text-center flex flex-row pl-[2%]"
      >
                <div class="mr-[5px] bg-primary w-[50px] h-[50px] rounded-full text-[32px] mt-[1%] shadow-innertop shadow-innerbottom shadow-secondary">{{ userQuestions.qLeft }}</div>
        {{ userQuestions.qLeft }} Questions Left
      </h2> -->
      <h2
        class="w-[60%] h-[60px] bg-bg-light rounded-[24px] border-[2px] border-bg-navbar font-semibold text-[37px] m-auto text-center items-end"
      >
        {{ userQuestions.qLeft }} Questions Left | Time Left
        - {{ min }} min {{ sec }} sec
        <!--Minutes : Seconds-->
        <!--Time is taken by taking the time left for the assignment from the array, then continuing it once the student is on the assignment. -->
        |
        <!--Number of Attempts-->
        X Attempts Left
      </h2>
    </div>
    <!--     <div>
      <h2>
        {{ userQuestions.assignmentName }}
      </h2>
    </div> -->
  </div>
</template>
