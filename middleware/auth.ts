export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  userStore.init();
  if (!userStore.isAuth && to.meta.requiresAuth) return navigateTo("/login");
});
