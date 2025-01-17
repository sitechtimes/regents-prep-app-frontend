import { TeacherStudentList } from "~/utils/types";

export default defineEventHandler((): TeacherStudentList[] => {
  return [
    {
      id: 5,
      firstName: "Wichael",
      lastName: "Mhalen",
      email: "wikemhalen@schools.nyc.gov"
    }
  ];
});
