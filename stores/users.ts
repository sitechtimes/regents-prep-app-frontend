import { defineStore } from "pinia";

export const userState = defineStore("state", () => {
  const email = ref<string>("");
  const username = ref<string>("");
  const fullname = ref<string>("");
  const student = ref<boolean>(false); // temporary dev option
  const usertype = ref<string>("");
  const loggedIn = ref<boolean>(false);

  function teacherCheck() {
    const userStore = userState();
    const router = useRouter();
    const previousRoutePath = ref("");

    router.beforeEach((to, from, next) => {
      previousRoutePath.value = from.fullPath; // saves the current path before taking user to new route
    });

    // if the user is not a teacher then redirects back to their previous path
    if (userStore.usertype != "teacher") {
      router.push({
        path: previousRoutePath.value,
      });
      //console.log("not a teacher, being redirected");
    } else {
    }
  }

  function $logout() {
    (email.value = ""),
      (username.value = ""),
      (fullname.value = ""),
      (student.value = false),
      (loggedIn.value = false);
    useRouter().push("/login");
  }

  function studentCheck() {
    const userStore = userState();
    const router = useRouter();
    const previousRoutePath = ref("");

    router.beforeEach((to, from, next) => {
      previousRoutePath.value = from.fullPath; // saves the current path before taking user to new route
    });

    // if the user is not a teacher then redirects back to their previous path
    if (userStore.usertype != "student") {
      router.push({
        path: previousRoutePath.value,
      });
      //console.log("not a student, being redirected");
    } else {
    }
  }

  return {
    email,
    username,
    fullname,
    student, // dev option
    usertype,
    loggedIn,
    teacherCheck,
    studentCheck,
    $logout,
  };
});
