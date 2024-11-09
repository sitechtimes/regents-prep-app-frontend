import { StudentAssignment, TeacherAssignment } from "~/utils/types";

export default defineEventHandler((event): (StudentAssignment | TeacherAssignment)[] => {
  const courseId = Number(getRouterParam(event, "courseId"));

  const assignments: Record<number, (StudentAssignment | TeacherAssignment)[]> = {
    1: [
      {
        id: 420,
        name: "Power Rule practice",
        dateAssigned: new Date(),
        dueDate: new Date(),
        numOfQuestions: 5,
        lateSubmissions: false,
        instanceInfo: {
          questionsCompleted: 3,
          questionsCorrect: 3,
          dateSubmitted: null
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

  return assignments[courseId];
});
