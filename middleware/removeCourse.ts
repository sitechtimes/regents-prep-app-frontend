export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const { currentCourse } = storeToRefs(userStore);

  currentCourse.value = undefined;
});
