<template>
  <div class="flex flex-row h-[90vw] justify-evenly p-2">
    <div class="bg-red-300 w-[50%] h-full">
      Div Left
    </div>
    <div class="bg-green-300 w-[50%] h-full align-middle">
      <!--Dropdown Menu For the Students-->
      <div class="w-[206px] h-[40px] bg-orange-300 justify-center align-middle rounded-lg">
        <div class="">Student Name</div>
      </div>
      <!--Time Submitted-->
      <div class="">
        Time Submitted: {Formatted with format date}
      </div>
      <!--Student Question Responses-->
      <div class="bg-[#D9D9D9] w-[80%] h-[40rem] opacity-[100%] rounded-lg">

      </div>
    </div>
  </div>
  <div>
    <h1>teacher assignment view</h1>
    <p>{{ route.params.assignmentId }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: "auth",
  requiresAuth: true
});
const route = useRoute();
</script>

<style scoped></style>
