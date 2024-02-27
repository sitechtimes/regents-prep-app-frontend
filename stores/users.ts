import { defineStore } from "pinia";

export const userState = defineStore("settings", () => {
  const email = ref<string>("");
  const username = ref<string>("");
  const fullname = ref<string>("");
  const student = ref<boolean>(false);
  const loggedIn = ref<boolean>(false);

  
  return {
    email,
    username,
    fullname,
    student,
    loggedIn,
  };
});
