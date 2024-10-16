export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useStore();
  const { courses, currentCourse } = storeToRefs(userStore);

  const routeCode = to.params.courseCode as string;
  currentCourse.value = courses.value.find((course) => course.id === Number(routeCode));
});
