<script setup lang="ts">
import { useQuestions } from "~/stores/questions";
import { userState } from "~/stores/users";
import { classInfo } from "~/constants/classInfo";

const route = useRoute();
const userStore = userState();
const userQuestions = useQuestions();

const totalTime = classInfo.physics.assignments.today[0].timeLeft;
const min = ref<number>(Math.trunc(totalTime.valueOf() / 60));
const sec = ref<number>(totalTime.valueOf() % 60);
function delay(delay: number) {
  return new Promise((r) => {
    setTimeout(r, delay);
  });
}
(async function () {
  for (let i = 0; i < totalTime.valueOf(); i++) {
    await delay(1000);
    if (sec.value != 0) {
      sec.value -= 1;
    } else {
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
  console.log(userQuestions.qText);
});

definePageMeta({
  middleware: () => {
    const userStore = userState();
    /* userStore.$studentCheck(); */
  },
});
</script>

<template>
  <div>
    <h1>{{ userQuestions.qText }}</h1>
    <div>
      <div>
        <h2 v-for="answer in userQuestions.answers">
          {{ answer }}
        </h2>
      </div>
      <submitButton>Submit</submitButton>
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

<style></style>
