<template>
  <div>
    <div></div>
    <h1>Login</h1>
    <h2>Email</h2>
    <input
      type="input"
      name="email"
      id="emailInput"
      class="relative mt-2 rounded-md shadow-sm border-opacity-4"
    />
    <!-- Note that the tailwind for both inputs is a placeholder just to see the input boxes. Please feel free to change them if needed. -->
    <h2>Password</h2>
    <input
      type="input"
      name="password"
      id="passwordInput"
      class="relative mt-2 rounded-md shadow-sm border-opacity-4"
    />
    <h3>Forgot Password?</h3>
    <button>
      <NuxtLink to="/teacher/teacherdashboard" class="loginLink"
        >Login</NuxtLink
      >
    </button>
  </div>
</template>

<script></script>

<style lang="css" scoped></style>
