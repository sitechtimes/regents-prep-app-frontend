import { userState } from "~/stores/users";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = userState();
  if (userStore.user_type == "Student") {
    navigateTo(to);
  } else {
    console.log("Student Middleware triggered")
    return abortNavigation();
  }
});
