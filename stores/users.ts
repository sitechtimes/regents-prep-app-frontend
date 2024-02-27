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

export const teacherCheck = function () {
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
};

export const studentCheck = function () {
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
};
function state(): unknown {
  throw new Error("Function not implemented.");
}
