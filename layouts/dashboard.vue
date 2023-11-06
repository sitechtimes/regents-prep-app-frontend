<template>
  <div>
    <nav class="h-[109px] 2w-screen bg-[#EAE9CA] shadow">
      <div class="flex flex-row">
        <div id="teacherName" class="w-[355px] h-[70px] mt-[12px] pl-[1%]">
          <div
            class="w-[390px] h-[83px] bg-[#F2F0CC] rounded-2xl shadow-[inset_0_4px_7px_rgba(0,0,0,0.3)] drop-shadow-md"
          >
            <h2
              class="w-[390px] h-[70px] text-center justify-center text-[#4E684A] text-[55px] font-semibold font-['Outfit']"
            >
              User's Name
            </h2>
          </div>
        </div>
        <div class="m-auto">
          <div id="dashboard" class="w-[277px] h-[73px] mt-[17px]">
            <div
              class="w-[277px] h-[73px] bg-[#426B1F] rounded-[20px] shadow shadow-inner shadow-[inset_0_5px_7px_rgba(0,0,0,0.3)] drop-shadow-lg"
            >
              <h1
                class="w-[277px] h-[73px] text-center text-white text-[50px] font-medium font-['Outfit']"
              >
                Dashboard
              </h1>
            </div>
          </div>
        </div>
        <div
          id="create-btn"
          class="w-[73px] h-[73px] bg-[#426B1F] rounded-full shadow-inner items-center justify-center"
        >
          <div class="w-[12px] h-[50px] bg-white rounded-[30px] m-auto"></div>
          <div class="w-[50px] h-[12px] bg-white rounded-[30px]"></div>
        </div>
        <div
          id="dashboard-btn"
          class="w-[74px] h-[74px] flex items-center justify-center mt-[17px]"
        >
          <div
            class="w-[74px] h-[74px] bg-[#426B1F] rounded-[14px] shadow-inner items-center justify-center"
          >
            <div
              class="w-[42px] h-[42px] bg-white rounded-[5px] m-auto mt-[16px]"
            ></div>
          </div>
        </div>
        <div id="logout-btn" class="w-[355] h-[69px] mt-[20px] pr-[1%] pl-[2%]">
          <button
            class="w-[168px] h-[68px] bg-[#426B1F] rounded-[20px] shadow-inner shadow-[inset_0_5px_7px_rgba(0,0,0,0.3)] hover:scale-105 hover:drop-shadow-xl duration-300"
          >
            <h2
              class="w-[168px] h-[68px] text-center text-white text-[45px] font-medium font-['Outfit']"
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
