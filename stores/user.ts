export const useUserStore = defineStore("userStore", () => {
  const config = useRuntimeConfig();
  const isAuth = ref(false);
  const theme = ref<"light" | "dark">("light");
  const name = ref<string>("");
  const userType = ref<"student" | "teacher">("student");
  const courses = ref<(StudentCourseInfo | TeacherCourseInfo)[]>([]);
  const currentCourse = ref<StudentCourseInfo | TeacherCourseInfo>();
  const router = useRouter();

  async function init() {
    const res = await fetch(config.public.backend + "init/", {
      credentials: "include"
    });
    if (!res.ok) return;
    const data = await res.json();
    isAuth.value = true;
    name.value = data.name;
    userType.value = data.userType.toLowerCase();
    courses.value = data.courses;
    router.push(`${userType.value}/dashboard`);
  }
  async function login(email: string, password: string) {
    const res = await fetch(config.public.backend + "auth/login/", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });
    if (!res.ok) return await res.json();
    const data = await res.json();
    isAuth.value = true;
    name.value = data.name;
    userType.value = data.userType.toLowerCase();
    courses.value = data.courses;
  }

  return { isAuth, userType, theme, courses, currentCourse, init, login };
});
