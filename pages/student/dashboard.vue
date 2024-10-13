<template>
  <div class="flex flex-col items-start justify-start">
    <Transition name="join-menu-scale">
      <div @click="openJoinMenu = false" v-show="openJoinMenu"
        class="join-menu-bg fixed top-0 left-0 bg-[rgba(0,0,0,0.25)] w-screen h-screen flex items-center justify-center z-10">
        <div @click="$event.stopPropagation()"
          class="join-menu bg-white p-10 rounded-lg flex flex-col items-center justify-center">
          <p>join a class</p>
          <form id="joinCodeForm" @submit="joinCourse" @submit.prevent>
            <label for="joinCode">join code</label>
            <input id="joinCode" type="text" v-model="joinCode" placeholder="enter the 6 digit join code" />
          </form>
          <button @click="openJoinMenu = false">cancel</button>
          <button form="joinCodeForm" type="submit">join</button>
        </div>
      </div>
    </Transition>

    <div v-if="!loaded">
      <p>loading very hard............</p>
    </div>

    <div v-else class="flex flex-col items-start justify-start">
      <header class="w-screen h-16 flex items-center justify-around">
        <h1 class="text-3xl">unregents prep app</h1>
        <!-- change this to a plus symbol icon -->
        <button @click="openJoinMenu = true" class="text-5xl">+</button>
      </header>

      <h1 class="font-semibold text-3xl text-center w-full">[Name]'s Classes</h1>
      <StudentDashboardCard v-if="courses.length > 0" class="m-6" />
      <div v-else>
        <p>u have no classes try adding some</p>
        <button @click="openJoinMenu = true">add a class</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useUserStore();
const router = useRouter();

const { courses } = storeToRefs(store);
const currentTime = ref(new Date());

const loaded = ref(false);
const openJoinMenu = ref(false);
const joinCode = ref("");
watch(
  () => joinCode.value,
  (input) => {
    if (input.length > 6) return (joinCode.value = String(input).slice(0, 6));

    joinCode.value = [...String(input)].filter((char) => !isNaN(Number(char))).join("");
    if (input.length == 6) joinCourse();
  }
);

onMounted(() => {
  loaded.value = true;
});

function joinCourse() {
  if (!joinCode.value) return;
  // make it join a class 👍
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

@media (hover: hover) and (pointer: fine) {
  .assignment:hover {
    text-decoration: underline;
  }
}
</style>
