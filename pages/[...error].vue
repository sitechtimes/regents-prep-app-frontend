<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--bg-color)]">
    <div class="p-6 max-w-md mx-auto bg-[var(--bg-color)] flex flex-col items-center">
      <h1 class="text-8xl md:text-[10rem] mb leading-none font-extrabold text-[var(--text-color)] text-center">404</h1>
      <p class="text-lg text-[var(--text-color)] text-center mb-4">Sorry, we couldn't find the page you were looking for.</p>
      <NuxtLink to="/" class="px-8 py-2 text-xl font-medium rounded-full bg-green-accent brightness-75 text-[var(--text-color)] hover:brightness-100 transition">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
