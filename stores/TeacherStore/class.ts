import { defineStore } from "pinia";
import { studentAssignments } from "~/interfaces/interfaces";
import { userState } from "../users";

export const TeacheruserClass = defineStore("class", () => {
  const className = ref<string>("");
  const classCode = ref<string>("");
  const assignmentStatus = ref<string>("");
  const assignments = ref<Array<studentAssignments>>([]);
  const courseId = ref<number>(0);
  const dateNow = ref<Date>(
    new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate()
      )
    )
  );
  const config = useRuntimeConfig();
  const link = ref<string>("http://127.0.0.1:8000");
  const $getTeacherDashboard = async () => {
    try {
      const response = await fetch(`/api/courses/teacher/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userState().access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const teacherDashboard = {
            username: data.username,
            user_type: data.user_type,
            teacher_courses: data.teacher_courses.map(
              (course: { id: boolean; name: string; course_code: string }) => {
                return {
                  id: course.id,
                  name: course.name,
                  course_code: course.course_code,
                };
              }
            ),
          };
          console.log("Teacher Dashboard:", teacherDashboard);
          teacherDashboard.teacher_courses.forEach((course) => {
            console.log(`Course: ${course.name} (Code: ${course.course_code})`);
          });
          if (teacherDashboard.teacher_courses.length === 0) {
            console.log("No courses found for the teacher.");
          }
          return teacherDashboard;
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const $getTeacherAssignments = async (courseId: number) => {
    try {
      const response = await fetch(
        `${link.value}/api/courses/${courseId}/assignments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userState().access_token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const teacherAssignments = data.map((assignment) => {
            return {
              id: assignment.id,
              name: assignment.name,
              datetime_assigned: assignment.datetime_assigned,
              datetime_due: assignment.datetime_due,
              question_number: assignment.question_number,
              time_allotted: assignment.time_allotted,
            };
          });
          console.log("Teacher Assignments:", teacherAssignments);
          return teacherAssignments;
        });
    } catch (error) {
      console.log(error);
    }
  };
  const $getCourseStudentList = async (courseId: number) => {
    try {
      const response = await fetch(`${link.value}/api/courses/${courseId}/teacher/student-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userState().access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const studentList = data.map((student) => {
            return {
              id: student.id,
              name: student.name,
              email: student.email,
            };
          });
            console.log("Course Student List:", studentList);
  
          return studentList;
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  return {
    className,
    classCode,
    assignmentStatus,
    assignments,
    courseId,
    dateNow,
    $getTeacherDashboard,
    $getTeacherAssignments,
    $getCourseStudentList,
  };
});
