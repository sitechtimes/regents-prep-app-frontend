<script setup>
import { userState } from "~/stores/users";

const email = ref("");
const password = ref("");

async function getUser() {
  const userInfo = userState();
  console.log(email.value);
  console.log(userInfo.user.loggedIn);
  if (email.value == "student") {
    const userInfo = userState();
    userInfo.user.name == "student-placeholder";
    userInfo.user.student = true;
    location.replace(`/user-${userInfo.user.name}/studentdashboard`);
  } else if (email.value == "teacher") {
    const userInfo = userState();
    userInfo.user.name == "teacher-placeholder";
    userInfo.user.student = false;
    location.replace(`/user-${userInfo.user.name}/teacherdashboard`);
  }
}
</script>

<template>
  <div>
    <div></div>
    <h1>Login</h1>
    <h2>Email</h2>
    <input
      type="text"
      name="email"
      id="emailInput"
      class="relative mt-2 rounded-md shadow-sm border-opacity-4"
      v-model="email"
    />
    <!-- Note that the tailwind for both inputs is a placeholder just to see the input boxes. Please feel free to change them if needed. -->
    <h2>Password</h2>
    <input
      type="input"
      name="password"
      id="passwordInput"
      class="relative mt-2 rounded-md shadow-sm border-opacity-4"
    />
    <h3>Forgot Password?</h3>
    <button @click.prevent="getUser">
      <!--  <NuxtLink to="/teacher/teacherdashboard" class="loginLink"
        > -->Login<!-- </NuxtLink
      > -->
    </button>
  </div>
</template>

<style lang="css" scoped></style>
