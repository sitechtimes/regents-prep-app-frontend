<script setup lang="ts">
import { studentAssignments } from "~/interfaces/interfaces";
import { userClass } from "~/stores/class";

const classStore = userClass();
const open = ref(true);

const props = defineProps<{
  date: string;
}>();
defineExpose({
  props,
});

function selectAssignment(item: studentAssignments) {
  classStore.tempSelectedAssignment = item;
}

onMounted(() => {
  document.addEventListener('click', classStore.resetAssignment);
});

onUnmounted(() => {
  document.removeEventListener('click', classStore.resetAssignment);
});
</script>

<template>
  <div
    class="h-auto mb-[4rem] relative bg-bg-navbar rounded-[35px] drop-shadow-lg"
  >
    <div
      class="w-full h-[56px] flex flex-col justify-around bg-bg-light rounded-t-[35px] shadow-black shadow-innervar"
    >
      <div
        class="h-auto box-border text-center text-lime-800 text-4xl font-medium"
      >
        {{ date.slice(0, 10) }}
      </div>
    </div>

    <div
      class="pt-[2.5rem] flex flex-col items-center rounded-b-[35px] shadow-black shadow-innervar"
    >
      <StudentComponentsAssignmentsTemp
        v-for="assignment in classStore.currentAssignments"
        :name="assignment.name"
        :detail="assignment.question_number"
        @click.stop="selectAssignment(assignment)"
        :key="assignment.id"
      />
    </div>
  </div>
</template>
