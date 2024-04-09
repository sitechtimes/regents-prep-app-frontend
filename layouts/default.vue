<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();
const router = useRouter();

onMounted(() => {
  //console.log(userStore.email);
});

//this function pushes user back to the teacher dashboard
async function pushUserBack() {
  const userStore = userState();
  if (userStore.username == "teacher") {
    router.push({ path: `/user-${userStore.username}/teacherdashboard` });
  } else if (userStore.username == "student") {
    router.push({path: `/user-${userStore.username}/studentdashboard`})
  };
}
</script>

<template>
  <div>
    <nav class="h-[109px] w-screen bg-bg-navbar shadow relative">
      <div class="absolute w-screen left-[41%]">
          <div id="dashboard" class="w-[350px] h-[73px] mt-[17px]">
            <div
              class="w-[350px] h-[73px] bg-secondary rounded-[24px] drop-shadow-lg"
            >
              <h1
                class="w-[350px] h-[73px] text-center text-white text-[50px] font-medium absolute bottom-[2px]"
              >
                Default
              </h1>
            </div>
          </div>
        </div>
      <div class="flex flex-row">
        <div id="teacherName" class="w-fit h-[70px] mt-[12px] pl-[1%]">
          <div
            class="w-fit h-[83px] bg-bg-dark rounded-[24px] shadow-black shadow-innertop"
          >
            <h2
              class="w-fit h-[83px] pl-[40px] pr-[40px] text-center justify-center place-content-center text-tertiary text-[45px] font-semibold"
              v-if="(userStore.fullname === '')"
            >
               Placeholder Name
            </h2>
            <h2
              class="w-fit h-[83px] pl-[40px] pr-[40px] text-center justify-center place-content-center text-tertiary text-[45px] font-semibold"
              v-else
            >
               {{ userStore.fullname }}  
            </h2>
          </div>
        </div>
        <div class="m-auto"></div>
        <button
          @click="pushUserBack"
          id="dashboard-btn"
          class="w-[74px] h-[74px] flex items-center justify-center mt-[17px] hover:scale-105 hover:drop-shadow-xl duration-300"
        >
          <div
            class="w-[74px] h-[74px] bg-secondary rounded-[14px] shadow-inner items-center justify-center"
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
            @click="userStore.$logout()"
            class="w-[168px] h-[68px] bg-secondary rounded-[24px] shadow-black shadow-innertop relative hover:scale-105 hover:drop-shadow-xl duration-300 hover:shadow-transparent"
          >
            <h2
              class="w-[168px] h-[68px] text-center text-white text-[45px] font-medium absolute bottom-[2px]"
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

<!-- v-if="(userStore.fullname = '')" -->