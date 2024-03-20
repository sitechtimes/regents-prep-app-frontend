<script setup lang="ts">
import { dateFetch } from "~/composables/composables";
import { currentA } from "../../constants/tempArray";

const props = defineProps<{
  name: string;
  detail: string;
}>();

function assignmentAction() {
  // what each assignment does when clicked
  let btn = document.getElementById("btn");
  console.log(props.name, props.detail);
}
</script>

<template>
  <button
    v-if="dateFetch(props).show.value"
    v-on:click="assignmentAction"
    id="btn"
    class="inactive w-max h-[75px] mb-[2rem] flex flex-row relative bg-primary bg-opacity-60 focus:bg-[#8C9930] focus:ring-2 focus:ring-black rounded-full shadow-black shadow-innervar hover:shadow-none after-bg-secondary"
  >
    <div class="text-[50px] px-[2rem] font-medium">{{ name }}</div>

    <div
      class="w-[75px] h-full right-[0%] bg-primary rounded-full shadow-black shadow-inner"
    >
      <div class="w-full h-full text-center text-white text-[50px] font-medium">
        {{ detail }}
      </div>
    </div>
  </button>
</template>
../../constants/tempArray.js~/composables/composables
