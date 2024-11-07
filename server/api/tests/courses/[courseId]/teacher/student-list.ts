import { TeacherStudentList } from "~/utils/types";

export default defineEventHandler((event) => {
  return [
    {
      id: 5,
      firstName: "Wichael",
      lastName: "Mhalen",
      email: "wikemhalen@schools.nyc.gov"
    }
  ] as TeacherStudentList[];
});
