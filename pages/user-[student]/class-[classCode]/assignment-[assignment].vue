<script setup lang="ts">
import { userState } from "~/stores/users";

const route = useRoute();
const userStore = userState();
</script>

<template>
  <div>
    <h1>
      Question text
      <!--{{ question.text }}-->
    </h1>
    <div>
      <div>
        <!--v-for="answer in question.answers"-->
        For every answer in the question, the answer is put here.
      </div>
      <submitButton>Submit</submitButton>
    </div>
    <div>
      <h2>
        <!--Questions left in assignment {{ assignment.questions.length }} takes length of total array of questions-->
      </h2>
      <h2>Questions left</h2>

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
