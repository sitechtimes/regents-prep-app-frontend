export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.client) return;
  if (to.name === from.name && Object.keys(to.params).every((param) => to.params[param] === from.params[param])) return; // prevent middleware from running when changing route queries

  const userStore = useUserStore();
  const { studentCourses, studentCurrentCourse } = storeToRefs(userStore);

  if (!studentCourses.value) return;
  const courseCode = Number(to.params.courseCode);

  studentCurrentCourse.value = studentCourses.value.find((course) => course.id === courseCode);
  if (!studentCurrentCourse.value) return await navigateTo(`/student/dashboard?course=${courseCode}`);

  if (from.name === "student-dashboard" && to.name !== "student-course-courseCode") return; // if we're not going to course page from dashboard
  if (studentCurrentCourse.value.assignmentsFetched) return;
  studentCurrentCourse.value.assignments = await getAssignments<StudentAssignment[]>(Number(to.params.courseCode));
  studentCurrentCourse.value.assignmentsFetched = true;
});
