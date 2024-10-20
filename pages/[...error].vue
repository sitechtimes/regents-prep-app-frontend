<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--bg-color)]">
    <div class="p-6 max-w-md mx-auto bg-[var(--bg-color)] flex flex-col items-center">
      <h1 class="text-[6rem] md:text-[10rem] font-bold text-[var(--text-color)] text-center -mb-5">404</h1>
      <p class="text-lg text-[var(--text-color)] text-center mb-4">Sorry, we couldn't find the page you were looking for.</p>
      <NuxtLink to="/" class="px-8 py-2 text-xl font-medium rounded-full bg-green-accent text-[var(--text-color)] hover:bg-opacity-90 transition">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
