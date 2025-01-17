import { QuestionInterface } from "~/utils/types";

interface Body {
  id: number;
}

export default defineEventHandler(async (event): Promise<QuestionInterface> => {
  setHeader(event, "Access-Control-Allow-Methods", "POST");

  const body = (await readBody(event)) as Body;
  if (!body?.id) throw createError({ statusCode: 400 });

  // TODO whats the real QuestionInterface
  return {
    id: body.id,
    answerAttemptsUsed: 2,
    question: {
      text: "",
      answerType: "",
      answers: []
    }
  } as QuestionInterface;
});
