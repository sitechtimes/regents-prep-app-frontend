export const useUserStore = defineStore("userStore", () => {
  const config = useRuntimeConfig();
  const isAuth = ref(false);
  const theme = ref<"light" | "dark">("light");
  const name = ref<string>("");
  const userType = ref<"student" | "teacher">("student");
  const courses = ref<(StudentCourse | TeacherCourse)[]>([]);
  const currentCourse = ref<StudentCourse | TeacherCourse>();
  const initComplete = ref(false);

  async function init() {
    const res = await fetch(config.public.backend + "init/", {
      credentials: "include"
    });
    if (!res.ok) return;
    const data = await res.json();
    isAuth.value = true;
    name.value = data.name;
    userType.value = data.userType.toLowerCase();
    courseToDate(data.courses);
    courses.value = data.courses;
    initComplete.value = true;
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
    courseToDate(data.courses);
    courses.value = data.courses;
  }

  return { isAuth, initComplete, userType, theme, courses, currentCourse, init, login };
});
