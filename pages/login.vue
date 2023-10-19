<template>
  <div
    class="w-[779px] h-[690px] flex flex-col items-center justify-center bg-lime-800 rounded-[40px] border-2 border-black"
  >
    <h1 class="w-[293px] h-[90px] text-center text-[#FDFDF0] text-[90px] font-medium">Login</h1>
    <h2 class="w-[222px] h-[151px] text-[#F2F0CC] text-[50px] font-normal">Email:</h2>
    <input 
      type="text"
      name="email"
      id="emailInput"
      class="relative mt-2 shadow-sm border-opacity-4 w-[703px] h-[65px] bg-[#FAF9E5] border-[#797979]"
      v-model="email"
    />
    <!-- Note that the tailwind for both inputs is a placeholder just to see the input boxes. Please feel free to change them if needed. -->
    <h2 class="w-[222px] h-[151px] text-[#F2F0CC] text-[50px] font-normal">Password:</h2>
    <input
      type="input"
      name="password"
      id="passwordInput"
      class="relative mt-2 shadow-sm border-opacity-4 w-[703px] h-[65px] bg-[#FAF9E5] border-[#797979]"
    />
    <h3 class="w-[251px] h-[47px] text-[#F2F0CC] text-3xl font-medium">Forgot Password?</h3>
    <button @click.prevent="getUser" class="bg-[#AAB840] w-[202px] h-[81px] pt-[19.72px] rounded-[20px] shadow-inner flex-col items-center inline-flex">
      <!--  <NuxtLink to="/teacher/teacherdashboard" class="loginLink"
        > -->Login<!-- </NuxtLink
      > -->
    </button>
  </div>
</template>

<script>
import { userState } from "~/stores/users";

export default {
  name: "Login",
  data() {
    return {
      email: ref(""),
      password: ref(""),
    };
  },
  methods: {
    async getUser() {
      const userInfo = userState(); // With Nuxt, userInfo has to be declared through the userState() every time it is used in a function.
      console.log(userInfo.user.loggedIn);
      console.log(this.email);
      this.email = "";
    },
  },
};
</script>

<style lang="css" scoped></style>
