export const useUserStore = defineStore("userStore", () => {
  const isAuth = ref(true);
  const theme = ref<"light" | "dark">("light");
  const courses = ref<(StudentCourseInfo | TeacherCourseInfo)[]>([]);

  return { isAuth, theme, courses };
});
