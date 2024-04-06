<script setup lang="ts">
import {
  // Theme,
  ClassPreviewInformation,
  assignmentDetails,
  course,
} from "~/interfaces/interfaces";
import { useQuestions } from "~/stores/questions";
import { userState } from "~/stores/users";

const userStore = userState();
const userQuestions = useQuestions();
const router = useRouter();

const props = defineProps<{
  information: ClassPreviewInformation;
  class: course;
  assignments: Array<assignmentDetails>;
}>(); //The themes, information, and assignment are declared as props. They are separate interfaces declared in a typescript filed within the Interface folder.


const compareDates = (dueDate: string) => {
  let date1 = new Date(dueDate).getTime(); //converts date to milliseconds since midnight at the beginning of January 1, 1970, UTC.
  let date2 = new Date().getTime(); // gets today's time

  if (date1 < date2) { // if the assignment is before today, return -1
    return - 1;
  } else if (date1 > date2) { // if the assigmment is after today, return 1
    return 1;
  } else {
    return 0; // if the assignment is due today, return 0
  }
};

const titleInformation = ref(props.information.title);
const teacherInformation = ref(props.information.teacher);
const classCode = ref(props.class.id);
const dueToday = ref(false);
const dueLater = ref(false);

const sortedAssignments = ref(
  props.assignments
    .sort((a, b) => {
      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);
      return Number(dateB) - Number(dateA); // For descending order
    })
    .filter(
      (assignment: assignmentDetails) =>
        compareDates(assignment.due_date) >= 0 //only takes assignments due today or due later
    )
    .slice(0, 3) //takes first 4 assignments in the array
);

sortedAssignments.value.forEach((assignment) => {
  if (compareDates(assignment.due_date) === 0) {
    dueToday.value = true; // checks if there are assignments due today
  } else if (compareDates(assignment.due_date) === 1) {
    dueLater.value = true; // checks if there are assignments due later
  }
});

//The props are registered separately. Every prop name correlates to the dynamic parts of every class preview.
</script>

<template>
  <div class="w-[390px] my-10 ms-[100px] place-items-center">
    <div class="w-full relative rounded-[24px] shadow-inner">
      <div
        class="w-full text-center text-xl static font-medium drop-shadow-md shadow-md pt-12 pb-6 px-1 rounded-[24px_24px_0px_0px] max-md:px-5 shadow-innertop shadow-black duration-500 hover:shadow-transparent hover:cursor-pointer text-[#F8F8F8] bg-[#AAB941]"
        v-on:click="
          userQuestions.$patch({
            classCode: classCode,
          }),
            router.push({
              path: `/user-${userStore.username}/class-${classCode}`,
            })
        "
      >
        <h2
          class="text-[37.5px] truncate static px-4 pb-4 hover:cursor-pointer"
        >
          {{ titleInformation }}
        </h2>
        <h2 class="text-lg">with {{ teacherInformation }}</h2>
      </div>

      <div
        class="text-[27px] shadow-black shadow-innerleft duration-500 hover:shadow-transparent py-1 relative h-40 overflow-y-scroll scroll-smooth bg-opacity-30 shadow-inner text-center flex flex-col items-center bg-[#CCD396] text-[#6C7439]"
      >
        <h2 class="font-semibold" v-if="dueToday">Due Today:</h2>
        <template v-for="assignment in sortedAssignments" :key="assignment.id">
          <h3
            v-on:click="userQuestions.$updateState(assignment, classCode)"
            class="w-fit hover:cursor-pointer hover:underline"
            v-if="compareDates(assignment.due_date) === 0"
          >
            {{ assignment.name }}
          </h3>
        </template>
        <div class="flex flex-col items-center">
          <h2 class="font-semibold" v-if="dueLater">Due Later:</h2>
          <template
            v-for="assignment in sortedAssignments"
            :key="assignment.id"
          >
            <h3
              v-on:click="userQuestions.$updateState(assignment, classCode)"
              class="w-fit hover:cursor-pointer hover:underline"
              v-if="compareDates(assignment.due_date) === 1"
            >
              {{ assignment.name }}
            </h3>
          </template>
          <h2
            class="w-fit text-opacity-50 text-[20px] py-16"
            v-if="sortedAssignments.length === 0"
          >
            You currently have no assignments due
          </h2>
        </div>
      </div>
      <div
        class="duration-500 hover:shadow-transparent hover:cursor-pointer w-full py-2 bottom-[0%] relative rounded-b-[24px] shadow-innerbottom shadow-black place-items-center bg-[#AAB941] text-[#F8F8F8]"
      >
        <h2
          v-on:click="
            router.push({
              path: `/user-${userStore.username}/class-${classCode}`,
            })
          "
          class="w-full h-full relative text-center text-[32px] font-medium"
        >
          Past assignments
        </h2>
      </div>
    </div>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 10px;
  margin-right: 100px;
  display: none;
}
</style>
