<script setup lang="ts">
import { ref } from "vue";
import { userState } from "~/stores/users";

const email = ref("");
const password = ref("");

const userStore = userState();
const router = useRouter();

const config = useRuntimeConfig();

const getUser = async () => {
  await userStore.$userLogin(email.value, password.value);
  await userStore.$getUserCredentials();
  userStore.$savePersistentSession();

  if (userStore.user_type == "Student") {
    // If the user is a student, they are redirected to the studentdashboard.
    await userStore.$getStudentCourses();
    router.push({
      path: `/user-${userStore.username}/studentdashboard`,
    });
    userStore.loggedIn = true;
    //The 'student' and 'loggedIn' attributes of the state are set to true, and the user is redirected to the studentdashboard.
    // router.push({ path: `/user-${userStore.username}/studentdashboard` });
  } else if (userStore.user_type == "Teacher") {
    //If the user is a teacher
    await userStore.$getTeacherCourses();
    router.push({ 
      path: `/user-${userStore.username}/teacherdashboard`,
    });
    userStore.loggedIn = true;
    //The 'student' attribute of the state is set to false, the 'loggedIn' attribute of the state is set to true, and the user is redirected to the teacher dashboard.
  }
  console.log(userStore.loggedIn)
};

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  const response = await fetch(`${config.public.API_URL}/api/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }
  const data = await response.json();
  localStorage.setItem("access_token", data.access);
  return data.access;
}

/* userStore.loggedIn = true;
    userStore.email = email.value; // This code is only for if the user's email will be used for accessing data from the api- otherwise, only the username is used for now. */

definePageMeta({
  layout: false,
});
</script>

<template>
  <form @submit.prevent="getUser">
    <div class="h-screen flex items-center justify-center">
      <div
        class="login w-[779px] h-[690px] flex flex-col items-center justify-center bg-secondary rounded-[24px] border-2 border-black m-auto"
      >
        <h1
          class="w-[293px] h-[90px] text-center text-white text-[90px] font-medium"
        >
          Login
        </h1>
        <label
          for="usernameInput"
          class="email w-[222px] h-[151px] text-white text-[50px] font-semibold pt-[50px] drop-shadow-md pr-[700px]"
        >
          Email:
        </label>
        <input
          type="text"
          name="username"
          id="usernameInput"
          class="relative shadow-sm border-opacity-4 w-[703px] h-[65px] bg-white text-3xl px-2"
          v-model="email"
        />
        <label
          for="password"
          class="password w-[222px] h-[151px] text-white text-[50px] font-semibold pt-[60px] pr-[700px] drop-shadow-md"
        >
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="passwordInput"
          v-model="password"
          class="relative mt-2 shadow-sm border-opacity-4 w-[703px] h-[65px] bg-white text-3xl px-2"
        />
        <label
          class="loginLink text-[40px] font-medium text-[#F8F8F8] pb-[5px] mt-[27px]"
          ><button
            id="loginRedirect"
            class="button bg-primary w-[202px] h-[81px] rounded-[24px] shadow-innertop shadow-black items-center justify-center inline-flex hover:scale-105 hover:drop-shadow-2xl duration-300 hover:shadow-transparent"
          >
            Login
          </button></label
        >
      </div>
    </div>
  </form>
</template>

<style lang="css" scoped>
.email,
.password {
  -webkit-text-stroke: 2px black;
}
h3 {
  -webkit-text-stroke: 1.5px black;
}
@media all and (max-width: 100rem) {
  .login {
    width: 650px;
    height: 550px;
  }
  h1 {
    font-size: 75px;
  }
  label {
    font-size: 45px;
    padding-right: 600px;
  }
  input {
    width: 600px;
    font-size: 30px;
  }
  button {
    width: 170px;
    height: 70px;
    font-size: 40px;
    align-items: center;
    justify-content: center;
    margin-left: 600px;
    margin-bottom: 20px;
  }
}
</style>
