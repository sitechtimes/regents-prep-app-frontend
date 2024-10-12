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
    anwswers: {
      /** @readonly ID of the answer. */
      id: number;
      /** @readonly What the answer choice says. */
      text: string;
      /** Whether or not the user has the answer selected. */
      selected: boolean;
    }[];
  };
};

/** Used for the dashboard view of assignments, before the assignment is loaded. */
export type StudentAssignmentOverview = {
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
  /** @readonly Number of questions completed in the assignment. */
  questionsCompleted: number;
  /** Date object of when the assignment was submitted. */
  submitted: Date | null;
};

/** Used for the dashboard view of assignments, before the assignment is loaded. */
export type TeacherAssignmentOverview = {
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
  /** @readonly Alphanumeric code of the course found on Google Classroom.
   * @example "PPS72_13"
   */
  classCode: string;
  /** @readonly Array of the 3 soonest assignments that are due for the course. */
  assignments: StudentAssignmentOverview[];
};

export type TeacherCourseInfo = {
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
  /** Alphanumeric code of the course found on Google Classroom.
   * @example "PPS72_13"
   */
  classCode: string;
};
