export default defineNuxtRouteMiddleware(async (to) => {
  if (!import.meta.client) return;

  const userStore = useUserStore();
  const { studentCourses, studentCurrentCourse } = storeToRefs(userStore);

  if (!studentCourses.value) return;
  const courseCode = Number(to.params.courseCode);

  studentCurrentCourse.value = studentCourses.value.find((course) => course.id === courseCode);
  if (!studentCurrentCourse.value) return await navigateTo(`/student/dashboard?course=${courseCode}`);

  studentCurrentCourse.value.assignments = await getAssignments<StudentAssignment[]>(Number(to.params.courseCode));
});
