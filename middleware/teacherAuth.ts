import { userState } from "~/stores/users";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = userState();
  if (userStore.user_type == "Teacher") {
    navigateTo(to);
  } else {
    console.log("Teacher Middleware triggered")
    return abortNavigation();
  }
});
