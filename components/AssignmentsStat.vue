<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps({
  assignmentName: String,
  assignmentScore: String,
});

/* temp data to be deleted later */
const assignmentName = ref("Solar Power");
const assignmentScore = ref("5/5");
</script>

<template>
  <div
    class="w-max h-[75px] mb-[2rem] flex flex-row relative bg-purple-400 bg-opacity-50 rounded-full shadow-black shadow-innervar hover:shadow-none"
  >
    <div class="text-[50px] px-[2rem] font-medium">{{ assignmentName }}</div>

    <div
      class="w-[100px] h-full right-[0%] bg-purple-400 rounded-full shadow-black shadow-innervar"
    >
      <div class="w-full h-full text-center text-white text-[50px] font-medium">
        {{ assignmentScore }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
