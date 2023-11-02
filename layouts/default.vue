<template>
  <div>
    <nav class="h-[109px] bg-[#EAE9CA] shadow">
      <div class="flex flex-row">
        <div class="w-[355px] h-[70px]">
          <div
            class="w-[390px] h-[83px] bg-[#F2F0CC] rounded-2xl shadow-[inset_0_4px_7px_rgba(0,0,0,0.3)] drop-shadow-md"
          >
            <h2
              class="w-[390px] h-[70px] text-center justify-center text-[#4E684A] text-[55px] font-semibold font-['Outfit']"
            >
              Teacher Name
            </h2>
          </div>
        </div>
        <div class="w-[277px] h-[73px]">
          <div
            class="w-[277px] h-[73px] bg-[#426B1F] rounded-[20px] shadow shadow-inner shadow-[inset_0_4px_7px_rgba(0,0,0,0.3)] drop-shadow-md"
          >
            <h1
              class="w-[277px] h-[73px] text-center text-white text-[50px] font-medium font-['Outfit']"
            >
              Dashboard
            </h1>
          </div>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<!--  
<div class="w-[1440px] h-[114px] relative flex-col justify-start items-start inline-flex">
    <div class="w-[1440px] h-[109px] bg-lime-100 shadow"></div>
    <div class="w-[74px] h-[74px] relative">
        <div class="w-[74px] h-[74px] left-0 top-0 absolute bg-lime-800 rounded-[14px] shadow-inner"></div>
        <div class="w-[42px] h-[42px] left-[16px] top-[16px] absolute bg-white rounded-[5px]"></div>
    </div>
    <div class="w-[73px] h-[73px] relative">
        <div class="w-[73px] h-[73px] left-0 top-0 absolute bg-lime-800 rounded-full shadow-inner"></div>
    </div>
    <div class="w-[277px] h-[73px] relative">
        <div class="w-[277px] h-[73px] left-0 top-0 absolute bg-lime-800 rounded-[20px] shadow shadow-inner"></div>
        <div class="w-[252px] h-[73px] left-[12px] top-0 absolute text-center text-white text-[50px] font-medium font-['Outfit']">Dashboard</div>
    </div>
    <div class="w-[355px] h-[70px] relative">
        <div class="w-[390px] h-[83px] left-[-9px] top-[-6px] absolute bg-lime-100 rounded-2xl shadow-inner"></div>
        <div class="w-[363px] h-[70px] left-[5px] top-0 absolute text-center text-stone-600 text-[55px] font-medium font-['Outfit']">Teacher Name</div>
    </div>
    <div class="w-[168px] h-[68px] relative bg-lime-800 rounded-[20px] shadow-inner">
        <div class="w-[217.55px] h-[73.26px] left-[-24.36px] top-[-4px] absolute text-center text-stone-50 text-[40px] font-medium font-['Outfit']">Logout</div>
        <div class="w-[38px] h-[0px] left-0 top-[34px] absolute origin-top-left rotate-180 border border-black"></div>
    </div>
</div>
-->
