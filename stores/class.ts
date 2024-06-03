import { defineStore } from "pinia";
import { studentAssignments } from "~/interfaces/interfaces";
import { userState } from "./users";

export const userClass = defineStore("class", () => {
  const className = ref<string>("");
  const classCode = ref<string>("");
  const assignments = ref<Array<studentAssignments>>([]);
  const currentAssignments = ref<Array<studentAssignments>>([]);
  const pastAssignments = ref<Array<studentAssignments>>([]);
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

  const $getCourseAssignments = async (courseId: number) => {
    try {
      const response = await fetch(
        `http://192.168.192.122:8000/api/courses/${courseId}/student/assignments/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              userState().access_token
            }`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          assignments.value = data.map(
            (assignment: studentAssignments) => {
              return {
                id: assignment.id,
                name: assignment.name,
                datetime_due: assignment.datetime_due,
                question_number: assignment.question_number,
                timer_style: assignment.timer_style,
                time_allotted: assignment.time_allotted,
                attempts_allowed:
                  assignment.attempts_allowed,
                questions_completed:
                  assignment.questions_completed,
              };
            }
          );

          currentAssignments.value =
            assignments.value.filter(
              (assignment: studentAssignments) => {
                return (
                  new Date(
                    assignment.datetime_due
                  ).getTime() >= dateNow.value.getTime()
                );
              }
            );

          pastAssignments.value = assignments.value.filter(
            (assignment: studentAssignments) => {
              return (
                new Date(
                  assignment.datetime_due
                ).getTime() < dateNow.value.getTime()
              );
            }
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  const $getCourseId = (id: number) => {
    courseId.value = id;
  };

  function $reset() {
    className.value = "";
    classCode.value = "";
    assignments.value = [];
    currentAssignments.value = [];
    pastAssignments.value = [];
  }

  return {
    className,
    classCode,
    currentAssignments,
    pastAssignments,
    courseId,
    dateNow,
    $reset,
    $getCourseAssignments,
    $getCourseId,
  };
});
