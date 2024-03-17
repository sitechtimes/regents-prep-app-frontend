<script setup lang="ts">
import AssignmentsTemp from "./AssignmentsTemp.vue";
import { currentA } from "../../tempArray.js";

const props = defineProps<{
  a: string;
}>();

defineExpose({
  props,
});
</script>

<template>
  <div class="h-auto mb-[2rem] relative bg-lime-100 rounded-[35px] shadow-lg">
    <div
      class="w-full h-[56px] flex flex-col justify-around bg-lime-50 rounded-t-[35px] shadow-black shadow-innervar"
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
        :questions="assignment.questions"
      />
    </div>
  </div>
</template>
