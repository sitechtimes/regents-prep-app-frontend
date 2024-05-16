import { userState } from "~/stores/users";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = userState();
  if (userStore.user_type == "student") {
    navigateTo(to);
  } else {
    return abortNavigation();
  }
});
