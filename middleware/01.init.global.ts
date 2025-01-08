export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  // Only run on initial page load
  // https://nuxt.com/docs/guide/directory-structure/middleware#when-middleware-runs
  if (!import.meta.client || !nuxtApp.isHydrating || !nuxtApp.payload.serverRendered) return;

  const userStore = useUserStore();

  await userStore.init();
  if (!userStore.isAuth && to.meta.requiresAuth) return navigateTo("/login");
  else if (userStore.isAuth && ["/login", "/"].includes(to.path)) return navigateTo(`/${userStore.userType}/dashboard`);
});
