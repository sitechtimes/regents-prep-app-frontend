<script setup lang="ts">
import AssignmentsTemp from "./AssignmentsTemp.vue";
import { Assignment } from "~/interfaces/interfaces";
import { currentA } from "~/constants/tempArray.js";
const props = defineProps<{
  date: string;
}>();
defineExpose({
  props,
});
</script>

<template>
  <div
    class="h-auto mb-[2rem] relative bg-bg-navbar rounded-[35px] drop-shadow-lg"
  >
    <div
      class="w-full h-[56px] flex flex-col justify-around bg-bg-light rounded-t-[35px] shadow-black shadow-innervar"
    >
      <div class="text-center text-lime-800 text-4xl font-medium">
        {{ date }}
      </div>
    </div>

    <div
      class="pt-[2.5rem] flex flex-col items-center rounded-b-[35px] shadow-black shadow-innervar"
    >
      <AssignmentsTemp
        v-for="assignment in currentA"
        :name="assignment.name"
        :detail="assignment.questions"
      />
    </div>
  </div>
</template>
