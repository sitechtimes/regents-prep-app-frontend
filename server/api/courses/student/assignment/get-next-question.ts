import { QuestionInterface } from "~/utils/types";

type Body = {
  id: number;
};

export default defineEventHandler(async (event): Promise<QuestionInterface> => {
  setHeader(event, "Access-Control-Allow-Methods", "POST");

  const body = (await readBody(event)) as Body | undefined;
  if (!body || !body.id) throw createError({ statusCode: 400 });

  return {
    id: body.id,
    questionsRemaining: 9,
    remainingAttempts: null,
    question: []
  };
});
