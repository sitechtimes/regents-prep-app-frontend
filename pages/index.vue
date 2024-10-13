<template>
  <div class="flex flex-row justify-center items-center min-h-screen w-screen px-8 space-x-10">
    <!-- left side -->
    <div class="w-1/3">
      <div class="flex items-center mb-6">
        <div class="border-r-4 border-black h-32 mr-6"></div>
        <h1 class="font-bold text-5xl leading-relaxed">
          Welcome to the <br />
          SITHS Regents Prep App
        </h1>
      </div>
      <p class="text-2xl mt-4 mb-8">
        Don't fail your Regents.
      </p>
      <!-- buttons -->
      <div class="flex space-x-4">
        <NuxtLink to="/login?signup=1"
          class="flex items-center bg-green text-black text-2xl font-semibold px-6 py-2 rounded-full">
          Sign up
        </NuxtLink>
        <NuxtLink to="/login"
          class="flex items-center bg-transparent border-2 border-black text-black text-2xl font-semibold px-6 py-2 rounded-full">
          Login
        </NuxtLink>
      </div>
    </div>

    <!-- right side -->
    <div class="w-1/4">
      <img src="../public/landingCat.png" alt="Cat on a computer" class="w-full object-cover" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
