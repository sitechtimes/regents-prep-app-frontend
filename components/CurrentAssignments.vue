<script setup lang="ts">
import { ref, onMounted } from "vue";
import AssignmentsTemp from "./AssignmentsTemp.vue";
import { currentA } from "../tempArray.js";

defineProps({
  currentAssignmentDate: String,
});

const currentArr: any[] = [];
(function () {
  currentA.forEach((e: any) => {
    if (currentArr.includes(e.date)) {
    } else {
      currentArr.push(e.date);
    }
  });
})();


const assignmentArr: any[] = [];
function getAssignments(x: Number) {
  for (let i = 0; i < currentArr.length; i++) {
    let x = i
    const [x]array: any[] = [];
    x++;

  }
}
</script>

<template>
  <div
    v-for="(a, index) in currentArr"
    :index="index"
    @load="getAssignments"
    class="h-auto mb-[2rem] relative bg-lime-100 rounded-[35px] shadow-lg"
  >
    <div
      class="w-full h-[56px] flex flex-col justify-around bg-lime-50 rounded-t-[35px] shadow-black shadow-innervar"
    >
      <div class="text-center text-lime-800 text-4xl font-medium">
        {{ a }}
      </div>
    </div>

    <div
      class="pt-[2.5rem] flex flex-col items-center rounded-b-[35px] shadow-black shadow-innervar"
    >
      <AssignmentsTemp
        v-for="a in assignmentArr"
        :name="a.name"
        :questions="a.questions"
      />
    </div>
  </div>
</template>
