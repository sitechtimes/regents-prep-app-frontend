<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();
const router = useRouter();

onMounted(() => {
  console.log(userStore.user.email);
});

//this function pushes user back to the teacher dashboard
async function pushUserBack() {
  const userStore = userState();
  userStore.$patch((state) => {
    router.push({ path: `/user-${state.user.username}/teacherdashboard` });
  });
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
              class="w-[500px] h-[70px] text-center justify-center text-[#4E684A] text-[55px] font-semibold font-['Outfit']"
            >
              
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
