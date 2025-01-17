import { QuestionInterface } from "~/utils/types";

export default defineEventHandler((): Promise<QuestionInterface> => {
  // TODO what interface is this
  return {
    name: "mhalen",
    courseID: 86,
    guaranteedQuestions: [1, 2],
    randomQuestions: [3, 4],
    dueDate: "2025-01-08",
    numOfQuestions: 2,
    timerStyle: 2,
    lateSubmissions: false,
    timeAllotted: 2,
    attemptsAllowed: 3
  };
});
