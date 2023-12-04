<script setup lang="ts">
import { ref, onMounted } from "vue";
import AssignmentsTemp from "./AssignmentsTemp.vue";

defineProps({
  currentAssignmentDate: String,
});

/* temp data to be deleted later */
const currentAssignmentDate = ref("Due Today");
</script>

<template>
  <div class="h-auto relative bg-lime-100 rounded-[35px] shadow-lg">
    <div
      class="w-full h-[56px] flex flex-col justify-around bg-lime-50 rounded-t-[35px] shadow-black shadow-innervar"
    >
      <div class="text-center text-lime-800 text-4xl font-medium">
        {{ currentAssignmentDate }}
      </div>
    </div>

    <div
      class="pt-[2.5rem] flex flex-col items-center rounded-b-[35px] shadow-black shadow-innervar"
    >
      <AssignmentsTemp />
    </div>
  </div>
</template>

<style scoped></style>
