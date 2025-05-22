type LoginSuccess = {
  name: string;
} & (
  | {
      userType: "Student";
      courses: StudentCourse[];
    }
  | {
      userType: "Teacher";
      courses: TeacherCourseNoAssignment[];
    }
);
type LoginFailure =
  | {
      non_field_errors: string[];
    }
  | {
      email: string[];
    };

export const useUserStore = defineStore("userStore", () => {
  const router = useRouter();

  const isAuth = ref(false);
  const isDarkMode = ref(false);
  const showSideMenu = ref(true);
  const name = ref("");
  const userType = ref<"student" | "teacher">("student");

  const studentCourses = ref<StudentCourse[]>([]);
  const teacherCourses = ref<TeacherCourseNoAssignment[]>([]);
  const studentCurrentCourse = ref<StudentCourse>();
  const teacherCurrentCourse = ref<TeacherCourse>();

  const currentQuestion = ref<StaticQuestionInterface | DynamicQuestionInterface>();

  /** @example { [id]: Topic } */
  const loadedTopics = ref<Record<number, TopicMapped>>({});
  /** @example { [id]: TopicPath } */
  const loadedTopicPaths = ref<Record<number, number[]>>({});
  /** @example { [id]: QuestionInterface } */
  const loadedQuestions = ref<Record<number, TopicQuestionInterface>>({});
  /** how many questions are there in total total */
  const totalQuestionCount = ref<number>(0);

  function handleLoginData(data: LoginSuccess): void {
    isAuth.value = true;
    name.value = data.name;
    userType.value = data.userType.toLowerCase() as "student" | "teacher";

    if (data.userType === "Student") {
      courseToDate(data.courses);
      return void (studentCourses.value = data.courses);
    }

    teacherCourses.value = data.courses;
  }

  async function init() {
    const { data, error } = await tryRequestEndpoint<LoginSuccess, LoginFailure>("init/");
    if (error) return;

    handleLoginData(data);
  }
  async function login(email: string, password: string) {
    const { data, error } = await tryRequestEndpoint<LoginSuccess | LoginFailure>("auth/login/", "POST", { email, password }, true);
    if (!error && data && "name" in data) return handleLoginData(data);

    console.error(data, error);
    return data as LoginFailure;
  }

  async function logout() {
    const { error } = await tryRequestEndpoint("auth/logout/", "POST");
    if (error) console.error(error);

    isAuth.value = false;
    await router.push("/");
  }

  return {
    name,
    isAuth,
    userType,
    isDarkMode,
    showSideMenu,
    studentCourses,
    teacherCourses,
    studentCurrentCourse,
    teacherCurrentCourse,
    currentQuestion,
    loadedTopics,
    loadedTopicPaths,
    loadedQuestions,
    totalQuestionCount,
    init,
    login,
    logout
  };
});
