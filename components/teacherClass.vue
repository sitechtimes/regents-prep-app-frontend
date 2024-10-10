<script setup lang="ts">
import { teacherUserClass } from "~/stores/teacherStore/class";
import { userState } from "~/stores/users";

const classStore = teacherUserClass();
const userStore = userState();
const router = useRouter();

const props = defineProps<{
  name: string;
  code: string;
}>();

const className = ref<string>(props.name);
const classCode = ref<string>(props.code);
</script>

<template>
  <div class="w-[783px] h-[93px] flex">
    <button
      v-on:click="
        classStore.$patch({ className: className, classCode: classCode }),
          console.log(`/user-${userStore.username}/tclass-${classCode}`),
          router.push({
            path: `/user-${userStore.username}/tclass-${classCode}`,
          })
      "
      class="w-[785px] h-[95px] bg-primary rounded-[21px] shadow-[inset_0_4px_3px_rgba(0,0,0,0.3)] relative border-[2px] border-l-0 border-r-0 border-black flex flex-row m-auto ml-[-2px] mt-[-2px] mb-0 z-10"
    >
      <h2 class="h-[93px] text-white text-[35px] font-medium pt-[17px] pl-[3%]">
        {{ className }}
      </h2>
      <h3
        class="h-[93px] text-right text-white text-[30px] pt-[22px] font-medium pr-[3%] absolute right-1"
      >
        Access Code: {{ classCode }}
      </h3>
    </button>
  </div>
</template>

<style scoped></style>

<!-- <div class="w-[783px] h-[93px] bg-[#8C9930] flex"></div> -->
