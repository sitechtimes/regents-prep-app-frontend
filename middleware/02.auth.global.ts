export default defineNuxtRouteMiddleware((to) => {
  if (!to.meta.requiresAuth) return;

  const userStore = useUserStore();
  if (!userStore.isAuth) return navigateTo("/login");
});
