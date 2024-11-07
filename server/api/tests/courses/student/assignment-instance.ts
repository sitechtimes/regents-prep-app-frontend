import { AssignmentInstance } from "~/utils/types";

type Body = {
  id: number;
};

export default defineEventHandler(async (event) => {
  setHeader(event, "Access-Control-Allow-Methods", "POST");

  const body = (await readBody(event)) as Body | undefined;
  if (!body || !body.id) throw createError({ statusCode: 400 });

  return {
    assignment: 6,
    student: 9
  } as AssignmentInstance;
});
