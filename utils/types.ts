export type Question = {
  /** @readonly ID of the question. */
  id: number;
  /** @readonly Number of attempts allowed.
   *
   * If `null`, there is no limit.
   */
  totalAttempts: number | null;
  /** Number of remaining attempts. */
  remainingAttempts: number | null;
  /** @readonly Question data */
  question: {
    /** @readonly What the question says. */
    text: string;
    /** Array of answers. */
    answers: {
      /** @readonly ID of the answer. */
      id: number;
      /** @readonly What the answer choice says. */
      text: string;
      /** Whether or not the user has the answer selected. */
      selected: boolean;
    }[];
  };
};

export type StudentAssignmentInstance = {
  /** @readonly ID of the assignment instance. */
  id: number;
  /** @readonly Number of questions in the assignment. */
  questionsLength: number;
  /** Number of questions completed. */
  questionsCompleted: number;
  /** Number of questions correct. */
  questionsCorrect: number;
  /** Date object of when the assignment was submitted. */
  submitted: Date | null;
};

/** Used for the dashboard view of assignments, before the assignment is loaded. */
export type StudentAssignmentOverview = {
  /** @readonly */
  type: "student";
  /** @readonly ID of the assignment. */
  id: number;
  /** @readonly Name of the assignment. */
  name: string;
  /** @readonly Date object of when the assignment was assigned. */
  assigned: Date;
  /** @readonly Date object of when the assignment is due. */
  due: Date;
  /** @readonly Number of questions in the assignment. */
  questionsLength: number;
  /** @readonly Whether or not the assignment can be turned in late. */
  allowLate: boolean;
  /** Number of questions completed in the assignment. */
  questionsCompleted: number;
  /** Number of questions correct in the assignment. */
  questionsCorrect: number | null;
  /** Date object of when the assignment was submitted. */
  submitted: Date | null;
};

/** Used for the dashboard view of assignments, before the assignment is loaded. */
export type TeacherAssignmentOverview = {
  /** @readonly */
  type: "teacher";
  /** @readonly ID of the assignment. */
  id: number;
  /** @readonly Name of the assignment. */
  name: string;
  /** @readonly Date object of when the assignment was assigned. */
  assigned: Date;
  /** @readonly Date object of when the assignment is due. */
  due: Date;
  /** @readonly Number of questions in the assignment. */
  questionsLength: number;
  /** @readonly Whether or not the assignment can be turned in late. */
  allowLate: boolean;
};

export type TeacherStudentList = {
  /** @readonly UID of the student. */
  uid: number;
  /** @readonly Name of the student. */
  name: string;
  /** @readonly Email of the student. */
  email: string;
};

export type StudentCourseInfo = {
  /** @readonly */
  type: "student";
  /** @readonly ID of the course. */
  id: number;
  /** @readonly Name of the course. */
  name: string;
  /** @readonly Name of the teacher in First Name Last Name format.
   * @example "Michael Whalen"
   */
  teacher: string;
  /** @readonly Period of the course. */
  period: number;
  /** Subject of the course. */
  subject: "Math" | "English" | "Science" | "History" | "Russian";
  /** @readonly Array of the 3 soonest assignments that are due for the course. */
  assignments: StudentAssignmentOverview[];
};

export type TeacherCourseInfo = {
  /** @readonly */
  type: "teacher";
  /** @readonly ID of the course. */
  id: number;
  /** @readonly Name of the course. */
  name: string;
  /** Name of the teacher in First Name Last Name format.
   * @example "Michael Whalen"
   */
  teacher: string;
  /** Period of the course. */
  period: number;
  /** Subject of the course. */
  subject: "Math" | "English" | "Science" | "History" | "Russian";
  /** 6-digit join code for the course. */
  joinCode: string;
  /** @readonly Array of the 3 soonest assignments that are due for the course. */
  assignments: TeacherAssignmentOverview[];
};
