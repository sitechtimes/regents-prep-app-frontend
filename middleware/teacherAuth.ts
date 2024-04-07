import { userState } from "~/stores/users";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = userState();
  if (userStore.user_type == "teacher") {
    //console.log("navigated");
    navigateTo(to);
  } else {
    //console.log("aborted");
    return abortNavigation();
  }
});
