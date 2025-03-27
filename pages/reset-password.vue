<template>
  <div class="bg-gray flex min-h-screen w-screen flex-col items-center justify-center py-12">
    <h1 class="text-5xl font-bold">Reset Password</h1>
    <div class="mb-2 flex flex-col items-center justify-center rounded-3xl bg-[color:var(--bg-color)] p-4">
      <h3 class="mb-4">Enter your email address below to receive the link.</h3>

      <form class="login flex w-full flex-col items-center justify-center gap-7" @submit.prevent>
        <div class="relative flex flex-col items-start justify-center gap-1">
          <label class="font-medium" for="email">Email Address <span title="Required" class="font-2xl text-red-500">*</span></label>
          <input
            id="email"
            class="h-12 w-96 rounded-lg border-0 bg-gray-accent px-4 transition duration-300 focus:bg-[color:var(--bg-color)] focus:outline focus:outline-2 focus:outline-[color:var(--primary)]"
            type="email"
            required
            autocomplete="email"
          />
        </div>
        <div class="relative flex w-96 flex-col items-center justify-center gap-1">
          <button class="w-40 items-center rounded-lg bg-green-accent px-16 py-2 hover:brightness-[0.85]" type="submit">
            <span v-if="loading" class="loading du-loading du-loading-sm mt-1"></span>
            <p v-else class="text-lg">Send</p>
          </button>
        </div>
      </form>
    </div>
    <NuxtLink to="/login" class="mt-3 text-neutral-600"> Remembered your password? Login here. </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
