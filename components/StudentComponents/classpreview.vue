<script setup lang="ts">
import { Theme, Information, Assignment } from "~/interfaces/interfaces";
import { userState } from "~/stores/users";

const userStore = userState();
const router = useRouter();

onMounted(() => {
  console.log(userStore.user.username);
});

function getClass() {
  router.push({ path: `/user-${userStore.user.username}/studentclass` });
}

const props = defineProps<{
  theme: Theme;
  information: Information;
  assignment: Assignment;
}>();

const assignmentTheme = ref(props.theme.assignment);
const titleTheme = ref(props.theme.title);
const borderTheme = ref(props.theme.border);
const backgroundTheme = ref(props.theme.background);

const titleInformation = ref(props.information.title);
const teacherInformation = ref(props.information.teacher);

const todayAssignment = ref(props.assignment.today);
const otherAssignment = ref(props.assignment.otherDay);
</script>

<template>
  <div class="w-[390px] h-[371px] relative m-12">
    <div
      :class="backgroundTheme"
      class="w-full h-[371px] relative bg-opacity-30 rounded-[60px] shadow-inner"
    >
      <div
        :class="[titleTheme, borderTheme]"
        class="w-full text-center text-xl font-medium shadow-md pt-12 pb-6 px-5 rounded-[60px_60px_0px_0px] max-md:px-5 shadow-innertop shadow-black"
      >
        <span v-on:click="getClass" :class="titleTheme" class="text-[35px]">
          {{ titleInformation }}
        </span>
        <span :class="titleTheme" class="text-xl">
          with {{ teacherInformation }}</span
        >
      </div>

      <div class="text-[27px] py-6 relative text-center">
        <div>
        <span :class="assignmentTheme" class="font-semibold"
        >Due Today:
        </span>
        <button :class="assignmentTheme" >
          {{ todayAssignment[0] }}
        </button>
        <button :class="assignmentTheme" >
          {{ todayAssignment[1] }}
        </button>
      </div>
        <span :class="assignmentTheme" class="font-semibold"
          >Due Wednesday:
        </span>
          <template v-if="todayAssignment.length >= 2">
            <button :class="assignmentTheme" >{{ otherAssignment[0] }}</button>
          </template>
          <template v-else-if="todayAssignment.length <= 1">
            <button :class="assignmentTheme" >{{ otherAssignment[0] }}</button>
            <br/>
            <button :class="assignmentTheme" >{{ otherAssignment[1] }}</button>
          </template>

      </div>
      <div
        :class="borderTheme"
        class="w-full h-[65px] bottom-[0%] absolute rounded-b-[60px] shadow-innerbottom shadow-black"
      >
        <button
          :class="titleTheme"
          class="w-full h-full relative text-center text-[32px] font-medium"
        >
          Past assignments
        </button>
      </div>
    </div>
  </div>
</template>

<!-- <template> Physics class template
  <div class="w-[390px] h-[371px] relative m-12">
    <div
      class="w-full h-[371px] relative bg-pink-200 bg-opacity-30 rounded-[60px] shadow-inner"
    >
      <div
        class="w-full text-stone-50 text-center text-xl font-medium shadow-md bg-indigo-400 pt-12 pb-6 px-5 rounded-[60px_60px_0px_0px] max-md:px-5"
      >
        <span v-on:click="getClass" class="text-white text-[35px]"
          >Regents Physics - P1
        </span>
        <span class="text-white text-xl">Mr. Colangelo</span>
      </div>

      <div class="text-[27px] py-5 relative text-center">
        <span class="text-violet-700 font-semibold">Due today: </span>
        <button class="text-violet-700">Kinematics (5)</button> <br />
        <button class="text-violet-700">Power (2)</button> <br />
        <span class="text-violet-700 font-semibold">Due Wednesday: </span
        ><button class="text-violet-700">Energy (10)</button>
      </div>

      <div
        class="w-full h-[65px] bottom-[0%] absolute bg-indigo-400 rounded-b-[60px] shadow-inner"
      >
        <button
          class="w-full h-full relative text-center text-stone-50 text-[32px] font-medium"
        >
          Past assignments
        </button>
      </div>
    </div>
  </div>
</template> -->
