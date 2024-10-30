export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  if (!userStore.initComplete) {
    await userStore.init();
  }
  if (!userStore.isAuth && to.meta.requiresAuth) {
    return navigateTo("/login");
  }

  if (!userStore.isAuth && to.meta.requiresAuth) return navigateTo("/login");
});
