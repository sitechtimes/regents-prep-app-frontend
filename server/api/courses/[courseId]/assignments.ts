import { StudentAssignment, TeacherAssignment } from "~/utils/types";

export default defineEventHandler((event): (StudentAssignment | TeacherAssignment)[] | (StudentAssignment | TeacherAssignment)[][] => {
  const courseId = Number(getRouterParam(event, "courseId"));

  const assignments: Record<number, (StudentAssignment | TeacherAssignment)[]> = {
    1: [
      {
        id: 420,
        dateSubmitted: new Date(),
        questionsCompleted: 3,
        questionsCorrect: 2,
        assignment: {
          name: "Power Rule practice",
          numOfQuestions: 5,
          lateSubmissions: false,
          dueDate: new Date(),
          dateAssigned: new Date()
        }
      }
    ] as StudentAssignment[],

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
    ] as TeacherAssignment[],

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
    ] as TeacherAssignment[],

    99: []
  };

  if (courseId === 0) return Object.values(assignments);
  return assignments[courseId];
});
