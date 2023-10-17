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

<script>
export default {
  data() {
    return {
      email: ref(""),
      password: ref(""),
    };
  },
  methods: {
    getUser() {
      userInfo.user.loggedIn = true;
      console.log(this.email);
    },
  },
};
</script>

<style lang="css" scoped></style>
