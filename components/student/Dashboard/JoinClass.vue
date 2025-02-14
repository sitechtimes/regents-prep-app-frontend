<template>
  <Teleport to="body">
    <Transition name="join-menu-scale">
      <div v-if="show" class="fixed left-0 top-0 z-30 flex min-h-screen w-screen items-center justify-center bg-black/45" @click="closeModal">
        <div class="join-menu bg-body w-125 flex flex-col items-start justify-center gap-4 rounded-xl p-6" @click.stop>
          <h2 class="text-2xl font-semibold dark:text-white">Join a class</h2>

          <form id="join-code-form" class="flex w-full flex-col rounded-xl border-2 border-neutral-200 p-6" @submit.prevent="submit">
            <label for="join-code" class="text-lg font-medium">Class Code</label>
            <p class="text-sm text-neutral-700">Enter the class code provided by your teacher</p>
            <p class="my-2 font-medium leading-normal" :class="{ 'opacity-0': !isErrored && !isSuccess, 'text-red-500': isErrored, 'text-green-500': isSuccess }">
              {{ isErrored ? "Something went wrong. Try again" : isSuccess ? "Successfully enrolled!" : "." }}
            </p>
            <input id="join-code" v-model="joinCode" class="bg-body du-input w-96 rounded-lg border border-neutral-400" type="text" placeholder="Class code" />
          </form>

          <div class="flex w-full justify-end gap-2">
            <button class="rounded-xl px-5 py-1.5 text-lg font-medium transition hover:bg-neutral-200" type="button" @click="closeModal">Cancel</button>
            <button
              class="rounded-xl bg-green-300 px-5 py-1.5 text-lg font-medium transition hover:bg-green-400"
              :class="{ 'pointer-events-none grayscale': joinCode.length != 6 }"
              :disabled="joinCode.length != 6"
              form="join-code-form"
              type="submit"
            >
              <span v-if="isLoading" class="du-loading-spinner"></span>
              <span v-else>Join</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>();
const emit = defineEmits<{ close: [void] }>();

const userStore = useUserStore();
const { studentCourses } = storeToRefs(userStore);

const isLoading = ref(false);
const isSuccess = ref(false);
const isErrored = ref(false);

const joinCode = ref("");
watch(joinCode, (input) => {
  if (input.length > 6) return (joinCode.value = String(input).slice(0, 6));
});

function closeModal() {
  joinCode.value = "";
  isLoading.value = false;
  isSuccess.value = false;
  isErrored.value = false;
  emit("close");
}

async function submit() {
  if (!joinCode.value) return;
  isLoading.value = true;
  isErrored.value = false;

  try {
    const course = await joinCourse(joinCode.value);
    isLoading.value = false;

    studentCourses.value.splice(0, 0, course);
    isSuccess.value = true;

    setTimeout(() => {
      isSuccess.value = false;
      closeModal();
    }, 1500);
  } catch (error) {
    console.error(error);
    isLoading.value = false;
    isErrored.value = true;
  }
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
