import { defineStore } from "pinia";

export const userState = defineStore("settings", () => {
  const email = ref("");
  const username = ref("");
  const fullname = ref("");
  const student = ref(false);
  const loggedIn = ref(false);
  return {
    email,
    username,
    fullname,
    student,
    loggedIn,
  };
});
