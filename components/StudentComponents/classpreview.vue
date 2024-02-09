<script setup lang="ts">
import {
  // Theme,
  ClassPreviewInformation,
  ClassPreviewAssignments,
} from "~/interfaces/interfaces";
import { useQuestions } from "~/stores/questions";
import { userState } from "~/stores/users";

const userStore = userState();
const userQuestions = useQuestions();
const router = useRouter();

onMounted(() => {
  console.log(userStore.username);
  console.log(userQuestions.qText);
});

const props = defineProps<{
  // theme: Theme;
  information: ClassPreviewInformation;
  assignment: ClassPreviewAssignments;
}>(); //The themes, information, and assignment are declared as props. They are separate interfaces declared in a typescript filed within the Interface folder.

/* const assignmentTheme = ref(props.theme.assignment);
const titleTheme = ref(props.theme.title);
const borderTheme = ref(props.theme.border);
const backgroundTheme = ref(props.theme.background); */

const titleInformation = ref(props.information.title);
const teacherInformation = ref(props.information.teacher);
const classCode = ref(props.information.classCode);

const todayAssignment = ref(props.assignment.today);
const otherAssignment = ref(props.assignment.otherDay);

//The props are registered separately. Every prop name correlates to the dynamic parts of every class preview.
</script>

<template>
  <div class="w-[390px] my-10 ms-[100px] place-items-center">
    <div class="w-full relative rounded-[24px] shadow-inner">
      <div
        class="w-full text-center text-xl static font-medium drop-shadow-md shadow-md pt-12 pb-6 px-1 rounded-[24px_24px_0px_0px] max-md:px-5 shadow-innertop shadow-black duration-500 hover:shadow-transparent hover:cursor-pointer text-[#F8F8F8] bg-[#AAB941]"
        v-on:click="
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
        <h2 class="font-semibold" v-if="todayAssignment.length >= 1">
          Due Today:
        </h2>
        <h3
          v-on:click="
            router.push({
              path: `/user-${userStore.username}/class-${classCode}/assignment-${todayAssignment[0].name}`,
            }),
              userQuestions.$patch((state) => {
                state.qLeft = todayAssignment[0].qLeft;
                state.timeLeft = todayAssignment[0].timeLeft;
                state.qText = todayAssignment[0].question.qText;
              })
          "
          class="w-fit hover:cursor-pointer hover:underline"
          v-if="todayAssignment.length >= 1"
        >
          <!-- PROGRESS WAS ENDED HERE -->
          {{ todayAssignment[0].name }} ({{ todayAssignment[0].qLeft }})
        </h3>
        <h3
          v-on:click="
            router.push({
              path: `/user-${userStore.username}/class-${classCode}/assignment-${todayAssignment[1].name}`,
            })
          "
          class="w-fit hover:cursor-pointer hover:underline"
          v-if="todayAssignment.length > 1"
        >
          {{ todayAssignment[1].name }} ({{ todayAssignment[1].qLeft }})
        </h3>

        <div class="flex flex-col items-center">
          <h2 class="font-semibold" v-if="otherAssignment.length >= 1">
            Due Wednesday:
          </h2>
          <template v-if="todayAssignment.length > 1">
            <h3
              v-on:click="
                router.push({
                  path: `/user-${userStore.username}/class-${classCode}/assignment-${otherAssignment[0].name}`,
                })
              "
              class="w-fit hover:cursor-pointer hover:underline"
              v-if="otherAssignment.length >= 1"
            >
              {{ otherAssignment[0].name }} ({{ otherAssignment[0].qLeft }})
            </h3>
          </template>
          <template v-else-if="todayAssignment.length <= 1">
            <h3
              v-on:click="
                router.push({
                  path: `/user-${userStore.username}/class-${classCode}/assignment-${otherAssignment[0].name}`,
                })
              "
              class="w-fit hover:cursor-pointer hover:underline"
              v-if="otherAssignment.length >= 1"
            >
              {{ otherAssignment[0].name }} ({{ otherAssignment[0].qLeft }})
            </h3>
            <h3
              v-on:click="
                router.push({
                  path: `/user-${userStore.username}/class-${classCode}/assignment-${otherAssignment[1].name}`,
                })
              "
              class="w-fit hover:cursor-pointer hover:underline"
              v-if="otherAssignment.length >= 1"
            >
              {{ otherAssignment[1].name }} ({{ otherAssignment[1].qLeft }})
            </h3>
            <h2
              class="w-fit text-opacity-50 text-[20px] py-16"
              v-if="todayAssignment.length < 1 && otherAssignment.length < 1"
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
