import { AssignmentResults } from "~/utils/types";

export default defineEventHandler((): AssignmentResults => {
  return {
    numOfQuestions: 4,
    questionsCompleted: 2,
    questionsCorrect: 0,
    questionInstances: [
      {
        id: 5,
        userAnswers: [],
        isComplete: true,
        answerAttemptCount: 2,
        question: {
          text: "Where was Bogdan on January 6th?",
          answerType: "Multiple Choice",
          answers: [
            {
              id: 3,
              text: "Who knows"
            }
          ]
        }
      }
    ]
  };
});
