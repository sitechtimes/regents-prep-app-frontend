<script setup lang="ts">
import Assignments from "../../../components/TeacherComponents/assignment.vue";
/* import Assignments from "~/components/Assignments.vue";
import CurrentAssignmentsButton from "../components/CurrentAssignmentsButton.vue";
import StartAssignmentsButton from "../components/StartAssignmentsButton.vue"; */
</script>

<template>
  <div class="max-w-md mx-auto md:max-w-2xl">
    <div class="flex flex-row justify-between mb-[1rem]">
      <CurrentAssignmentsButton />
      <StartAssignmentsButton />\
    </div>
  </div>
  <Assignments />
</template>

<style scoped></style>
