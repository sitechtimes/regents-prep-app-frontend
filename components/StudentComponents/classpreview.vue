<script setup lang="ts">
import { Theme, Information, Assignment } from "~/interfaces/interfaces";
import { userState } from "~/stores/users";

const userStore = userState();
const router = useRouter();

onMounted(() => {
  console.log(userStore.user.username);
});

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
const classCode = ref(props.information.classCode);

const todayAssignment = ref(props.assignment.today);
const otherAssignment = ref(props.assignment.otherDay);

function getClass() {
  router.push({
    path: `/user-${userStore.user.username}/class-${classCode}`,
  });
}
</script>

<template>
  <div class="w-[390px] h-[371px] relative m-12">
    <div
      :class="backgroundTheme"
      class="w-full h-[371px] relative bg-opacity-30 rounded-[60px] shadow-inner"
    >
      <div
        :class="[titleTheme, borderTheme]"
        class="w-full text-center text-xl font-medium shadow-md pt-12 pb-6 px-1 rounded-[60px_60px_0px_0px] max-md:px-5 shadow-innertop shadow-black"
      >
        <h2
          v-on:click="
            router.push({
              path: `/user-${userStore.user.username}/class-${classCode}`,
            })
          "
          :class="titleTheme"
          class="text-[37.5px] mx-2 mb-2"
        >
          {{ titleInformation }}
        </h2>
        <h2 :class="titleTheme" class="text-lg">
          with {{ teacherInformation }}
        </h2>
      </div>

      <div class="text-[27px] py-1 relative text-center">
        <div>
          <h2 :class="assignmentTheme" class="font-semibold">Due Today:</h2>
          <h3
            v-on:click="
              router.push({
                path: `/user-${userStore.user.username}/class-${classCode}/assignment-${todayAssignment[0]}`,
              })
            "
            :class="assignmentTheme"
          >
            {{ todayAssignment[0] }}
          </h3>
          <h3
            v-on:click="
              router.push({
                path: `/user-${userStore.user.username}/class-${classCode}/assignment-${todayAssignment[1]}`,
              })
            "
            :class="assignmentTheme"
          >
            {{ todayAssignment[1] }}
          </h3>
        </div>
        <h2 :class="assignmentTheme" class="font-semibold">Due Wednesday:</h2>
        <template v-if="todayAssignment.length >= 2">
          <h3
            v-on:click="
              router.push({
                path: `/user-${userStore.user.username}/class-${classCode}/assignment-${otherAssignment[0]}`,
              })
            "
            :class="assignmentTheme"
          >
            {{ otherAssignment[0] }}
          </h3>
        </template>
        <template v-else-if="todayAssignment.length <= 1">
          <h3
            v-on:click="
              router.push({
                path: `/user-${userStore.user.username}/class-${classCode}/assignment-${otherAssignment[0]}`,
              })
            "
            :class="assignmentTheme"
          >
            {{ otherAssignment[0] }}
          </h3>
          <h3
            v-on:click="
              router.push({
                path: `/user-${userStore.user.username}/class-${classCode}/assignment-${otherAssignment[1]}`,
              })
            "
            :class="assignmentTheme"
          >
            {{ otherAssignment[1] }}
          </h3>
        </template>
      </div>
      <div
        :class="borderTheme"
        class="w-full h-[65px] bottom-[0%] absolute rounded-b-[60px] shadow-innerbottom shadow-black"
      >
        <h2
          v-on:click="
            router.push({
              path: `/user-${userStore.user.username}/class-${classCode}`,
            })
          "
          :class="titleTheme"
          class="w-full h-full relative text-center text-[32px] font-medium"
        >
          Past assignments
        </h2>
      </div>
    </div>
  </div>
</template>
