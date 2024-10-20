<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-gray py-12">
    <h1 class="text-5xl font-bold mb-8">Reset your password</h1>
    <div class="flex items-center justify-center flex-col bg-[color:var(--bg-color)] p-4 rounded-3xl mb-4">
      <form class="login flex items-center justify-center flex-col gap-7 w-full" @submit="newPassword()" @submit.prevent>
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
        <div class="relative flex items-start justify-center flex-col gap-1" v-show="emailExists == true">
          <label class="font-medium" for="password">Choose a password <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-gray-300 px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="password"
            type="password"
            required
            v-model="password"
            :autocomplete="'new-password'"
          />
          <p class="absolute error font-medium text-red-500" v-show="passwordErr.length > 0">{{ passwordErr }}</p>
        </div>
        <div class="relative flex items-start justify-center flex-col gap-1" v-show="emailExists == true">
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
        <button class="du-btn du-btn-wide du-btn-md bg-green-accent" type="submit" @click="newPassword()">
          <p class="" v-if="!showLoginAnimation">{{ emailExists ? "Reset your Password" : "Verify your email" }}</p>
          <p class="flex items-center justify-center gap-2" v-else>Loading...</p>
        </button>
      </form>
    </div>
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
const password = ref("");
const confirmPassword = ref("");

const emailErr = ref("");
const nameErr = ref("");
const passwordErr = ref("");
const confirmPasswordErr = ref("");

const emailExists = ref(false);

watch(password, (value) => {
  if (value != confirmPassword.value) confirmPasswordErr.value = "Passwords do not match.";

  if (value.length < 8) passwordErr.value = "Password must be at least 8 characters.";
  else if (value.length > 50) passwordErr.value = "Password must be less than 50 characters.";
  else passwordErr.value = "";
});

watch(confirmPassword, (value) => {
  if (value != password.value) confirmPasswordErr.value = "Passwords do not match.";
  else confirmPasswordErr.value = "";
});

async function verifyEmail() {
  //(This will be an api request to check whether or not the User's email exists to then redirect them to a "reset password page" where they will input a new password.) There will also be an alert() here to notify the user if the email they entered does not exist.
  emailExists.value = true;
}

async function newPassword() {
  //Request to set newPassword to be the user's password.

  if (emailExists.value == false) return verifyEmail();
  else router.push("/login");
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  emailExists.value = false;
}

const showLoginAnimation = ref(false);
</script>
