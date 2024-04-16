import { defineStore } from "pinia";
import Assignment from "~/components/TeacherComponents/assignment.vue";
import type { assignmentDetails, course } from "~/interfaces/interfaces";

export const userState = defineStore(
  "state",
  () => {
    const email = ref<string>("");
    const username = ref<string>("");
    const fullname = ref<string>("");
    const student = ref<boolean>(false); // temporary dev option
    const user_type = ref<string>("");
    const loggedIn = ref<boolean>(false);
    const studentCourses = ref<course[]>([]);
    const assignments = ref<assignmentDetails[]>([]);
    const access_token = ref<string>("");
    const refresh_token = ref<string>("");

    const $userLogin = async (email: string, password: string) => {
      try {
        let fullUserName = email;
        if (email.includes("@")) {
          fullUserName = email.split("@")[0];
        }
        const response = await fetch(`http://192.168.192.122:8000/api/token/`, {
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
        const response = await fetch(`http://192.168.192.122:8000/api/user/`, {
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
          `http://192.168.192.122:8000/api/courses/student/all/`,
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
            studentCourses.value = data.student_courses.map(
              (course: course) => {
                //define an assignments object for each course

                /*                        course.assignments.forEach(
                (assignment: assignmentDetails) => {
                  const assignmentData = {
                    id: assignment.id,
                    name: assignment.name,
                    due_date: assignment.due_date,
                  };

                  assignments.value.push(assignmentData);
                }
              );  */

                return {
                  id: course.id,
                  name: course.name,
                  teacher: course.teacher,
                  classCode: course.id,
                  assignments: course.assignments,
                };
              }
            );

            console.log(JSON.parse(JSON.stringify(studentCourses.value)));
          });
      } catch (error) {
        console.log(error);
      }
    };

    const $userLogout = async () => {
      try {
        const response = await fetch(
          `http://192.168.192.122:8000/api/logout/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token.value}`,
            },
            body: JSON.stringify({
              refresh: refresh_token.value,
            }),
          }
        )
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
      user_type,
      $logout,
      loggedIn,
      $userLogin,
      $userLogout,
      $getUserCredentials,
      $getStudentCourses,
      $savePersistentSession,
    };
  },
  { persist: true }
);
