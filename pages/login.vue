<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-gray py-12">
    <h1 class="text-5xl font-bold mb-6">Welcome back!</h1>
    <div class="flex items-center justify-center flex-col bg-[color:var(--bg-color)] p-4 rounded-3xl mb-4">
      <h3 class="mb-4">Log in to your Regents Prep App account</h3>

      <form class="login flex items-center justify-center flex-col gap-7 w-full" @submit="loginWithEmail" @submit.prevent>
        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="email">Email Address <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-300 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="email"
            type="email"
            required
            v-model="email"
            autocomplete="email"
          />
          <p class="absolute error font-medium text-red-500" v-show="emailErr.length > 0">{{ emailErr }}</p>
        </div>

        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="password">Password <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-300 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="password"
            type="password"
            required
            v-model="password"
            autocomplete="current-password"
          />
          <p class="absolute error font-medium text-red-500" v-show="passwordErr.length > 0">{{ passwordErr }}</p>
        </div>

        <button class="du-btn du-btn-wide du-btn-md bg-green-accent" type="submit">
          <span v-if="loading" class="loading du-loading du-loading-sm"></span>
          <p v-else>Log in</p>
        </button>
      </form>
    </div>

    <h3>Don't have an account?</h3>
    <h3 class="m-0 font-medium">Ask your teacher about account creation.</h3>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Unregents Prep Login"
});

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const email = ref("");
const name = ref("");
const password = ref("");

const emailErr = ref("");
const nameErr = ref("");
const passwordErr = ref("");
const loading = ref(false);

watch(email, (value) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (value.length != 0 && !emailRegex.test(value)) emailErr.value = "Invalid email.";
  else emailErr.value = "";
});

watch(password, (value) => {
  if (value.length < 8) passwordErr.value = "Password must be at least 8 characters.";
  else if (value.length > 50) passwordErr.value = "Password must be less than 50 characters.";
  else passwordErr.value = "";
});

watch(name, (value) => {
  if (value.length < 2) nameErr.value = "Name must be at least 2 characters.";
  else if (value.length > 40) nameErr.value = "name must be less than 40 characters.";
  else nameErr.value = "";
});

async function loginWithEmail() {
  if (emailErr.value || passwordErr.value || nameErr.value) return;
  loading.value = true;
  const data = await userStore.login(email.value, password.value);
  if (!data) {
    router.push(`${userStore.userType}/dashboard`);
  } else {
    if ("non_field_errors" in data) emailErr.value = data.non_field_errors.join(" ");
    if ("password" in data) passwordErr.value = data.password.join(" ");
    if ("email" in data) emailErr.value = data.email.join(" ");
  }
  loading.value = false;
}

// for vitest
defineExpose({ email, emailErr, password, passwordErr });
</script>

<style scoped>
.error {
  @apply -bottom-7;
}
</style>
