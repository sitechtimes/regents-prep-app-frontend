import { defineStore } from "pinia";

export const userState = defineStore("settings", () => {
  const email = ref("");
  const username = ref("");
  const fullname = ref("");
  const user_type = ref("");
  const loggedIn = ref(false);
  return {
    email,
    username,
    fullname,
    user_type,
    loggedIn,
  };
});
