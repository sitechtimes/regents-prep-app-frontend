<script setup>
import { userState } from "~/stores/users";

const username = ref("");
const password = ref("");

const userStore = userState();
const router = useRouter()

const config = useRuntimeConfig();

async function getUser() {
    try {
        const response = await fetch(`${config.public.API_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            })
        }
        );
        const data = await response.json();
        console.log(data);

        userStore.user = data.user;
        userStore.loggedIn = true;

        router.push('home')
    }
    catch (error) {
        console.log(error);
    }



    // console.log(email.value);
    // console.log(userInfo.user.loggedIn);
    // if (email.value == "student") {
    //     const userInfo = userState();
    //     userInfo.user.name == "student-placeholder";
    //     userInfo.user.student = true;
    //     location.replace(`/user-${userInfo.user.name}/studentdashboard`);
    // } else if (email.value == "teacher") {
    //     const userInfo = userState();
    //     userInfo.user.name == "teacher-placeholder";
    //     userInfo.user.student = false;
    //     location.replace(`/user-${userInfo.user.name}/teacherdashboard`);
    // }
}
</script>

<template>
    <div>
        <div></div>
        <h1>Login</h1>
        <form @submit.prevent="getUser" class="flex flex-col gap-2">
            <label for="emailInput">Username</label>
            <input type="text" 
                name="username" 
                id="emailInput" 
                class="relative mt-2 rounded-md shadow-sm border-opacity-4 w-[10%]"
                v-model="username" />
            <!-- Note that the tailwind for both inputs is a placeholder just to see the input boxes. Please feel free to change them if needed. -->
            <label for="password">Password</label>
            <input type="password" 
                name="password" 
                id="password"
                class="relative mt-2 rounded-md shadow-sm border-opacity-4 w-[10%]" 
                v-model="password"/>
            <!-- <h3>Forgot Password?</h3> -->
            <button class="button bg-[#426B1F] w-[10%] text-white rounded-[20px] shadow-inner flex-col items-center gap-[447.72px] inline-flex">Login</button>
        </form>
    </div>
</template>

<style lang="css" scoped></style>
