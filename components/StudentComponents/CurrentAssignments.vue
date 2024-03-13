<script setup lang="ts">
import AssignmentsTemp from "./AssignmentsTemp.vue";
import { currentA } from "../../tempArray.js";
import { Assignment } from "~/interfaces/interfaces";

/* const props = defineProps<{
  assignment: Assignment;
}>(); */

/* const date = ref([props.assignment.date]); */

const props = defineProps({
  a: String,
});
defineExpose({
  props,
});
</script>

<template>
  <div class="pb-[1px]">
    <div
      class="h-auto mb-[10px] mt-[50px] relative bg-bg-navbar rounded-[35px] shadow-lg drop-shadow-lg"
    >
      <div
        class="w-full h-[56px] flex flex-col justify-around bg-bg-light rounded-t-[35px] shadow-black shadow-innervar"
      >
        <div class="text-center text-secondary text-4xl font-medium">
          {{ a }}
        </div>
      </div>

      <div
        class="pt-[2.5rem] flex flex-col items-center rounded-b-[35px] shadow-black shadow-innervar"
      >
        <AssignmentsTemp
          v-for="a in currentA"
          :name="a.name"
          :questions="a.questions"
        />
      </div>
    </div>
  </div>
</template>
