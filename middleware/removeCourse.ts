export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useStore();
  const { currentCourse } = storeToRefs(userStore);

  currentCourse.value = undefined;
});
