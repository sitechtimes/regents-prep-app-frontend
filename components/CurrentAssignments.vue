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

// the code above is to filter through the currentA array
// and make sure that the assignments dates displayed do not repeat
// the problem with loading the assignments is
// all the assignments appear under every due date
//
// option 1 (not reasonable | abandoned)
// make an array for each date component to be filled with the assignments for that date
//
// option 2
// make a function in this parent component and call it in the child component
// the function cud match the date associated with the assignment name
// to the date displayed in the parent component and display the correct assignments
//
// most reasonable solution rn
// onBeforeMount hook in child component, which will run every time its rendered
// somehow call the date value in parent component and match with assignment name value

const assignmentArr: any[] = [];
function getAssignments() {
  /* for (let i = 0; i < currentArr.length; i++) {
    let x = i
    const [x]array: any[] = [];
    x++; 
  } */
  console.log("eiwubf");
}

onBeforeMount(() => {
  getAssignments();
});
</script>

<template>
  <div
    v-for="(a, index) in currentArr"
    :index="index"
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
        v-for="a in currentA"
        :name="a.name"
        :questions="a.questions"
      />
    </div>
  </div>
</template>
