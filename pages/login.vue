<script setup lang="ts">
import { userState } from "~/stores/users";

const email = ref("");
const password = ref("");

const userStore = userState();
const router = useRouter();

const config = useRuntimeConfig();

async function getUser() {
  /*  try {
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

    //Note: the 'home' page is a placeholder.

  } catch (error) {
    console.log(error);
  } */
  //refresh token
  //username and password, refetch the information.

  function seperateName() {
    //function to extract the 'username' from a given email.
    const userStore = userState();
    const fullUser = Array.from(`${email.value}`); //  The email input by the user is turned into an array
    if (fullUser.includes("@")) {
      // The email is checked for whether or not the user put in an '@' symbol, similar to the NYC DOE login permitting users to log without the part of the email proceeding the '@' symbol
      userStore.email = email.value;
      userStore.username = fullUser
        .slice(0, fullUser.indexOf("@"))
        .join(""); //The new array is sliced to only include every letter of the email before the '@' symbol, and then joined together as a string. This 'username' is then set as the username within the Pinia state.
      console.log(userStore.username);
    } else {
      userStore.username = email.value; //If the email has no '@' symbol, then it is simply registered as the username.
      console.log(userStore.username);
    }
  }

  seperateName();

  const userStore = userState(); //Pinia State is declared

  /*
    userStore.loggedIn = true;
    userStore.email = email.value; // This code is only for if the user's email will be used for accessing data from the api- otherwise, only the username is used for now.
 */
  if (userStore.username == "student") {
    // If the user is a student, they are redirected to the studentdashboard.
    userStore.student = true;
    router.push({
      path: `/user-${userStore.username}/studentdashboard`,
    });
    userStore.loggedIn = true;
    //The 'student' and 'loggedIn' attributes of the state are set to true, and the user is redirected to the studentdashboard.
    // router.push({ path: `/user-${userStore.username}/studentdashboard` });
  } else if (userStore.username == "teacher") {
    //If the user is a teacher
    userStore.student = false;
    router.push({
      path: `/user-${userStore.username}/teacherdashboard`,
    });
    //The 'student' attribute of the state is set to false, the 'loggedIn' attribute of the state is set to true, and the user is redirected to the teacher dashboard.
  }
}
definePageMeta({
  layout: false,
});
</script>

<template>
  <form @submit.prevent="getUser">
    <div class="h-screen flex items-center justify-center">
      <div
        class="login w-[779px] h-[690px] flex flex-col items-center justify-center bg-lime-800 rounded-[40px] border-2 border-black m-auto"
      >
        <h1
          class="w-[293px] h-[90px] text-center text-[#FDFDF0] text-[90px] font-medium"
        >
          Login
        </h1>
        <label
          for="usernameInput"
          class="email w-[222px] h-[151px] text-[#F2F0CC] text-[50px] font-semibold pt-[50px] drop-shadow-md pr-[700px]"
        >
          Email:
        </label>
        <input
          type="text"
          name="username"
          id="usernameInput"
          class="relative shadow-sm border-opacity-4 w-[703px] h-[65px] bg-[#FAF9E5] border-[#797979] text-3xl px-2"
          v-model="email"
        />
        <label
          for="password"
          class="password w-[222px] h-[151px] text-[#F2F0CC] text-[50px] font-semibold pt-[60px] pr-[700px] drop-shadow-md"
        >
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="passwordInput"
          v-model="password"
          class="relative mt-2 shadow-sm border-opacity-4 w-[703px] h-[65px] bg-[#FAF9E5] border-[#797979] text-3xl px-2"
        />
        <label
          class="loginLink text-[40px] font-medium text-[#F8F8F8] pb-[5px] mt-[27px]"
          ><button
            id="loginRedirect"
            class="button bg-[#AAB840] w-[202px] h-[81px] rounded-[20px] shadow-innertop shadow-black items-center justify-center inline-flex hover:scale-105 hover:drop-shadow-2xl duration-300 hover:shadow-transparent"
          >
            Login
          </button></label
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
