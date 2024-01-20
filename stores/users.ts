import { defineStore } from 'pinia'

export const userState = defineStore("settings", () => {
    const user = ref({
        email: '',
        username: '',
        fullname:'', //Note: full name is going to be requested from the api using the username.
        student: false,
    });
    const loggedIn = ref(false);
    return {user, loggedIn}
    
});
