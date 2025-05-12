<template>
  <FullScreenModal transition-name="scale-75" :show-modal="show" @close="closeModal">
    <div class="flex w-full flex-col gap-2 md:gap-4 lg:gap-6" @click.stop>
      <h2 class="text-2xl font-semibold dark:text-white">Join a class</h2>

      <form id="join-code-form" class="flex w-full flex-col" @submit.prevent="submit">
        <label for="join-code" class="text-lg font-medium">Class Code</label>
        <p class="text-sm text-neutral-700 dark:text-neutral-300">Enter the class code provided by your teacher</p>
        <p v-if="isErrored || isSuccess" class="mb-2 mt-1 font-medium leading-normal" :class="{ 'text-red-500': isErrored, 'text-green-500': isSuccess }">
          {{ isErrored ? "Something went wrong. Try again" : isSuccess ? "Successfully enrolled!" : "." }}
        </p>
        <input id="join-code" v-model="joinCode" class="du-input w-64 rounded-lg border border-neutral-400 bg-body sm:w-96 dark:border-neutral-600" type="text" placeholder="Class code" />
      </form>

      <div class="flex w-full justify-end gap-2">
        <button class="rounded-xl px-5 py-1.5 text-lg font-medium transition hover:bg-neutral-200 hover:dark:bg-neutral-700" type="button" @click="closeModal">Cancel</button>
        <button
          class="rounded-xl bg-green-400 px-5 py-1.5 text-lg font-medium transition hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800"
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
  </FullScreenModal>
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

  const { data: course, error } = await tryRequestEndpoint<StudentCourse>(`courses/student/join/${joinCode.value}/`, "POST");
  isLoading.value = false;

  if (error) {
    console.error(error);
    isLoading.value = false;
    isErrored.value = true;
    return;
  }

  course.assignments = [];
  studentCourses.value.splice(0, 0, course);
  isSuccess.value = true;

  setTimeout(() => {
    isSuccess.value = false;
    closeModal();
  }, 1500);
}
</script>

<style scoped></style>
