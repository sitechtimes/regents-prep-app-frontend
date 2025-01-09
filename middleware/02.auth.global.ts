export default defineNuxtRouteMiddleware((to, from) => {
  if (!to.meta.requiresAuth) return;

  const userStore = useUserStore();
  if (!userStore.isAuth) return navigateTo("/login", { redirectCode: 301 });
});
