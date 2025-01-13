import { TeacherCourse } from "~/utils/types";

type Body = {
  name: string;
  period: number;
  subject: number;
};

export default defineEventHandler(async (event): Promise<TeacherCourse> => {
  setHeader(event, "Access-Control-Allow-Methods", "POST");

  const body = (await readBody(event)) as Body | undefined;
  if (!body) throw createError({ statusCode: 400 });

  // TODO does it return just this or everything else in TeacherCourse
  return {
    id: 5,
    joinCode: "a"
  };
});
