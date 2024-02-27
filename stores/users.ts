import { defineStore } from "pinia";

export const userState = defineStore("settings", () => {
  const email = ref("");
  const username = ref("");
  const fullname = ref("");
  const student = ref(false);
  const loggedIn = ref(false);
  function logout() {
    email.value = "",
    username.value = "",
    fullname.value = "",
    student.value = false,
    loggedIn.value = false
    useRouter().push("/login")
  }
  return {
    email,
    username,
    fullname,
    student,
    loggedIn,
    logout
  };
});
