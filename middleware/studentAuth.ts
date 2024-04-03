import { userState } from "~/stores/users";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = userState();
  /* const router = useRouter();
  const previousRoutePath = ref("");

  router.beforeEach((to, from) => {
    previousRoutePath.value = from.fullPath; // saves the current path before taking user to new route
  }); */
  if (userStore.user_type == "student") {
    //console.log("navigated");
    navigateTo(to);
  } else {
    //console.log("aborted");
    return abortNavigation();
  }
});
