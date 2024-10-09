import { defineStore } from "pinia";
import { studentAssignments } from "~/interfaces/interfaces";
import { userState } from "../users";

export const studentUserClass = defineStore("class", () => {
  const className = ref<string>("");
  const classCode = ref<string>("");
  const id = ref<number>();
  const assignmentStatus = ref<string>("");
  const assignments = ref<Array<studentAssignments>>([]);
  const currentAssignments = ref<Array<studentAssignments>>([]);
  const pastAssignments = ref<Array<studentAssignments>>([]);
  const tempSelectedAssignment = ref<studentAssignments>();
  const courseId = ref<number>(0);
  const dateNow = ref<Date>(
    new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()))
  );
  const config = useRuntimeConfig();
  const link = ref<string>("http://127.0.0.1:8000");

  const $getCourseAssignments = async (courseId: number) => {
    try {
      const response = await fetch(`${link.value}/api/courses/${courseId}/assignments/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userState().access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          assignments.value = data.map((assignment: studentAssignments) => {
            return {
              id: assignment.id,
              name: assignment.name,
              datetime_due: assignment.datetime_due,
              question_number: assignment.question_number,
              timer_style: assignment.timer_style,
              time_allotted: assignment.time_allotted,
              attempts_allowed: assignment.attempts_allowed,
              questions_completed: assignment.questions_completed,
            };
          });

          currentAssignments.value = assignments.value.filter((assignment: studentAssignments) => {
            return new Date(assignment.datetime_due).getTime() >= dateNow.value.getTime();
          });

          pastAssignments.value = assignments.value.filter((assignment: studentAssignments) => {
            return new Date(assignment.datetime_due).getTime() < dateNow.value.getTime();
          });
          const currentDate = new Date();
          const pastDueAssignments = assignments.value.filter((assignment: studentAssignments) => {
            const dueDate = new Date(assignment.datetime_due);
            return assignment.questions_completed < assignment.question_number && dueDate < currentDate;
          });
          const doneAssignments = assignments.value.filter((assignment: studentAssignments) => {
            const dueDate = new Date(assignment.datetime_due);
            return assignment.questions_completed === assignment.question_number && dueDate > currentDate;
          });
          if (pastDueAssignments.length > 0) {
            console.log("The following assignments are missing:");
            pastDueAssignments.forEach((assignment) => {
              console.log(`- ${assignment.name}`);
            });
          } else {
            console.log("No missing assignments.");
          }
          if (doneAssignments.length > 0) {
            console.log("The following assignments are completed:");
            doneAssignments.forEach((assignment) => {
              console.log(` - ${assignment.name}`);
            });
          }
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
    id.value = 0;
    assignments.value = [];
    currentAssignments.value = [];
    pastAssignments.value = [];
  }
  const $resetAssignment = () => {
    tempSelectedAssignment.value = undefined;
  };

  return {
    className,
    classCode,
    assignmentStatus,
    currentAssignments,
    pastAssignments,
    courseId,
    dateNow,
    tempSelectedAssignment,
    id,
    $reset,
    $getCourseAssignments,
    $getCourseId,
    $resetAssignment,
  };
});
