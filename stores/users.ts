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
      previousRoutePath.value = from.fullPath;
      console.log(previousRoutePath.value);
    });

    if (userStore.usertype != "teacher") {
      router.push({
        path: previousRoutePath.value,
      });
      console.log("not a teacher, being redirected");
    } else {
    }
  }

  function studentCheck() {
    const userStore = userState();
    const router = useRouter();
    const previousRoutePath = ref("");

    router.beforeEach((to, from, next) => {
      previousRoutePath.value = from.fullPath;
      console.log(previousRoutePath.value);
    });

    if (userStore.usertype != "student") {
      router.push({
        path: previousRoutePath.value,
      });
      console.log("not a student, being redirected");
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
  };
});

/* export const userState0 = defineStore("store", {
  state: () => ({
    email: "",
    username: "",
    fullname: "",
    student: false,
    usertype: "",
    loggedIn: false,
  }),
  actions: {
    teacherCheck() {},
    studentCheck() {},
  },
}); */
