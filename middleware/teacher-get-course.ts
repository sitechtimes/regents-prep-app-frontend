export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.client) return;
  if (to.name === from.name && Object.keys(to.params).every((param) => to.params[param] === from.params[param])) return; // prevent middleware from running when changing route queries

  const userStore = useUserStore();
  const { teacherCourses, teacherCurrentCourse } = storeToRefs(userStore);

  if (!teacherCourses.value) return;
  const courseCode = Number(to.params.courseCode);

  // @ts-expect-error `assignments` is declared later in file
  teacherCurrentCourse.value = teacherCourses.value.find((course) => course.id === courseCode);
  if (!teacherCurrentCourse.value) return await navigateTo(`/teacher/dashboard?course=${courseCode}`);

  if (teacherCurrentCourse.value.assignments?.length !== teacherCurrentCourse.value.assignmentsLength) return;
  teacherCurrentCourse.value.assignments = await getAssignments<TeacherAssignment[]>(Number(to.params.courseCode));
});
