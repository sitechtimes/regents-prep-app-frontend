<script setup lang="ts">
import AssignmentsStat from "./AssignmentsStat.vue";
import { pastA } from "../../tempArray";
const props = defineProps({
  a: String,
});
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
        {{ a }}
      </div>
    </div>

    <div
      class="pt-[2.5rem] flex flex-col items-center shadow-black shadow-innervar rounded-b-[35px]"
    >
      <AssignmentsStat
        v-for="assignment in pastA"
        :name="assignment.name"
        :score="assignment.score"
      />
    </div>
  </div>
</template>
