export default defineNuxtRouteMiddleware(async (to) => {
  if (!import.meta.client) return;

  const userStore = useUserStore();
  const { teacherCourses, teacherCurrentCourse } = storeToRefs(userStore);

  if (!teacherCourses.value) return;
  const courseCode = Number(to.params.courseCode);

  // @ts-expect-error `assignments` is declared later in file
  teacherCurrentCourse.value = teacherCourses.value.find((course) => course.id === courseCode);
  if (!teacherCurrentCourse.value) return void navigateTo(`/teacher/dashboard?course=${courseCode}`);

  teacherCurrentCourse.value.assignments = await getAssignments<TeacherAssignment[]>(Number(to.params.courseCode));
});
