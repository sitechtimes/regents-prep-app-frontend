<template>
  <div class="bg-gray flex min-h-screen w-screen flex-col items-center justify-center py-12">
    <h1 class="text-5xl font-bold">Welcome back!</h1>
    <div class="mb-4 flex flex-col items-center justify-center rounded-3xl bg-[color:var(--bg-color)] p-4">
      <h3 class="mb-4">Log in to your Regents Prep App account</h3>

      <form class="login flex w-full flex-col items-center justify-center gap-7" @submit="loginWithEmail" @submit.prevent>
        <div class="relative flex flex-col items-start justify-center gap-1">
          <label class="font-medium" for="email">Email Address <span title="Required" class="font-2xl text-red-500">*</span></label>
          <input
            id="email"
            v-model="email"
            class="h-12 w-96 rounded-lg border-0 bg-gray-accent px-4 transition duration-300 focus:bg-[color:var(--bg-color)] focus:outline focus:outline-2 focus:outline-[color:var(--primary)]"
            type="email"
            required
            autocomplete="email"
          />
          <p v-show="emailErr.length > 0" class="error font-medium text-red-500">{{ emailErr }}</p>
        </div>

        <div class="relative flex flex-col items-start justify-center gap-1">
          <label class="font-medium" for="password">Password <span title="Required" class="font-2xl text-red-500">*</span></label>
          <input
            id="password"
            v-model="password"
            class="h-12 w-96 rounded-lg border-0 bg-gray-accent px-4 transition duration-300 focus:bg-[color:var(--bg-color)] focus:outline focus:outline-2 focus:outline-[color:var(--primary)]"
            type="password"
            required
            autocomplete="current-password"
          />
        </div>

        <p v-show="loginErr.length > 0" class="error -my-4 font-medium text-red-500">{{ loginErr }}</p>

        <div class="relative flex w-96 flex-col items-center justify-center gap-1">
          <button class="w-40 items-center rounded-lg bg-green-accent px-16 py-2 hover:brightness-[0.85]" type="submit">
            <span v-if="loading" class="loading du-loading du-loading-sm mt-1"></span>
            <p v-else class="text-lg">Login</p>
          </button>
        </div>
      </form>
    </div>

    <p>Don't have an account?</p>
    <p class="font-medium">Ask your teacher about account creation.</p>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Unregents Prep Login"
});

const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const emailErr = ref("");
const loginErr = ref("");
const loading = ref(false);

watch(email, (value) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (value.length !== 0 && !emailRegex.test(value)) emailErr.value = "Invalid email.";
  else emailErr.value = "";
});

async function loginWithEmail() {
  loginErr.value = "";
  if (emailErr.value || loginErr.value) return;
  loading.value = true;
  const data = await userStore.login(email.value, password.value);
  if (!data) {
    void router.push(`${userStore.userType}/dashboard`);
  } else {
    if ("non_field_errors" in data) loginErr.value = data.non_field_errors.join(" ");
    if ("email" in data) emailErr.value = data.email.join(" ");
  }
  loading.value = false;
}

// for vitest
defineExpose({ email, emailErr, password, loginErr });
</script>

<style scoped>
.error {
  @apply -bottom-7;
}
</style>
