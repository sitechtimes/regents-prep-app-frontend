<template>
  <div class="flex min-h-dvh w-full flex-col-reverse items-center justify-center gap-4 pb-20 sm:gap-0 md:flex-row md:space-x-10 md:px-12 md:pb-0 lg:px-44 xl:px-64 2xl:px-96">
    <!-- left side -->
    <div class="flex flex-col items-center justify-center md:block md:grow">
      <div class="flex items-center border-b-2 border-[var(--primary)] pb-4 sm:border-b-4 md:border-b-0 md:pb-0 lg:mb-6">
        <div class="mr-6 hidden h-36 w-1 bg-[var(--primary)] md:block 2xl:h-44"></div>
        <h1 class="flex w-96 flex-col text-center text-3xl font-semibold leading-relaxed sm:text-4xl md:text-left md:text-5xl 2xl:text-6xl">
          <span class="text-2xl 2xl:text-4xl">Welcome to the</span>
          SITHS Regents Prep App
        </h1>
      </div>
      <p class="mb-2 mt-4 text-xl sm:mb-8 sm:text-2xl">Don't fail your Regents with this one.</p>
      <!-- buttons -->
      <div class="mt-4 flex space-x-4 sm:mt-0">
        <NuxtLink to="/login" class="flex items-center rounded-xl bg-[var(--primary)] px-6 py-2 text-2xl text-[var(--text-color)] hover:brightness-[0.85] lg:px-16 hover:dark:brightness-125">
          {{ isAuth ? "Continue" : "Login" }}
        </NuxtLink>
      </div>
    </div>

    <!-- right side -->

    <img class="mb-6 w-52 xs:mb-0 xs:w-72 lg:w-100 xl:w-115 2xl:w-125" draggable="false" src="/seagull.png" alt="Regents Prep Seagull" />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { isAuth } = storeToRefs(userStore);
</script>

<style scoped></style>
