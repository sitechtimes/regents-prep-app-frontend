export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  //if (userStore.initComplete && !userStore.isAuth && to.meta.requiresAuth) return navigateTo("/login");
});
