import { defineStore } from "pinia";

export const userState = defineStore("settings", () => {
  const email = ref("");
  const username = ref("");
  const fullname = ref("");
  const student = ref(false);
  const loggedIn = ref(false);

  
/*   function $resetLogin() {
    email.value = ""
    username.value = ""
    fullname.value = ""
   } */
//Logout function in-progress


  return {
    email,
    username,
    fullname,
    student,
    loggedIn,
  };
});
