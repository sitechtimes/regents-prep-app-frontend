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

function dateFormat(number: number) {
  if (number <= 10) {
    return `0${number}`;
  } else return number;
}

let dateFilter = `${date.getFullYear()}-${dateFormat(
  date.getMonth() + 1
)}-${dateFormat(date.getDate())}`;

function compareDates(date1: string, date2: string): number {
  const [year1, month1, day1] = date1.split("-").map(Number);
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

const sortedAssignments = ref(
  props.assignments.sort((a, b) => {
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
    return Number(dateB) - Number(dateA); // For descending order
  })
);

console.log(sortedAssignments);

const todayAssignment = ref(
  props.assignments.filter(
    (assignment) => compareDates(assignment.due_date, dateFilter) == 0
  )
);
const otherAssignment = ref(
  props.assignments.filter(
    (assignment) => compareDates(assignment.due_date, dateFilter) > 0
  )
);

console.log(otherAssignment);
console.log(new Date(props.assignments[0].due_date));

function updateState(\index: number) {
  router.push({
    path: `/user-${userStore.username}/class-${classCode}/assignment-${sortedAssignments.value[index].name}`,
  });
  userQuestions.$patch({
    classCode: classCode.value,
    assignmentName: sortedAssignments.value[index].name,
    dueDate: sortedAssignments.value[index].due_date,
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
        <h2
          class="font-semibold"
          v-if="compareDates(sortedAssignments[0].due_date, dateFilter) === 0"
        >
          Due Today:
        </h2>
        <h3
          v-on:click="updateState(0)"
          class="w-fit hover:cursor-pointer hover:underline"
          v-if="compareDates(sortedAssignments[0].due_date, dateFilter) === 0"
        >
          <!-- PROGRESS WAS ENDED HERE -->
          {{ sortedAssignments[0].name }} ({{ todayAssignment[0].qLeft }})
        </h3>
        <h3
          v-on:click="updateState(1)"
          class="w-fit hover:cursor-pointer hover:underline"
          v-if="compareDates(sortedAssignments[1].due_date, dateFilter) === 0"
        >
          {{ sortedAssignments[1].name }} ({{ todayAssignment[1].qLeft }})
        </h3>

        <div class="flex flex-col items-center">
          <h2
            class="font-semibold"
            v-if="
              compareDates(sortedAssignments[1].due_date, dateFilter) === 1 ||
              compareDates(sortedAssignments[2].due_date, dateFilter) === 1
            "
          >
            Due Wednesday:
          </h2>
          <template
            v-if="compareDates(sortedAssignments[1].due_date, dateFilter) === 0"
          >
            <h3
              v-on:click="updateState(3)"
              class="w-fit hover:cursor-pointer hover:underline"
              v-if="sortedAssignments[4] !== undefined"
            >
              {{ sortedAssignments[3].name }} ({{ otherAssignment[0].qLeft }})
            </h3>
          </template>
          <template
            v-else-if="
              compareDates(sortedAssignments[1].due_date, dateFilter) === 1
            "
          >
            <h3
              v-on:click="updateState(3)"
              class="w-fit hover:cursor-pointer hover:underline"
              v-if="
                compareDates(sortedAssignments[2].due_date, dateFilter) === 1
              "
            >
              {{ sortedAssignments[3].name }} ({{ otherAssignment[0].qLeft }})
            </h3>
            <h3
              v-on:click="updateState(4)"
              class="w-fit hover:cursor-pointer hover:underline"
              v-if="sortedAssignments[4] !== undefined"
            >
              {{ sortedAssignments[4].name }} ({{ otherAssignment[1].qLeft }})
            </h3>
            <h2
              class="w-fit text-opacity-50 text-[20px] py-16"
              v-if="!sortedAssignments[0]"
            >
              You currently have no assignments due
            </h2>
          </template>
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
