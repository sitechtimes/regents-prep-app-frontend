import { defineStore } from "pinia";

export const userState = defineStore("state", () => {
  const email = ref<string>("");
  const username = ref<string>("");
  const fullname = ref<string>("");
  const student = ref<boolean>(false); // temporary dev option
  const usertype = ref<string>("");
  const loggedIn = ref<boolean>(false);

  function $logout() {
    (email.value = ""),
      (username.value = ""),
      (fullname.value = ""),
      (student.value = false),
      (loggedIn.value = false);
    useRouter().push("/login");
  }

  return {
    email,
    username,
    fullname,
    student, // dev option
    usertype,
    loggedIn,
    $logout,
  };
});
