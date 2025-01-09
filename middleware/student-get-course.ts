export default defineNuxtRouteMiddleware(async (to) => {
  console.log(to);
  const userStore = useUserStore();
  const { courses, currentCourse } = storeToRefs(userStore);

  if (!courses.value) return;
  const courseCode = Number(to.params.courseCode);

  // currentCourse.value = courses.value.find((course) => course.id === courseCode);
  // if (!currentCourse.value) return navigateTo(`/student/dashboard?course=${courseCode}`);

  // currentCourse.value.assignments = (await getAssignments(Number(to.params.courseCode))) as StudentAssignment[];
});
