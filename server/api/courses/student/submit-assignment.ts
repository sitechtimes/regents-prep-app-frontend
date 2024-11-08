import { SubmitAssignment } from "~/utils/types";

type Body = {
  id: number;
};

export default defineEventHandler(async (event) => {
  setHeader(event, "Access-Control-Allow-Methods", "POST");

  const body = (await readBody(event)) as Body | undefined;
  if (!body || !body.id) throw createError({ statusCode: 400 });

  return {
    numOfQuestions: 4,
    questionsCompleted: 2,
    questionsCorrect: 0
  } as SubmitAssignment;
});
