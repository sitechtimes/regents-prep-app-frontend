export const useUserStore = defineStore("userStore", () => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const isAuth = ref(false);
  const isDarkMode = ref(false);
  const name = ref("");
  const userType = ref<"student" | "teacher">("student");

  const studentCourses = ref<StudentCourse[]>([]);
  const teacherCourses = ref<TeacherCourseNoAssignment[]>([]);
  const studentCurrentCourse = ref<StudentCourse>();
  const teacherCurrentCourse = ref<TeacherCourse>();

  const currentQuestion = ref<QuestionInterface>();

  async function init(): Promise<void> {
    const res = await fetch(`${config.public.backend}init/`, {
      credentials: "include"
    });
    if (!res.ok) return;
    const data = await res.json();

    isAuth.value = true;
    name.value = data.name;
    userType.value = data.userType.toLowerCase();

    if (userType.value === "student") {
      courseToDate(data.courses);
      return void (studentCourses.value = data.courses);
    }

    teacherCourses.value = data.courses;
  }
  async function login(email: string, password: string) {
    const res = await fetch(`${config.public.backend}auth/login/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });
    const data = await res.json();
    if (!res.ok) return data;

    isAuth.value = true;
    name.value = data.name;
    userType.value = data.userType.toLowerCase();

    if (userType.value === "student") {
      courseToDate(data.courses);
      return void (studentCourses.value = data.courses);
    }

    teacherCourses.value = data.courses;
  }

  async function logout() {
    const res = await fetch(`${config.public.backend}auth/logout/`, {
      method: "POST",
      credentials: "include"
    });
    if (!res.ok) return;
    void router.push("/");
  }

  return { name, isAuth, userType, isDarkMode, studentCourses, teacherCourses, studentCurrentCourse, teacherCurrentCourse, currentQuestion, init, login, logout };
});
