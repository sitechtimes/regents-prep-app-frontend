export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.client) return;
  if (to.name === from.name && Object.keys(to.params).every((param) => to.params[param] === from.params[param])) return; // prevent middleware from running when changing route queries

  const userStore = useUserStore();
  const { teacherCourses, teacherCurrentCourse } = storeToRefs(userStore);

  if (!teacherCourses.value) return;
  const courseCode = Number(to.params.courseCode);

  teacherCurrentCourse.value = teacherCourses.value.find((course) => course.id === courseCode);
  if (!teacherCurrentCourse.value) return await navigateTo(`/teacher/dashboard?course=${courseCode}`);

  if (from.name === "teacher-dashboard" && to.name !== "teacher-course-courseCode") return; // if we're not going to course page from dashboard
  if (teacherCurrentCourse.value.assignmentsFetched) return;
  teacherCurrentCourse.value.assignments = await getAssignments<TeacherAssignment[]>(Number(to.params.courseCode));
  teacherCurrentCourse.value.assignmentsFetched = true;
});
