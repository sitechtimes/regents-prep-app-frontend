export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useStore();

  if (!userStore.isAuth && to.meta.requiresAuth) return navigateTo("/login");
});
