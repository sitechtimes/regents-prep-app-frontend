<template>
  <Transition name="join-menu-scale">
    <div v-if="props.show" @click="emit('close')" class="join-menu-bg fixed left-0 top-0 z-[50] flex min-h-screen w-screen items-center justify-center bg-black bg-opacity-45">
      <div @click.stop class="join-menu flex flex-col items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-color)] p-6">
        <h2 class="text-xl font-semibold text-[var(--text-color)]">Join a Course</h2>
        <form id="join-code" class="mb-4 flex flex-col" @submit.prevent="joinCourse">
          <label class="du-label" for="joinCode">Join Code</label>
          <input class="du-input w-96 bg-gray-200 text-black" id="joinCode" type="text" v-model="joinCode" placeholder="Enter the 6-characters join code" />
        </form>
        <div class="flex w-full justify-end gap-2">
          <button class="rounded-lg border border-[var(--border-color)] px-4 py-2" @click="emit('close')">Cancel</button>
          <button
            class="rounded-lg bg-[var(--primary)] px-4 py-2 text-[var(--text-color)]"
            :class="{ grayscale: joinCode.length != 6 }"
            :disabled="joinCode.length != 6"
            form="join-code"
            type="submit"
          >
            Join
          </button>
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
