import { newStudentAssignment, newTeacherAssignment } from "~/utils/types";

export default defineEventHandler((event): (newStudentAssignment | newTeacherAssignment)[] => {
  const courseId = Number(getRouterParam(event, "courseId"));

  const assignments: Record<number, (newStudentAssignment | newTeacherAssignment)[]> = {
    1: [
      {
        id: 420,
        dateSubmitted: new Date(),
        questionsCompleted: 3,
        assignment: {
          name: "Power Rule practice",
          numOfQuestions: 5,
          lateSubmissions: false,
          dueDate: new Date(),
          dateAssigned: new Date()
        }
      }
    ] as newStudentAssignment[],

    2: [
      {
        id: 420,
        name: "Power Rule practice",
        dateAssigned: new Date(),
        dueDate: new Date(new Date().getTime() + 86_400_000),
        numOfQuestions: 5,
        lateSubmissions: false,
        numSubmitted: 0
      }
    ] as newTeacherAssignment[],

    3: [
      {
        id: 420,
        name: "Power Rule practice",
        dateAssigned: new Date(),
        dueDate: new Date(new Date().getTime() - 86_400_000),
        numOfQuestions: 5,
        lateSubmissions: false,
        numSubmitted: 0
      }
    ] as newTeacherAssignment[],

    99: []
  };
  return assignments[courseId];
});
