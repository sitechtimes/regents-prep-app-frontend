export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  if ((userStore.initComplete && !userStore.isAuth && to.meta.requiresAuth) || !to.path.includes(userStore.userType)) return navigateTo("/login");
});
