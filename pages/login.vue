<script setup>
import { storeToRefs } from "pinia";
import { userState } from "~/stores/users";

const username = ref("");
const password = ref("");

const userStore = userState();
const router = useRouter();

const config = useRuntimeConfig();

async function getUser() {
  /*
  try {
    const response = await fetch(`${config.public.API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    const data = await response.json();
    console.log(data);

    userStore.user = data.user;
    userStore.loggedIn = true;

    router.push("home");
  } catch (error) {
    console.log(error);
  }*/

  const userStore = userState();
  userStore.loggedIn = true;
  if (username.value == "student") {
    const userStore = userState();
    userStore.user.name = "student-placeholder";
    userStore.user.student = true;
    router.push({ path: `/user-${userStore.user.name}/studentdashboard` });
  } else if (username.value == "teacher") {
    const userStore = userState();
    userStore.user.name = "teacher-placeholder";
    userStore.user.student = false;
    router.push({ path: `/user-${userStore.user.name}/teacherdashboard` });
  }
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div
      class="w-[779px] h-[690px] flex flex-col items-center justify-center bg-lime-800 rounded-[40px] border-2 border-black m-auto"
    >
      <h1
        class="w-[293px] h-[90px] text-center text-[#FDFDF0] text-[90px] font-medium"
      >
        Login
      </h1>
      <h2
        class="w-[222px] h-[151px] text-[#F2F0CC] text-[50px] font-semibold pt-[50px] drop-shadow-md pr-[700px]"
      >
        Email:
      </h2>
      <input
        type="text"
        name="email"
        id="emailInput"
        class="relative shadow-sm border-opacity-4 w-[703px] h-[65px] bg-[#FAF9E5] border-[#797979] text-3xl px-2"
        v-model="email"
      />
      <!-- Note that the tailwind for both inputs is a placeholder just to see the input boxes. Please feel free to change them if needed. -->
      <h2
        class="w-[222px] h-[151px] text-[#F2F0CC] text-[50px] font-semibold pt-[60px] pr-[700px] drop-shadow-md"
      >
        Password:
      </h2>
      <input
        type="input"
        name="password"
        id="passwordInput"
        class="relative mt-2 shadow-sm border-opacity-4 w-[703px] h-[65px] bg-[#FAF9E5] border-[#797979] text-3xl px-2"
      />
      <NuxtLink
        to="/teacher/teacherdashboard"
        class="loginLink text-[40px] font-medium text-[#F8F8F8] pb-[5px] mt-[27px]"
        ><button
          id="loginRedirect"
          class="button bg-[#AAB840] w-[202px] h-[81px] rounded-[20px] shadow-inner items-center justify-center inline-flex hover:scale-105 hover:drop-shadow-2xl duration-300"
        >
          Login
        </button></NuxtLink
      >
<!--       <NuxtLink
        to="/teacher/teacherdashboard"
        class="loginLink text-[40px] font-medium text-[#F8F8F8] pb-[5px]"
        ><button
          @click.prevent="getUser"
          class="bg-[#AAB840] w-[202px] h-[81px] rounded-[20px] shadow-inner items-center justify-center inline-flex mt-[27px] hover:scale-105 hover:drop-shadow-2xl duration-300"
        >
          Login
        </button>
      </NuxtLink> -->
    </div>
  </div>
</template>

<style lang="css" scoped>
h2 {
  -webkit-text-stroke: 2px black;
}
h3 {
  -webkit-text-stroke: 1.5px black;
}
</style>
