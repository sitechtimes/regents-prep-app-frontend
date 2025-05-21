<template>
  <div class="bg-gray flex min-h-screen w-screen flex-col items-center justify-center py-12">
    <h1 class="text-3xl font-bold md:text-5xl">Set New Password</h1>
    <div class="mb-4 flex flex-col items-center justify-center rounded-3xl bg-body p-4">
      <form class="login flex w-full flex-col items-center justify-center gap-7" @submit.prevent="onSubmit">
        <div class="relative flex flex-col items-start justify-center gap-1">
          <label class="font-medium" for="newPassword1"> New Password <span title="Required" class="font-2xl text-red-500">*</span> </label>
          <input
            id="newPassword1"
            v-model="newPassword1"
            class="h-12 w-[22rem] rounded-lg border-0 bg-gray-accent px-4 focus:bg-[color:var(--bg-color)] focus:outline focus:outline-2 focus:outline-[color:var(--primary)]"
            type="password"
            required
          />
        </div>

        <div class="relative flex flex-col items-start justify-center gap-1">
          <label class="font-medium" for="newPassword2"> Confirm New Password <span title="Required" class="font-2xl text-red-500">*</span> </label>
          <input
            id="newPassword2"
            v-model="newPassword2"
            class="h-12 w-[22rem] rounded-lg border-0 bg-gray-accent px-4 focus:bg-[color:var(--bg-color)] focus:outline focus:outline-2 focus:outline-[color:var(--primary)]"
            type="password"
            required
          />
        </div>

        <p v-if="notMatching" class="error font-medium text-red-500">Passwords do not match</p>
        <p v-if="submitError" class="error font-medium text-red-500">{{ errorMessage }}</p>

        <div class="relative flex flex-col items-center justify-center gap-1">
          <button class="items-center rounded-lg bg-green-accent px-16 py-2 hover:brightness-[0.85]" type="submit">
            <span v-if="loading" class="loading du-loading du-loading-sm mt-1"></span>
            <span v-else class="text-nowrap text-lg">Reset Password</span>
          </button>
        </div>
      </form>
    </div>
  </div>
  <FullScreenModal :show-modal="showModal" transition-name="scale-75" @close="showModal = false">
    <h2 class="mb-2 text-xl font-semibold">Password Reset Successful!</h2>
    <p class="mb-4 text-neutral-600 dark:text-neutral-400">Click OK to continue.</p>
    <button class="du-btn du-btn-md bg-green-accent text-white" type="button" @click="handleConfirm">OK</button>
  </FullScreenModal>
</template>

<script setup lang="ts">
definePageMeta({
  requiresAuth: false,
  redirectIfAuth: true,
  middleware: (to) => {
    if (!to.query.uid && !to.query.token) return navigateTo("/reset-password", { redirectCode: 301 });
  }
});

const route = useRoute();
const router = useRouter();

const uid = String(route.query.uid ?? "");
const token = String(route.query.token ?? "");

const newPassword1 = ref("");
const newPassword2 = ref("");

const loading = ref(false);
const notMatching = ref(false);
const submitError = ref(false);
const errorMessage = ref("");

const showModal = ref(false);

async function onSubmit() {
  if (newPassword1.value !== newPassword2.value) {
    submitError.value = false;
    notMatching.value = true;
    return;
  }

  notMatching.value = false;
  submitError.value = false;
  loading.value = true;

  const { data: response } = await tryRequestEndpoint<{ detail?: string; new_password2?: string; token?: string }>(
    `/auth/password/reset/confirm/`,
    "POST",
    // eslint-disable-next-line camelcase
    { uid, token, new_password1: newPassword1.value, new_password2: newPassword2.value }, // backend needs it in snake_case
    true
  );
  const data = response?.new_password2?.[0] ?? response?.detail ?? response?.token?.[0];

  if (typeof data !== "string") {
    submitError.value = true;
    errorMessage.value = "An unexpected error occurred.";
    return;
  }

  errorMessage.value = data;
  if (data === "Password has been reset with the new password.") showModal.value = true;
  else submitError.value = true;
  loading.value = false;
}

async function handleConfirm() {
  await router.push("/login");
}
</script>

<style scoped></style>
