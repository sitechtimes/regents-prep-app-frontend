export const useUserStore = defineStore("userStore", async () => {
  const config = useRuntimeConfig();
  const isAuth = ref(true);
  const theme = ref<"light" | "dark">("light");
  const courses = ref<(StudentCourseInfo | TeacherCourseInfo)[]>([]);
  const currentCourse = ref<StudentCourseInfo | TeacherCourseInfo>();

  async function login(username: string, password: string) {
    const res = await fetch(config.backend + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    });
    if (!res.ok) return await res.json();
    const data = await res.json();
  }
  return { isAuth, login, theme, courses, currentCourse };
});
