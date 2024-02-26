<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();
const router = useRouter();
const config = useRuntimeConfig();

onMounted(() => {
  console.log(userStore.email);
});

//this function pushes user back to the teacher dashboard
async function pushUserBack() {
  const userStore = userState();
  router.push({ path: `/user-${userStore.username}/teacherdashboard` });
};

async function logOut(){
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    // send a request to logout endpoint!
    const response = await fetch(`${config.public.API_URL}/api/token/logout/`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (response.ok) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      router.push({ path: '/login' });
    } else {
      throw new Error('Failed to log out');
    }
  } catch (error) {
    console.error('Failed to log out:', error);
  }
}
</script>

<template>
  <div>
    <nav class="h-[109px] 2w-screen bg-[#EAE9CA] shadow">
      <div class="flex flex-row">
        <div id="teacherName" class="w-[500px] h-[70px] mt-[12px] pl-[1%]">
          <div
            class="w-[390px] h-[83px] bg-[#F2F0CC] rounded-[16px] shadow-black shadow-innertop drop-shadow-md"
          >
            <h2
              class="w-[390px] h-[70px] text-center justify-center text-[#4E684A] text-[55px] font-semibold font-['Outfit']"
              v-if="(userStore.fullname = '')"
            >
              {{ userStore.fullname }}
            </h2>
            <h2
              class="w-[390px] h-[70px] text-center justify-center text-[#4E684A] text-[55px] font-semibold font-['Outfit']"
              v-else
            >
              Logged in
            </h2>
          </div>
        </div>
        <div class="m-auto">
          <div id="dashboard" class="w-[350px] h-[73px] mt-[17px] mr-[190px]">
            <div
              class="w-[350px] h-[73px] bg-[#426B1F] rounded-[20px] drop-shadow-lg"
            >
              <h1
                class="w-[350px] h-[73px] text-center text-white text-[50px] font-medium absolute bottom-[2px]"
              >
                Default
              </h1>
            </div>
          </div>
        </div>
        <button
          @click="pushUserBack"
          id="dashboard-btn"
          class="w-[74px] h-[74px] flex items-center justify-center mt-[17px] hover:scale-105 hover:drop-shadow-xl duration-300"
        >
          <div
            class="w-[74px] h-[74px] bg-[#426B1F] rounded-2xl shadow-inner items-center justify-center"
          >
            <div
              class="w-[20px] h-[20px] bg-white rounded-[4px] ml-[15.73px] mt-[15.73px]"
            ></div>
            <div
              class="w-[20px] h-[20px] bg-white rounded-[4px] ml-[38.85px] mt-[-19.83px]"
            ></div>
            <div
              class="w-[20px] h-[20px] bg-white rounded-[4px] ml-[15.73px] mt-[4px]"
            ></div>
            <div
              class="w-[20px] h-[20px] bg-white rounded-[4px] ml-[38.85px] mt-[-19.83px]"
            ></div>
          </div>
        </button>
        <div id="logout-btn" class="w-[168] h-[69px] mt-[20px] pr-[1%] pl-[2%]">
          <button
            @click="logOut"
            class="w-[168px] h-[68px] bg-[#426B1F] rounded-[20px] place-items-center hover:scale-105 shadow-black shadow-innertop hover:drop-shadow-xl duration-300"
          >
            <h2
              class="w-[168px] h-[68px] text-center self-center text-white text-[45px] font-medium"
            >
              Logout
            </h2>
          </button>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
