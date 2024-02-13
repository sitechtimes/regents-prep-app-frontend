<script setup lang="ts">
import { useQuestions } from "~/stores/questions";
import { userState } from "~/stores/users";

const route = useRoute();
const userStore = userState();
const userQuestions = useQuestions();

onUnmounted(() => {
  /*   userQuestions.$resetQuestion(); */
});
</script>

<template>
  <div>
    <h1>/* userQuestions.qText */</h1>
    <div>
      <div>
        <!--v-for="answer in question.answers"-->
        <h2>(answer (double brackets))</h2>
      </div>
      <submitButton>Submit</submitButton>
    </div>
    <div>
      <h2>
        <!--Questions left in assignment {{ assignment.questions.length }} takes length of total array of questions-->
      </h2>
      <h2>/* userQuestions.qLeft */ Questions Left</h2>

      <div>
        <h2>
          Time Left -
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
        {{ route.params.assignment }}
      </h2>
    </div>
  </div>
</template>

<style></style>
