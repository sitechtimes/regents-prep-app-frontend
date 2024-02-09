import { defineStore } from "pinia";

export const userState = defineStore("state", () => {
  const email = ref("");
  const username = ref("");
  const fullname = ref("");
  const student = ref(false); // temporary dev option
  const usertype = ref("");
  const loggedIn = ref(false);

  return {
    email,
    username,
    fullname,
    student, // dev option
    usertype,
    loggedIn,
  };
});
