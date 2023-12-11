<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();
const router = useRouter();

onMounted(() => {
  console.log(userStore.user.email);
});

async function pushUser() {
  if (userStore.user.username == "teacher") {
    const userStore = userState();
    console.log("hey im a teacher");
    userStore.$patch((state) => {
      router.push({ path: `/user-${state.user.username}/createclass` });
      console.log("hey");
    });
  } else if (userStore.user.username == "student") {
    console.log("hi");
  }
}
</script>

<template>
  <div>
    <nav class="h-[109px] bg-[#EAE9CA] shadow">
      <div class="flex flex-row">
        <div id="username" class="w-[500px] h-[70px] mt-[12px] pl-[1%]">
          <div
            class="w-[500px] h-[83px] bg-[#F2F0CC] rounded-2xl shadow-[inset_0_4px_7px_rgba(0,0,0,0.3)] drop-shadow-md"
          >
            <h2
              class="w-[500px] h-[70px] text-center justify-center text-[#4E684A] text-[55px] font-semibold font-['Outfit']"
            >
              {{ userStore.user.fullname }}
            </h2>
          </div>
        </div>
        <div class="m-auto">
          <div id="dashboard" class="w-[277px] h-[73px] mt-[17px]">
            <div
              class="w-[300px] h-[73px] bg-[#426B1F] rounded-[20px] shadow shadow-inner shadow-[inset_0_5px_7px_rgba(0,0,0,0.3)] relative drop-shadow-lg"
            >
              <h1
                class="w-[300px] h-[73px] text-center text-white text-[50px] font-medium absolute bottom-[2px]"
              >
                Create Class
              </h1>
            </div>
          </div>
        </div>
        <div class="w-[168] pr-[2%] flex items-center justify-center">
          <div
            id="create-btn"
            class="w-[73px] h-[73px] bg-[#426B1F] rounded-full shadow-inner items-center justify-center mt-[17px]"
          >
            <div
              class="w-[41px] h-[41px] bg-white rounded-full shadow-inner items-center justify-center m-auto mt-[16px]"
            ></div>
          </div>
        </div>
        <div
          id="dashboard-btn"
          class="w-[74px] h-[74px] flex items-center justify-center mt-[17px]"
        >
          <div
            class="w-[74px] h-[74px] bg-[#426B1F] rounded-[14px] shadow-inner items-center justify-center"
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
        </div>
        <div id="logout-btn" class="w-[168] h-[69px] mt-[20px] pr-[1%] pl-[2%]">
          <button
            class="w-[168px] h-[68px] bg-[#426B1F] rounded-[20px] shadow-inner shadow-[inset_0_5px_7px_rgba(0,0,0,0.3)] relative hover:scale-105 hover:drop-shadow-xl duration-300"
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
