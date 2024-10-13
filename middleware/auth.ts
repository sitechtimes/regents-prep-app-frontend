export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.isAuth && to.meta.requiresAuth) return navigateTo("/login");
});