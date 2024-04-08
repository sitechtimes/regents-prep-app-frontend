import { defineStore } from "pinia";

export const userState = defineStore("state", () => {
  const email = ref<string>("");
  const username = ref<string>("");
  const fullname = ref<string>("");
  const student = ref<boolean>(false); // temporary dev option
  const user_type = ref<string>("");
  const loggedIn = ref<boolean>(false);
  const access_token = ref<string>("");
  const refresh_token = ref<string>("");

  function $logout() {
    (email.value = ""),
      (username.value = ""),
      (fullname.value = ""),
      (user_type.value = ""),
      (student.value = false),
      (loggedIn.value = false);
    useRouter().push("/login");
  }

  const $userLogin = async (
    email: string,
    password: string
  ) => {
    try {
      let fullUserName = email;
      if (email.includes("@")) {
        fullUserName = email.split("@")[0];
      }
      const response = await fetch(
        `${config.public.API_URL}/api/token/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: fullUserName,
            password: password,
          }),
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          access_token.value = data.access;
          refresh_token.value = data.refresh;
          console.log(
            access_token.value,
            refresh_token.value
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    email,
    username,
    fullname,
    student, // dev option
    user_type,
    loggedIn,
    $logout,
  };
});
