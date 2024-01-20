<script setup>
import { userState } from "~/stores/users";
import { TeacherClass } from "#components";

const userStore = userState();

onMounted(() => {
  console.log(userStore.username);
});

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div
    class="w-[840px] h-[800px] flex flex-col items-center justify-center m-auto"
  >
    <div
      class="w-[840px] h-[720px] bg-[#426B1F] rounded-[24px] border-2 border-black z-20"
    >
      <h1
        class="w-[291px] h-[90px] text-center text-white text-[85px] font-medium m-auto mb-[40px]"
      >
        Classes
      </h1>
      <div
        class="scroll w-[787px] h-[548px] bg-[#EAE9CA] rounded-[24px] border-2 border-black m-auto flex flex-col scroll-smooth overflow-y-auto"
      >
        <TeacherClass
          class="z-10"
          v-for="teacherclass in teacherclasses"
          :key="teacherclass.name"
          :name="teacherclass.name"
          :code="teacherclass.code"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "teacherDashboard",
  components: {
    TeacherClass,
  },
  data() {
    return {
      teacherclasses: [
        {
          name: "Regents Physics - P1",
          code: "mo31b",
        },
        {
          name: "Regents Chemistry - P2",
          code: "98bh8",
        },
        {
          name: "Regents Algebra - P3",
          code: "wn43u",
        },
        {
          name: "Regents Algebra - P4",
          code: "wn43u",
        },
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  -webkit-text-stroke: 2px black;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  margin-right: 100px;
  display: none;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f2f1cd;
  border: solid black 2px;
  border-radius: 5px;
}
.scroll::-webkit-scrollbar {
  position: absolute;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 5px;
}

@media all and (max-width: 100rem) {
  
}
</style>
