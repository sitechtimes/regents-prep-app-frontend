<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-gray py-12">
    <a href="/"
      ><img
        class="logo h-32 transition duration-500 animate-spin"
        src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88d26018-fa1a-4b92-a8b9-d8ed3f9e178e_3840x2160.png"
        aria-hidden="true"
    /></a>
    <h1 class="text-5xl font-bold mb-8">Welcome{{ showLogin ? " back" : "" }}!</h1>

    <div class="flex items-center justify-center flex-col bg-[color:var(--bg-color)] p-4 rounded-3xl mb-4">
      <h3 class="mb-4" v-show="showLogin">Log in to your not Vent Defeater account</h3>
      <h3 class="mb-4" v-show="!showLogin">Create a free account</h3>

      <form class="login flex items-center justify-center flex-col gap-7 w-full" @submit="loginWithEmail" @submit.prevent>
        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="email">Your email address <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:[color:var(--bg-color)]"
            id="email"
            type="email"
            required
            v-model="email"
          />
          <p class="absolute error font-medium text-red-500" v-show="emailErr.length > 0">{{ emailErr }}</p>
        </div>

        <div class="relative flex items-start justify-center flex-col gap-1" v-if="!showLogin">
          <label class="font-medium" for="name">Your name <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="name"
            type="text"
            required
            v-model="name"
            autocomplete="name"
          />
          <p class="absolute error font-medium text-red-500" v-show="nameErr.length > 0">{{ nameErr }}</p>
        </div>

        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="password">{{ showLogin ? "Your" : "Choose a" }} password <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="password"
            type="password"
            required
            v-model="password"
            :autocomplete="showLogin ? 'current-password' : 'new-password'"
          />
          <p class="absolute error font-medium text-red-500" v-show="passwordErr.length > 0">{{ passwordErr }}</p>
        </div>

        <div class="relative flex items-start justify-center flex-col gap-1" v-if="!showLogin">
          <label class="font-medium" for="password">Confirm password <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="password"
            type="password"
            required
            v-model="confirmPassword"
            autocomplete="new-password"
          />
          <p class="absolute error font-medium text-red-500" v-show="confirmPasswordErr.length > 0">{{ confirmPasswordErr }}</p>
        </div>

        <button class="du-btn du-btn-wide du-btn-md bg-green-accent" type="submit">
          <span v-if="loading" class="loading du-loading du-loading-sm"></span>
          <p v-else>
            {{ showLogin ? "Log in" : "Sign up" }}
          </p>
        </button>
        <NuxtLink to="/reset-password" class="no-underline font-medium transition duration-500 hover:underline" v-if="showLogin"> Forgot password?</NuxtLink>
      </form>
    </div>

    <h3 v-show="showLogin">New to Vent Defeater?</h3>
    <h3 v-show="!showLogin">Already have an account?</h3>
    <button class="bg-transparent border-0" @click="showLogin ? router.push('?signup=1') : router.push('')">
      <h3 class="m-0 font-medium cursor-pointer transition duration-500 hover:underline">{{ showLogin ? "Sign up now" : "Log in" }}</h3>
    </button>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Unregents Prep Login"
});

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const showLogin = ref(true);

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");

const emailErr = ref("");
const nameErr = ref("");
const passwordErr = ref("");
const confirmPasswordErr = ref("");
const loading = ref(false);

watch(
  () => route.query.signup,
  (value) => {
    if (value) showLogin.value = false;
    else showLogin.value = true;
  }
);

watch(email, (value) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (value.length != 0 && !emailRegex.test(value)) emailErr.value = "Invalid email.";
  else emailErr.value = "";
});

watch(password, (value) => {
  if (value != confirmPassword.value) confirmPasswordErr.value = "Passwords do not match.";

  if (value.length < 8) passwordErr.value = "Password must be at least 8 characters.";
  else if (value.length > 50) passwordErr.value = "Password must be less than 50 characters.";
  else passwordErr.value = "";
});

watch(name, (value) => {
  if (value.length < 2) nameErr.value = "Name must be at least 2 characters.";
  else if (value.length > 40) nameErr.value = "name must be less than 40 characters.";
  else nameErr.value = "";
});

watch(confirmPassword, (value) => {
  if (value != password.value) confirmPasswordErr.value = "Passwords do not match.";
  else confirmPasswordErr.value = "";
});

onMounted(() => {
  if (route.query.signup) showLogin.value = false;
  else showLogin.value = true;
});

async function loginWithEmail() {
  userStore.isAuth = true;
  router.push("/student/dashboard");
  return;
/*   if (emailErr.value || passwordErr.value || nameErr.value) return;
  loading.value = true;
  if (showLogin.value) {
    const data = await userStore.login(email.value, password.value);
    if (!data) {
      router.push(`${userStore.userType}/dashboard/`);
    } else {
      if ("non_field_errors" in data) emailErr.value = data.non_field_errors.join(" ");
      if ("password" in data) passwordErr.value = data.password.join(" ");
      if ("email" in data) emailErr.value = data.email.join(" ");
    }
  } */ // Sign up logic
  // else if (confirmPasswordErr.value) {
  // } else {
  //   let data = await userStore.signUp(email.value, password.value, name.value);
  //   if (data == "Success") {
  //   } else {
  //     if ("password" in data) passwordErr.value = data.password.join(" ");
  //     if ("email" in data) emailErr.value = data.email.join(" ");
  //     if ("name" in data) nameErr.value = data.name.join(" ");
  //   }
  // }
  loading.value = false;
}
</script>

<style scoped>
.error {
  bottom: -1.75rem;
}
</style>
