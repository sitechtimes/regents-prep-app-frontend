import { defineStore } from 'pinia'

export const userState = defineStore("settings", () => {
    const user = ref({
        email: null,
        name: null,
        student: null,
    });
    const loggedIn = ref(false);
    return {user, loggedIn}
});
