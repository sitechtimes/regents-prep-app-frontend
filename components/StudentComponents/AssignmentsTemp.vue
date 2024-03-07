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

function assignmentAction() { // what each assignment does when clicked
  let btn = document.getElementById("btn");
  if (btn?.classList.contains("inactive")) {
    btn?.classList.add("active"),
    btn?.classList.remove("inactive")
    console.log("now our button is active")
  } else if (btn?.classList.contains("active")) {
    btn?.classList.add("inactive"),
    btn?.classList.remove("active"),
    console.log("now our button is inactive")
  } else (
    console.error()
  )
}
</script>

<template>
  <button
    v-if="dateValue"
    v-on:click="assignmentAction"
    id="btn"
    class="inactive w-max h-[75px] mb-[2rem] flex flex-row relative bg-primary bg-opacity-60 focus:bg-secondary rounded-full shadow-black shadow-innervar hover:shadow-none after-bg-secondary"
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
