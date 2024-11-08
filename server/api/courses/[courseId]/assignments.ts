import { StudentAssignment } from "~/utils/types";

export default defineEventHandler((event): StudentAssignment[] => {
  const courseId = Number(getRouterParam(event, "courseId"));

  if (courseId == 1)
    return [
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
    ];
  else return [];
});
