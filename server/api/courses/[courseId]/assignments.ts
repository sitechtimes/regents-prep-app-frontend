import { StudentAssignment, TeacherAssignment } from "~/utils/types";

export default defineEventHandler((event): (StudentAssignment | TeacherAssignment)[] => {
  const courseId = Number(getRouterParam(event, "courseId"));

  const assignments = {
    studentCardsExist: {
      id: 420,
      name: "Power Rule practice",
      dateAssigned: new Date(),
      dueDate: new Date(),
      numOfQuestions: 5,
      lateSubmissions: false,
      instanceInfo: {
        questionsCompleted: 3,
        questionsCorrect: 3,
        dateSubmitted: null
      }
    } as StudentAssignment,

    teacherCurrentExist: {
      id: 420,
      name: "Power Rule practice",
      dateAssigned: new Date(),
      dueDate: new Date(new Date().getTime() + 86_400_000),
      numOfQuestions: 5,
      lateSubmissions: false,
      numSubmitted: 0
    } as TeacherAssignment,

    teacherPastExist: {
      id: 420,
      name: "Power Rule practice",
      dateAssigned: new Date(),
      dueDate: new Date(new Date().getTime() - 86_400_000),
      numOfQuestions: 5,
      lateSubmissions: false,
      numSubmitted: 0
    } as TeacherAssignment
  };

  if (courseId == 1) return [assignments["studentCardsExist"]];
  else if (courseId == 2) return [assignments["teacherCurrentExist"]];
  else if (courseId == 3) return [assignments["teacherPastExist"]];
  else return [];
});
