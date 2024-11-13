<template>
  <Transition name="join-menu-scale">
    <div v-show="props.show" @click="emit('close')" class="join-menu-bg fixed top-0 left-0 bg-[rgba(0,0,0,0.25)] w-screen min-h-screen flex items-center justify-center z-[51]">
      <div @click.stop class="join-menu bg-white p-6 rounded-lg flex flex-col items-center justify-center">
        <h2 class="text-xl">Join a Course</h2>
        <form id="join-code" class="flex flex-col mb-4" @submit.prevent="joinCourse">
          <label class="du-label" for="joinCode">Join Code</label>
          <input class="du-input bg-gray-200 w-96" id="joinCode" type="text" v-model="joinCode" placeholder="Enter the 6-character join code" />
        </form>
        <div class="flex w-full justify-end gap-2">
          <button class="du-btn du-btn-md" @click="emit('close')">Cancel</button>
          <button class="du-btn du-btn-md bg-green-accent" form="join-code" type="submit">Join</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["close"]);

const joinCode = ref("");
watch(joinCode, (input) => {
  if (input.length > 6) return (joinCode.value = String(input).slice(0, 6));
});

onUnmounted(() => {
  joinCode.value = "";
});

function joinCourse() {
  if (!joinCode.value) return;
  alert("you are now enrolled in jail!");
  // make it join a class 👍
  // no way really? i think it should join a course instead
  emit("close");
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
