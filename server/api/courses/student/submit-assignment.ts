import { SubmitAssignment } from "~/utils/types";

interface Body {
  id: number;
}

export default defineEventHandler(async (event): Promise<SubmitAssignment> => {
  setHeader(event, "Access-Control-Allow-Methods", "POST");

  const body = (await readBody(event)) as Body;
  if (!body?.id) throw createError({ statusCode: 400 });

  return {
    numOfQuestions: 4,
    questionsCompleted: 2,
    questionsCorrect: 0
  };
});
