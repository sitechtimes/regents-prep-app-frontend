<script>
import AssignmentsTemp from "./AssignmentsTemp.vue";
export default {
  name: "Assignments",
};
</script>

<template>
  <div class="h-auto relative bg-lime-100 rounded-[35px] shadow-lg">
    <div class="w-full h-[50px] relative bg-lime-50 rounded-t-[35px] shadow-md">
      <div class="text-center text-lime-800 text-4xl font-medium">
        Due Today
      </div>
    </div>

    <br />

    <div class="flex flex-col">
      <AssignmentsTemp class="" />
    </div>
  </div>
</template>

<style scoped></style>
