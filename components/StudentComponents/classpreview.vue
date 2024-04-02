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
  // theme: Theme;
  information: ClassPreviewInformation;
  class: course;
  assignments: Array<assignmentDetails>;
}>(); //The themes, information, and assignment are declared as props. They are separate interfaces declared in a typescript filed within the Interface folder.

/* const assignmentTheme = ref(props.theme.assignment);
const titleTheme = ref(props.theme.title);
const borderTheme = ref(props.theme.border);
const backgroundTheme = ref(props.theme.background); */
let date = new Date();

console.log(props.assignments);

function dateFormat(number: number) {
  if (number <= 10) {
    return `0${number}`;
  } else return number;
}

let dateFilter = `${date.getFullYear()}-${dateFormat(
  date.getMonth() + 1
)}-${dateFormat(date.getDate())}`;

function compareDates(date1: assignmentDetails, date2: string): number {
  if (date1 === undefined) {
    return -1;
  }
  const [year1, month1, day1] = date1.due_date.split("-").map(Number);
  const [year2, month2, day2] = date2.split("-").map(Number);
  if (year1 !== year2) {
    return year1 < year2 ? -1 : 1;
  }
  if (month1 !== month2) {
    return month1 < month2 ? -1 : 1;
  }
  if (day1 !== day2) {
    return day1 < day2 ? -1 : 1;
  }
  return 0; // dates are equal
}

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
        compareDates(assignment, dateFilter) >= 0
    )
    .slice(0, 3)
);

sortedAssignments.value.forEach((assignment) => {
  if (compareDates(assignment, dateFilter) === 0) {
    dueToday.value = true;
  } else if (compareDates(assignment, dateFilter) === 1) {
    dueLater.value = true;
  }
});

function updateState(item: assignmentDetails) {
  router.push({
    path: `/user-${userStore.username}/class-${classCode}/assignment-${item.name}`,
  });
  userQuestions.$patch({
    classCode: classCode.value,
    assignmentName: item.name,
    dueDate: item.due_date,
  });
}
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
            v-on:click="updateState(assignment)"
            class="w-fit hover:cursor-pointer hover:underline"
            v-if="compareDates(assignment, dateFilter) === 0"
          >
            <!-- PROGRESS WAS ENDED HERE -->
            {{ assignment.name }}
          </h3>
        </template>
        <div class="flex flex-col items-center">
          <h2 class="font-semibold" v-if="dueLater">Due Wednesday:</h2>
          <template
            v-for="assignment in sortedAssignments"
            :key="assignment.id"
          >
            <h3
              v-on:click="updateState(assignment)"
              class="w-fit hover:cursor-pointer hover:underline"
              v-if="compareDates(assignment, dateFilter) === 1"
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
