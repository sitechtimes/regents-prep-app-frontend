export default defineNuxtRouteMiddleware(async (to) => {
  if (!import.meta.client) return;

  console.log(1);
  const router = useRouter();
  const userStore = useUserStore();
  const { courses, currentCourse } = storeToRefs(userStore);

  if (!courses.value) return;
  const courseCode = Number(to.params.courseCode);

  currentCourse.value = courses.value.find((course) => course.id === courseCode);
  console.log(currentCourse.value);
  if (!currentCourse.value) return navigateTo(`/student/dashboard?course=${courseCode}`);

  currentCourse.value.assignments = (await getAssignments(Number(to.params.courseCode))) as StudentAssignment[];
});
