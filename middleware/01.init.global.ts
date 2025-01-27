export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  // only run on initial page load
  // https://nuxt.com/docs/guide/directory-structure/middleware#when-middleware-runs
  if (!import.meta.client || !nuxtApp.isHydrating || !nuxtApp.payload.serverRendered) return;

  const userStore = useUserStore();

  try {
    await userStore.init();
    if (!userStore.isAuth && !["/login", "/"].includes(to.path)) return await navigateTo("/login", { redirectCode: 301 });
    else if (userStore.isAuth && ["/login", "/"].includes(to.path)) return await navigateTo(`/${userStore.userType}/dashboard`, { redirectCode: 301 });
  } catch (error) {
    console.error(error);
  }
});
