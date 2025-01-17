import { SubmitAnswer } from "~/utils/types";

interface Body {
  questionInstanceID: number;
  answerID: number;
}

export default defineEventHandler(async (event): Promise<SubmitAnswer> => {
  setHeader(event, "Access-Control-Allow-Methods", "POST");

  const body = (await readBody(event)) as Body;
  if (!body?.questionInstanceID || !body.answerID) throw createError({ statusCode: 400 });

  // TODO is it isCorrect or answerCorrect
  return {
    isCorrect: true,
    remainingAttempts: 6
  };
});
