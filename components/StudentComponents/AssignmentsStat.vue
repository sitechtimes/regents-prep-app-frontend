<script setup lang="ts">
//import { dateFetch } from "~/composables/composables";

import { userClass } from "~/stores/class";

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

const props = defineProps<{
  name: string;
  detail: number;
}>();
</script>

<template>
  <div
    v-if="dateFetch(props).show.value"
    class="w-max h-[75px] mb-[2rem] flex flex-row relative bg-primary bg-opacity-60 rounded-full shadow-black shadow-innervar hover:shadow-none"
  >
    <div class="text-[50px] px-[2rem] font-medium">{{ name }}</div>

    <div
      class="w-[100px] h-full right-[0%] bg-primary rounded-full shadow-black shadow-innervar"
    >
      <div class="w-full h-full text-center text-white text-[50px] font-medium">
        {{ detail }}
      </div>
    </div>
  </div>
</template>
