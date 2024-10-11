export type AnswerChoice = {
  /** ID of the answer choice. */
  id: number;
  /** What the answer choice says. */
  text: string;
  /** Whether or not the answer choice is correct. */
  correct: boolean;
};

export type Question = {
  /** ID of the question. */
  id: number;
  /** What the question says. */
  text: string;
  /** Number of points the question is worth, if any. */
  points: number | null;
  /** Number of attempts allowed.
   *
   * If `null`, there is no limit.
   */
  attempts: number | null;
  /** Array of answer choices. */
  answerChoices: AnswerChoice[];
};

export type Assignment = {
  /** Name of the assignment. */
  name: string;
  /** Timestamp, in seconds since epoch, of when the assignment was assigned. */
  started: number;
  /** Timestamp, in seconds since epoch, of when the assignment is due. */
  due: number;
  /** Whether or not the assignment can be turned in late. */
  late: boolean;
  /** Whether or not the assignment has been turned in. */
  turnedIn: boolean;
  /** Questions in the assignment. */
  questions: Question[];
};

export type CourseInfo = {
  /** Name of the course. */
  name: string;
  /** Name of the teacher. */
  teacher: string;
  /** Period of the course. */
  period: number;
  /** Alphanumeric code of the course found on Google Classroom.
   * @example "PPS72_13"
   */
  classCode: string;
  /** Array of assignments. */
  assignments: Assignment[];
};
