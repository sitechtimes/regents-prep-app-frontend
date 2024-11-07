import { StudentAssignment } from "~/utils/types";

export default defineEventHandler((event) => {
  return [
    {
      id: 5,
      name: "Cool Assignment",
      dateAssigned: new Date(),
      dueDate: new Date(),
      numOfQuestions: 9,
      lateSubmissions: true,
      instanceInfo: {
        questionsCompleted: 6,
        dateSubmitted: null
      }
    }
  ] as StudentAssignment[];
});
