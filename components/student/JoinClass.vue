<template>
  <Transition name="join-menu-scale">
    <div @click="openJoinMenu = false" v-show="openJoinMenu" class="join-menu-bg fixed top-0 left-0 bg-[rgba(0,0,0,0.25)] w-screen min-h-screen flex items-center justify-center z-[51]">
      <div @click="$event.stopPropagation()" class="join-menu bg-white p-6 rounded-lg flex flex-col items-center justify-center">
        <h2 class="text-xl">join a class</h2>
        <form id="joinCodeForm" class="flex flex-col mb-4" @submit="joinCourse" @submit.prevent>
          <label class="du-label" for="joinCode">join code</label>
          <input class="du-input bg-gray-200" id="joinCode" type="text" v-model="joinCode" placeholder="enter the 6 digit join code" />
        </form>
        <div class="flex w-full justify-end gap-2">
          <button class="du-btn du-btn-sm" @click="openJoinMenu = false">cancel</button>
          <button class="du-btn du-btn-sm bg-green-accent" form="joinCodeForm" type="submit">join</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const openJoinMenu = ref(true);
const joinCode = ref("");
watch(joinCode, (input) => {
  if (input.length > 6) return (joinCode.value = String(input).slice(0, 6));

  joinCode.value = [...String(input)].filter((char) => !isNaN(Number(char))).join("");
});

function joinCourse() {
  if (!joinCode.value) return;
  alert("you are now enrolled in jail!");
  // make it join a class 👍
  // no way really? i think it should join a course instead
}
</script>
