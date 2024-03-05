<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { currentA } from "../../tempArray.js";
const props = defineProps({
  name: String,
  questions: String,
});
const instance = getCurrentInstance();
const parentDate = instance.parent?.exposed.props.a;
let dateValue = false;
const filter = currentA.filter((a) => a.date === parentDate);
filter.forEach((e) => {
  if (e.name.includes(props.name)) {
    dateValue = true;
  }
});
</script>

<template>
  <button
    v-if="dateValue"
    class="w-max h-[75px] mb-[2rem] flex flex-row relative bg-primary bg-opacity-60 rounded-full shadow-black shadow-innervar hover:shadow-none after-bg-secondary"
  >
    <div class="text-[50px] px-[2rem] font-medium">{{ name }}</div>

    <div
      class="w-[75px] h-full right-[0%] bg-primary rounded-full shadow-black shadow-innervar shadow-inner"
    >
      <div class="w-full h-full text-center text-white text-[50px] font-medium">
        {{ questions }}
      </div>
    </div>
  </button>
</template>
