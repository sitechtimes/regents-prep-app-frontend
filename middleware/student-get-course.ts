export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.client) return;
  if (to.name === from.name && Object.values(to.params).every((param) => String(param) === from.params[String(param)])) return; // prevent middleware from running when changing route queries

  const userStore = useUserStore();
  const { studentCourses, studentCurrentCourse } = storeToRefs(userStore);

  if (!studentCourses.value) return;
  const courseCode = Number(to.params.courseCode);

  studentCurrentCourse.value = studentCourses.value.find((course) => course.id === courseCode);
  if (!studentCurrentCourse.value) return await navigateTo(`/student/dashboard?course=${courseCode}`);

  studentCurrentCourse.value.assignments = await getAssignments<StudentAssignment[]>(Number(to.params.courseCode));
});
