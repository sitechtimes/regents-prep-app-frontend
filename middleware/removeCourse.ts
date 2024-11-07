export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  userStore.currentCourse = undefined;
});
