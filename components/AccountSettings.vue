<template>
  <div class="relative inline-block">
    <img tabindex="0" role="button" class="h-10 w-10 cursor-pointer select-none outline-none dark:invert" src="/ui/user.svg" alt="Open account settings" draggable="false" @click="isOpen = !isOpen" />
    <Transition name="slide-up">
      <ul v-show="isOpen" tabindex="0" class="absolute right-0 z-10 mt-2 w-52 rounded-lg border border-gray-300 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <li>
          <h3 class="text h-10 w-full pl-4 pt-1 text-left font-medium">
            {{ userStore.name }}
          </h3>
          <button class="h-10 w-full rounded-lg pl-4 text-left hover:bg-[#ff625aa9]" type="button" @click="confirmLogout">Logout</button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const isOpen = ref(false);

function confirmLogout() {
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (confirmed) void userStore.logout();
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease-in-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
