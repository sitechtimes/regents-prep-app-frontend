import { defineStore } from 'pinia'

export const userState = defineStore("settings", () => {
/*     const user = ref({
        email: '',
        username: '',
        fullname:'', //Note: full name is going to be requested from the api using the username.
        student: false,
    }); */
    const email = ref("");
    const username = ref("");
    const fullname = ref(""); //Note: full name is going to be requested from the api using the username.
    const student = ref(false);
    const loggedIn = ref(false);
    return {email, username, fullname, student, loggedIn}
    
});
