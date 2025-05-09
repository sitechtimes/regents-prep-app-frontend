<template>
  <div class="bg-gray flex min-h-screen w-screen flex-col items-center justify-center py-12">
    <h1 class="text-5xl font-bold">Set New Password</h1>
    <div class="mb-4 flex flex-col items-center justify-center rounded-3xl bg-body p-4">
      <form class="login flex w-full flex-col items-center justify-center gap-7" @submit.prevent="onSubmit">
        <div class="relative flex flex-col items-start justify-center gap-1">
          <label class="font-medium" for="newPassword1"> New Password <span title="Required" class="font-2xl text-red-500">*</span> </label>
          <input
            id="newPassword1"
            v-model="newPassword1"
            class="h-12 w-96 rounded-lg border-0 bg-gray-accent px-4 transition duration-300 focus:bg-[color:var(--bg-color)] focus:outline focus:outline-2 focus:outline-[color:var(--primary)]"
            type="password"
            required
          />
        </div>

        <div class="relative flex flex-col items-start justify-center gap-1">
          <label class="font-medium" for="newPassword2"> Confirm New Password <span title="Required" class="font-2xl text-red-500">*</span> </label>
          <input
            id="newPassword2"
            v-model="newPassword2"
            class="h-12 w-96 rounded-lg border-0 bg-gray-accent px-4 transition duration-300 focus:bg-[color:var(--bg-color)] focus:outline focus:outline-2 focus:outline-[color:var(--primary)]"
            type="password"
            required
          />
        </div>

        <p v-if="notMatching" class="error font-medium text-red-500">Passwords do not match</p>
        <p v-if="submitError" class="error font-medium text-red-500">{{ errorMessage }}</p>

        <div class="relative flex w-96 flex-col items-center justify-center gap-1">
          <button class="w-52 items-center rounded-lg bg-green-accent px-16 py-2 hover:brightness-[0.85]" type="submit">
            <span v-if="loading" class="loading du-loading du-loading-sm mt-1"></span>
            <span v-else class="text-lg">Reset Password</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <PasswordResetModal v-model="showModal" @confirm="handleConfirm" />
</template>

<script setup lang="ts">
const newPassword1 = ref("");
const newPassword2 = ref("");
const loading = ref(false);
const notMatching = ref(false);
const submitError = ref(false);
const showModal = ref(false);
const route = useRoute();
const router = useRouter();
const errorMessage = ref();
const uid = String(route.query.uid ?? "");
const token = String(route.query.token ?? "");

async function onSubmit() {
  if (newPassword1.value !== newPassword2.value) {
    submitError.value = false;
    notMatching.value = true;
    return;
  }

  notMatching.value = false;
  submitError.value = false;
  loading.value = true;

  const { data: response } = await tryCatch(confirmResetPassword(uid, token, newPassword1.value, newPassword2.value));
  errorMessage.value = response;
  console.log(errorMessage.value);
  submitError.value = true;
  loading.value = false;
}

async function handleConfirm() {
  await router.push("/login");
}
</script>

<style scoped></style>
