<script setup lang="ts">
import AssignmentsStat from "./AssignmentsStat.vue";
import { pastA } from "../../tempArray";
const props = defineProps({
  date: String,
});
defineExpose({
  props,
});
</script>

<template>
  <div class="h-auto mb-[2rem] relative bg-bg-navbar rounded-[35px] drop-shadow-lg">
    <div
      class="w-full h-[56px] flex flex-col justify-around bg-bg-light rounded-t-[35px] shadow-black shadow-innervar"
    >
      <div class="text-center text-lime-800 text-4xl font-medium">
        {{ date }}
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
