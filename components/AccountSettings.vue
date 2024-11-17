<template>
    <div class="du-dropdown du-dropdown-hover du-dropdown-end">
        <img tabindex="0" role="button" class="btn m-1 w-6 h-6 dark:invert" src="/ui/user.svg"
            alt="Open account settings" />
        <ul tabindex="0"
            class="du-dropdown-content bg-[var(--bg-color)] border border-[var(--border-color)] mt-2 rounded-lg z-[1] w-52 p-2 shadow">
            <li
                class="w-full h-10 text-left flex flex-col justify-center pl-4 hover:bg-[var(--hover-background)] duration-500 transition-all rounded-lg">
                Account Settings
            </li>
            <li>
                <button @click="confirmLogout"
                    class="w-full h-10 text-left pl-4 hover:bg-[#ff625aa9] duration-500 transition-all rounded-lg">
                    Logout
                </button>
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
