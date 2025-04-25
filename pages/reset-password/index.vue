<template>
  <div class="flex min-h-screen w-screen flex-col items-center justify-center py-12">
    <h1 class="text-5xl font-bold">Reset Password</h1>
    <div class="mb-2 flex flex-col items-center justify-center rounded-3xl p-4">
      <h3 class="mb-4">Enter your email address below to receive the link.</h3>
      <form class="login flex w-full flex-col items-center justify-center gap-7" @submit.prevent="onSubmit">
        <div class="relative flex flex-col items-start justify-center gap-1">
          <label class="font-medium" for="email"> Email Address <span title="Required" class="font-2xl text-red-500">*</span> </label>
          <input id="email" v-model="email" class="h-12 w-96 rounded-lg border-0 bg-gray-accent px-4 transition duration-300" type="email" required autocomplete="email" />
        </div>

        <div class="relative flex w-96 flex-col items-center justify-center gap-1">
          <button class="w-40 items-center rounded-lg bg-green-accent px-16 py-2 hover:brightness-[0.85]" type="submit">
            <span v-if="loading" class="loading du-loading du-loading-sm mt-1"></span>
            <span v-else class="text-lg">Send</span>
          </button>
        </div>
        <p v-if="error" class="font-medium text-red-500">Something went wrong. Please try again.</p>
        <p v-if="success" class="font-medium text-green-600">Reset link sent! Please check your email.</p>
      </form>
    </div>
    <NuxtLink to="/login" class="mt-3 text-neutral-600 dark:text-neutral-200"> Remembered your password? Login here. </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const loading = ref(false);
const error = ref(false);
const success = ref(false);

async function onSubmit() {
  error.value = false;
  success.value = false;
  loading.value = true;

  const { error: sendError } = await tryCatch(resetPassword(email.value));

  loading.value = false;

  if (sendError) {
    error.value = true;
    console.error("Reset email failed:", sendError);
  } else {
    success.value = true;
  }
}
</script>

<style scoped></style>
