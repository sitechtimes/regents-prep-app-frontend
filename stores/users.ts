import { defineStore } from 'pinia'

export const userState = defineStore("settings", () => {
    const user = ref({
        email: '',
        name: '',
        student: false,
    });
    const loggedIn = ref(false);
    return {user, loggedIn}
    
});
