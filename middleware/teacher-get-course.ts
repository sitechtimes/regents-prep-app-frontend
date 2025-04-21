export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.client) return;
  if (to.name === from.name && Object.values(to.params).every((param) => String(param) === from.params[String(param)])) return; // prevent middleware from running when changing route queries

  const userStore = useUserStore();
  const { teacherCourses, teacherCurrentCourse } = storeToRefs(userStore);

  if (!teacherCourses.value) return;
  const courseCode = Number(to.params.courseCode);

  // @ts-expect-error `assignments` is declared later in file
  teacherCurrentCourse.value = teacherCourses.value.find((course) => course.id === courseCode);
  if (!teacherCurrentCourse.value) return await navigateTo(`/teacher/dashboard?course=${courseCode}`);

  teacherCurrentCourse.value.assignments = await getAssignments<TeacherAssignment[]>(Number(to.params.courseCode));
});
