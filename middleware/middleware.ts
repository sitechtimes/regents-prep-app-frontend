import { userState } from "~/stores/users";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = userState();
  /* const router = useRouter();
  const previousRoutePath = ref(""); */

  function $teacherCheck() {
    /* router.beforeEach((to, from) => {
      previousRoutePath.value = from.fullPath; // saves the current path before taking user to new route
    }); */

    // if the user is not a teacher then redirects back to their previous path
    if (userStore.usertype != "teacher") {
      /* router.push({
        path: previousRoutePath.value,
      }); */
      /* return navigateTo(previousRoutePath.value); */
      return abortNavigation();
    } else {
    }
  }

  function $studentCheck() {
    /* router.beforeEach((to, from) => {
      previousRoutePath.value = from.fullPath; // saves the current path before taking user to new route
    }); */

    // if the user is not a teacher then redirects back to their previous path
    if (userStore.usertype != "student") {
      /* router.push({
        path: previousRoutePath.value,
      }); */
      //return navigateTo(previousRoutePath.value);
    } else {
    }
  }
});
