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
      class="w-[840px] h-[720px] bg-secondary rounded-[24px] border-2 border-black z-20"
    >
      <h1
        class="w-[291px] h-[90px] text-center text-white text-[85px] font-medium m-auto mb-[40px]"
      >
        Classes
      </h1>
      <div
        class="scroll w-[787px] h-[548px] bg-bg-navbar rounded-[24px] border-2 border-black m-auto flex flex-col scroll-smooth overflow-y-auto"
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

<script>
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
::-webkit-scrollbar {
  display: none;
}

@media all and (max-width: 100rem) {
}
</style>
