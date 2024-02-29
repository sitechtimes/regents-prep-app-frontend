import { defineStore } from "pinia";

export const userState = defineStore("settings", () => {
  
  const email = ref<string>("");
  const username = ref<string>("");
  const fullname = ref<string>("");
  const student = ref<boolean>(false);
  const loggedIn = ref<boolean>(false);

    function $logout() {
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
    $logout
  };
});
