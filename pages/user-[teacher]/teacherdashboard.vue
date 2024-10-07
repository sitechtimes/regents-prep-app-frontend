<script setup lang="ts">
import { userState } from "~/stores/users";
import teacherAuth from "~/middleware/teacherAuth";
import { userClass } from "~/stores/class";

const courseList = ref(userState().teacherCourses);
const classStore = userClass();
const userStore = userState();

definePageMeta({
  layout: "dashboard",
  middleware: teacherAuth,
});

const router = useRouter();

onMounted(() => {
  classStore.$reset();
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
        <teacherClass
          class="z-10"
          @click="
          console.log(
            `/user-${userStore.username}/class-${classStore.classCode}`
          ),
            router.push({
              path: `/user-${classStore.className}/class-${classStore.classCode}`,
            })
          "
          v-for="teacherclass in courseList"
          :key="teacherclass.name"
          :name="teacherclass.name"
          :code="teacherclass.class_code"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

@media all and (max-width: 100rem) {
}
</style>
