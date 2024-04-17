<script setup lang="ts">
//import { dateFetch } from "~/composables/composables";
import { useQuestions } from "~/stores/questions";
import { userClass } from "~/stores/class";

const userQuestions = useQuestions();
const props = defineProps<{
  name: string;
  detail: number;
}>();

const dateFetch = (props: Readonly<{ name: string; detail: number }>) => {
  const classDetails = userClass();
  const parentDate = getCurrentInstance()?.parent?.exposed?.props.date;
  const show = ref<boolean>(false);

  const currentFilter = classDetails.assignments.filter(
    (assignment) => assignment.due_date === parentDate
  );
  const pastFilter = classDetails.assignments.filter(
    (assignment) => assignment.due_date === parentDate
  );
  currentFilter.forEach((assignment) => {
    if (assignment.name.includes(props.name)) {
      show.value = true;
    }
  });
  pastFilter.forEach((assignment) => {
    if (assignment.name.includes(props.name)) {
      show.value = true;
    }
  });

  return { show };
};

function assignmentAction() {
  // what each assignment does when clicked
  let btn = document.getElementById("btn");
  console.log(props.name, props.detail);
}
</script>

<template>
  <button
    v-if="dateFetch(props).show.value"
    v-on:click="
      userQuestions.$patch({
        assignmentName: props.name,
        qLeft: props.detail,
      })
    "
    id="btn"
    class="inactive w-max h-[75px] mb-[2rem] flex flex-row relative bg-primary bg-opacity-60 focus:bg-[#8C9930] focus:ring-2 focus:ring-black rounded-full shadow-black shadow-innervar hover:shadow-none after-bg-secondary"
  >
    <div class="text-[50px] px-[2rem] font-medium">
      {{ name }}
    </div>

    <div
      class="w-[75px] h-full right-[0%] bg-primary rounded-full shadow-black shadow-inner"
    >
      <div class="w-full h-full text-center text-white text-[50px] font-medium">
        {{ detail }}
      </div>
    </div>
  </button>
</template>
