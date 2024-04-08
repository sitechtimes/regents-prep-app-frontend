import { defineStore } from "pinia";
import { ref } from "vue";
import {
  course,
  assignmentDetails,
  ClassPreviewAssignments,
} from "~/interfaces/interfaces";

export const userState = defineStore("user", () => {
  // state
  const email = ref<string>("");
  const username = ref<string>("");
  const fullname = ref<string>("");
  const access_token = ref<string>("");
  const refresh_token = ref<string>("");
  const user_type = ref<string>(""); //initialized to be either teacher or student
  const studentCourses = ref<course[]>([]);
  // the todayDate and otherDayDate are excluded
  const loggedIn = ref<boolean>(false);
  const config = useRuntimeConfig();

  // actions
  const $userLogin = async (email: string, password: string) => {
    try {
      let fullUserName = email;
      if (email.includes("@")) {
        fullUserName = email.split("@")[0];
      }
      const response = await fetch(`${config.public.API_URL}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: fullUserName,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          access_token.value = data.access;
          refresh_token.value = data.refresh;
          console.log(access_token.value, refresh_token.value);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const $getUserCredentials = async () => {
    try {
      const response = await fetch(`${config.public.API_URL}/api/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.value}`,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          email.value = data.email;
          username.value = data.username;
          fullname.value = data.name;
          user_type.value = data.is_teacher ? "teacher" : "student";
          console.log(
            email.value,
            username.value,
            fullname.value,
            user_type.value
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  const $getStudentCourses = async () => {
    try {
      const response = await fetch(
        `${config.public.API_URL}/api/courses/student/all/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token.value}`,
          },
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          // Set hours to 0,0,0,0 for todayDate and otherDayDate
          todayDate.value.setUTCHours(0, 0, 0, 0); // we use this because this enables us to set the assignment and today date === to each other, and not using the time as a comparison
          otherDayDate.value.setUTCHours(0, 0, 0, 0);

          studentCourses.value = data.student_courses.map((course: course) => {
            //define an assignments object for each course
            const assignments = reactive<ClassPreviewAssignments>({
              today: [],
              otherDay: [],
            });

            course.assignments.forEach((assignment: assignmentDetails) => {
              const assignmentDate = new Date(assignment.datetime_due);
              assignmentDate.setUTCHours(0, 0, 0, 0); // set the time to 00:00:00

              const assignmentData = {
                id: assignment.id,
                name: assignment.name,
                date: assignment.datetime_due,
                qLeft: 0, //mock data
                timeLeft: 0, //mock data
                question: {
                  qText: "Mock question text",
                  answers: [
                    "Mock answer 1",
                    "Mock answer 2",
                    "Mock answer 3",
                    "Mock answer 4",
                  ],
                },
              };

              if (+assignmentDate === +todayDate.value) {
                assignments.today.push(assignmentData);
              } else if (+assignmentDate === +otherDayDate.value) {
                assignments.otherDay.push(assignmentData);
              }
            });

            return {
              information: {
                title: course.name,
                teacher: course.teacher,
                classCode: course.class_code,
                id: course.id,
              },
              assignments,
            };
          });

          console.log(studentCourses.value);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const $userLogout = async () => {
    try {
      const response = await fetch(`${config.public.API_URL}/api/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.value}`,
        },
        body: JSON.stringify({
          refresh: refresh_token.value,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          loggedIn.value = false;
          email.value = "";
          username.value = "";
          fullname.value = "";
          access_token.value = "";
          refresh_token.value = "";
          user_type.value = "";
          sessionStorage.removeItem("session");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const $savePersistentSession = () => {
    const persistentData = JSON.stringify({
      email: email.value,
      refresh_token: refresh_token.value,
      access_token: access_token.value,
      user_type: user_type.value,
      fullname: fullname.value,
    });
    sessionStorage.setItem("session", persistentData);
    console.log("Session saved");
  };

  function $logout() {
    (email.value = ""),
      (username.value = ""),
      (fullname.value = ""),
      (loggedIn.value = false);
    useRouter().push("/login");
  }

  return {
    email,
    username,
    fullname,
    access_token,
    refresh_token,
    studentCourses,
    // todayDate and otherDayDate are excluded
    user_type,
    $logout,
    loggedIn,
    $userLogin,
    $userLogout,
    $getUserCredentials,
    $getStudentCourses,
    $savePersistentSession,
  };
});
