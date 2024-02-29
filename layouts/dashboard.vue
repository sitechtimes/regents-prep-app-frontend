<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();
const router = useRouter();

onMounted(() => {
  console.log(userStore.email);
});

//this function pushes user to create class page if they are a teacher and if they are a student, then they get a pop-up
async function pushUser() {
  if (userStore.username == "teacher") {
    const userStore = userState();
    router.push({ path: `/user-${userStore.username}/createclass` });
  } else if (userStore.username == "student") {
    console.log("hi");
  }
}
</script>

<template>
  <div>
    <nav class="h-[109px] bg-bg-navbar shadow">
      <div class="flex flex-row">
        <div id="username" class="w-[500px] h-[70px] mt-[12px] pl-[1%]">
          <div
            class="w-[500px] h-[83px] bg-bg-dark rounded-[24px] shadow-black shadow-innertop"
          >
            <h2
              class="w-[390px] h-[70px] text-center justify-center text-tertiary text-[55px] font-semibold font-['Outfit']"
              v-if="(userStore.fullname = '')"
            >
              {{ userStore.fullname }}
            </h2>
            <h2
              class="w-[390px] h-[70px] text-center justify-center text-tertiary text-[55px] font-semibold font-['Outfit']"
              v-else
            >
              {{ userStore.username }}
            </h2>
          </div>
        </div>
        <div class="m-auto">
          <div id="dashboard" class="w-[277px] h-[73px] mt-[17px] mr-[80px]">
            <div
              class="w-[300px] h-[73px] bg-secondary rounded-[24px] relative"
            >
              <h1
                class="w-[300px] h-[73px] text-center text-white text-[50px] font-medium absolute bottom-[2px]"
              >
                Dashboard
              </h1>
            </div>
          </div>
        </div>
        <button
          id=""
          class="w-[168] pr-[2%] flex items-center justify-center hover:scale-105 hover:drop-shadow-xl duration-300 hover:shadow-transparent"
        >
          <div
            @click.prevent="pushUser"
            id="create-btn"
            class="w-[73px] h-[73px] bg-secondary rounded-full shadow-inner items-center justify-center mt-[17px]"
          >
            <div
              class="w-[10px] h-[50px] bg-white rounded-[30px] m-auto mt-[11.5px]"
            ></div>
            <div
              class="w-[50px] h-[10px] bg-white rounded-[30px] m-auto mt-[-30.5px]"
            ></div>
          </div>
        </button>
        <div
          id="dashboard-btn"
          class="w-[74px] h-[74px] flex items-center justify-center mt-[17px]"
        >
          <div
            class="w-[74px] h-[74px] bg-secondary rounded-[14px] shadow-inner items-center justify-center"
          >
            <div
              class="w-[42px] h-[42px] bg-white rounded-[5px] m-auto mt-[16px]"
            ></div>
          </div>
        </div>
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
