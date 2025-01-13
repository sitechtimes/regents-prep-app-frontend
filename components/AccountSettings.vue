<template>
  <div class="du-dropdown du-dropdown-end du-dropdown-hover">
    <img tabindex="0" role="button" class="m-1 h-6 w-6 outline-none dark:invert" src="/ui/user.svg" alt="Open account settings" />
    <ul tabindex="0" class="du-dropdown-content z-[1] w-52 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] p-2 shadow">
      <li class="flex h-10 w-full flex-col justify-center rounded-lg pl-4 text-left transition-all duration-500 hover:bg-[var(--hover-background)]">Account Settings</li>
      <li>
        <button @click="confirmLogout" class="h-10 w-full rounded-lg pl-4 text-left transition-all duration-500 hover:bg-[#ff625aa9]">Logout</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const confirmLogout = () => {
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (confirmed) {
    userStore.logout();
  }
};
</script>

<style scoped></style>
