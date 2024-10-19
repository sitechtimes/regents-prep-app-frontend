<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-gray py-12">
    <a href="/"
      ><img
        class="logo h-32 transition duration-500 animate-spin"
        src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88d26018-fa1a-4b92-a8b9-d8ed3f9e178e_3840x2160.png"
        aria-hidden="true"
    /></a>
    <h1 class="text-5xl font-bold mb-8">Welcome{{ loginType == "login" ? " back" : "" }}!</h1>

    <div class="flex items-center justify-center flex-col bg-[color:var(--bg-color)] p-4 rounded-3xl mb-4">
      <h3 class="mb-4" v-show="loginType == `login`">Log in to your not Vent Defeater account</h3>
      <h3 class="mb-4" v-show="loginType == `signUp`">Create a free account</h3>
      <h3 class="mb-4" v-show="loginType == `reset`">Reset your password</h3>

      <form class="login flex items-center justify-center flex-col gap-7 w-full" @submit="loginWithEmail" @submit.prevent>
        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="email">Your email address <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[var(--bg-fadded-color)]"
            id="email"
            type="email"
            required
            v-model="email"
          />
          <p class="absolute error font-medium text-red-500" v-show="emailErr.length > 0">{{ emailErr }}</p>
        </div>

        <div class="relative flex items-start justify-center flex-col gap-1" v-if="loginType == `signUp`">
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
        <!-- 
This will be shown if the page is the login or signUp page.
This will NOT be shown if the page is the login or reset page but ONLY if realEmail is false.        
-->
        <div class="relative flex items-start justify-center flex-col gap-1" v-show="loginType == `login` || loginType == `signUp`">
          <label class="font-medium" for="password">{{ loginType == "login" ? "Your" : "Choose a" }} password <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="password"
            type="password"
            required
            v-model="password"
            :autocomplete="loginType == `login` ? 'current-password' : 'new-password'"
          />
          <p class="absolute error font-medium text-red-500" v-show="passwordErr.length > 0">{{ passwordErr }}</p>
        </div>

        <div class="relative flex items-start justify-center flex-col gap-1" v-if="loginType == `signUp`">
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

        <button class="du-btn du-btn-wide du-btn-md bg-green-accent" type="submit" @click="">
          <p class="" v-if="!showLoginAnimation">
            {{ loginType == "login" ? "Log in" : loginType == "signUp" ? "Sign up" : "Verify email" }}
          </p>
          <p class="flex items-center justify-center gap-2" v-else>Loading...</p>
        </button>
      </form>
    </div>
    <h3 v-show="loginType !== `reset`">Forgot your password?</h3>
    <button class="bg-transparent border-0" @click="loginType !== `reset` ? router.push('?reset=1') : router.push('')">
      <h3 class="m-0 font-medium cursor-pointer transition duration-500 hover:underline">{{ loginType !== `reset` ? "Reset Password" : "Log in" }}</h3>
    </button>
    <h3 v-show="loginType !== `signUp`">New to the Regents Prep App?</h3>
    <h3 v-show="loginType == `signUp`">Already have an account?</h3>
    <button class="bg-transparent border-0" @click="loginType !== `signUp` ? router.push('?signup=1') : router.push('')">
      <h3 class="m-0 font-medium cursor-pointer transition duration-500 hover:underline">{{ loginType !== `signUp` ? "Sign up now" : "Log in" }}</h3>
    </button>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Unregents Prep Login"
});

/*
(Note for work done on Branch)
User: Enters email
Application: Sends request to check if user email is used in the application. If email is used, show reset password fields. Else, return popup to indicate that no such email is associated with an account.

User: Enters new password and a confirmation for a new password.
Application: Password reset. 


*/

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const showLoginAnimation = ref(false);
const loginType = ref<"login" | "reset" | "signUp">("login");

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");

const emailErr = ref("");
const nameErr = ref("");
const passwordErr = ref("");
const confirmPasswordErr = ref("");

const emailExists = ref(false);

watch(
  () => route.query,
  (value) => {
    value.signup ? (loginType.value = "signUp") : value.reset ? (loginType.value = "reset") : (loginType.value = "login");
    console.log(value);
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
  if (route.query.signup) loginType.value = "signUp";
  else if (route.query.reset) loginType.value = "reset";
  else loginType.value = "login";
});

async function loginWithEmail() {
  if (emailErr.value || passwordErr.value || nameErr.value) return;

  if (loginType.value == "signUp") return signupWithEmail();

  try {
    showLoginAnimation.value = true;
    // do login stuff
  } catch (error) {
    if (error instanceof Error) {
      passwordErr.value = error.message;
      if (!error.message) passwordErr.value = "Something went wrong. Please try again.";
    }
    return;
  } finally {
    showLoginAnimation.value = false;
  }

  // teachers be damned (for now)
  if (userStore.isAuth) router.push("/student/dashboard");
  else passwordErr.value = "Something went wrong. Please try again.";
}

async function signupWithEmail() {
  if (password.value != confirmPassword.value) {
    passwordErr.value = "Login passwords do not match.";
    return;
  }

  try {
    showLoginAnimation.value = true;
    // do signup stuff
  } catch (error) {
    if (error instanceof Error) passwordErr.value = error.message;
    return;
  } finally {
    showLoginAnimation.value = false;
  }

  // teachers be damned (for now)
  if (userStore.isAuth) router.push("/student/dashboard");
  else passwordErr.value = "Something went wrong. Please try again.";
}

async function verifyEmail() {
  //(This will be an api request to check whether or not the User's email exists to then redirect them to a "reset password page" where they will input a new password.)
  emailExists.value = true;
}

async function newPassword() {
  //Request to set newPassword to be the user's password.
}

async function loginWithGoogle() {
  console.log("google");
}

async function loginWithMicrosoft() {
  console.log("microsoft");
}

async function loginWithFacebook() {
  console.log("facebook");
}
</script>

<style scoped>
.error {
  bottom: -1.75rem;
}
</style>
