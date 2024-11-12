<template>
  <Transition name="join-menu-scale">
    <div v-show="props.show" @click="emits('close')" class="join-menu-bg fixed top-0 left-0 bg-[rgba(0,0,0,0.25)] dark:invert w-screen min-h-screen flex items-center justify-center z-[51]">
      <div @click.stop class="join-menu bg-white p-6 rounded-lg flex flex-col items-center justify-center">
        <h2 class="text-xl dark:invert">Join A Class</h2>
        <form id="joinCodeForm" class="flex flex-col mb-4 dark:invert" @submit.prevent="joinCourse">
          <label class="du-label" for="joinCode">Join Code</label>
          <input class="du-input bg-gray-200" id="joinCode" type="text" v-model="joinCode" placeholder="enter the 6 digit join code" />
        </form>
        <div class="flex w-full justify-end gap-2">
          <button class="du-btn du-btn-sm dark:invert" @click="emits('close')">Cancel</button>
          <button class="du-btn du-btn-sm bg-green-accent dark:invert" form="joinCodeForm" type="submit">Join</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();

const emits = defineEmits(["close"]);

const joinCode = ref("");
watch(joinCode, (input) => {
  if (input.length > 6) return (joinCode.value = String(input).slice(0, 6));
});

function joinCourse() {
  if (!joinCode.value) return;
  alert("you are now enrolled in jail!");
  // make it join a class 👍
  // no way really? i think it should join a course instead
}
</script>

<style scoped>
.join-menu-scale-enter-active,
.join-menu-scale-leave-active {
  transition: all 0.2s ease-in-out;
}

.join-menu-scale-enter-from,
.join-menu-scale-leave-to {
  opacity: 0;
}

.join-menu-scale-enter-from .join-menu,
.join-menu-scale-leave-to .join-menu {
  transform: scale(0.75);
}
</style>
