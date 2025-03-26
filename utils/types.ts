export interface Answer {
  /** @readonly ID of the answer. */
  id: number;
  /** @readonly What the answer choice says (HTML string). */
  text: string;
  /**
   * Used to store which answer the student selected.
   * @warning Must be manually added to `Question`; this field is not returned from the API.
   */
  selected: boolean;
  /** @readonly Selected answer. */
  staticUserAnswer: number | null;
  /** @readonly Whether or not the answer is correct. */
  isCorrect: boolean;
}

export interface Question {
  /** @readonly What the question says (HTML string). */
  readonly text: string;
  /** @readonly The type of answer for the question. */
  readonly answerType: "Multiple Choice" | "Written Response" | "True or False";
  /** @readonly Array of answers. */
  answers: Answer[];
}

export interface QuestionInterface {
  /** @readonly ID of the question. */
  id: number;
  /** @readonly Selected answer. */
  staticUserAnswer: number | null;
  /** @readonly Number of attempts allowed.
   *
   * If `null`, there is no limit.
   */
  questionsRemaining: number;
  /** Number of remaining attempts. */
  remainingAttempts: number | null;
  /** @readonly Question data */
  readonly question: Question;
}

export interface CreateCourse {
  id: number;
  joinCode: string;
}

export interface TeacherStudentList {
  /** @readonly UID of the student. */
  readonly id: number;
  /** @readonly First name of the student. */
  readonly firstName: string;
  /** @readonly Last name of the student. */
  readonly lastName: string;
  /** @readonly Email of the student. */
  readonly email: string;
}

interface Assignment {
  /** @readonly ID of the question. */
  readonly id: number;
}

export interface StudentAssignment extends Assignment {
  /** @readonly Date object of when the assignment was submitted. */
  readonly dateSubmitted: Date | null;

  /** Number of questions completed. */
  questionsCompleted: number;

  /** Number of correct questions in the assignment */
  questionsCorrect: number;

  /** @readonly assignment object for assignment properties. */

  assignment: {
    /** @readonly Name of the assignment. */
    readonly name: string;

    /** @readonly Number of questions in the assignment */
    readonly numQuestions: number;

    /** @readonly Whether or not the assignment can be turned in late. */
    lateSubmissions: boolean;

    /**Date object of when the assignment is due (Date(UTC)). */
    dueDate: Date;

    /** @readonly Date object of when the assignment was assigned (Date(UTC)). */
    readonly dateAssigned: Date;

    /** @readonly If the assignment is a static assignment.*/
    isStatic: boolean;

    /** @readonly Object identifying the course assignment belongs to. */
    readonly course?: {
      /** @readonly Id of the course assignment belongs to */
      readonly id: number;
      /** @readonly Name of the course assignment belongs to */
      readonly name: string;
      readonly subject: Subjects;
    };

    /**
     * Used to store already-fetched `QuestionInterface`s for easy access when going back and forth.
     *
     * Each key is the index of the question in the assignment.
     * @warning Must be manually added to `StudentAssignment`; this field is not returned from the API.
     * @warning **Questions at certain indices may not exist yet**; the question must be fetched from the API first before being added.
     */
    questionInterfaces: Record<number, QuestionInterface>;
  };
}

export interface TeacherAssignment extends Assignment {
  /** @readonly Name of the assignment. */
  readonly name: string;

  /** @readonly Date the assignment was submitted (Date(UTC)) */
  readonly dateAssigned: Date;

  /** Date the assignment is due (Date(UTC)) */
  dueDate: Date;

  /** @readonly Number of questions in the assignment */
  readonly numQuestions: number;

  /** @readonly Whether or not the assignment can be turned in late. */
  readonly lateSubmissions: boolean;

  /** @readonly Number of questions submitted */
  readonly numSubmitted: number;
}

interface Course {
  /** @readonly ID of the course. */
  readonly id: number;
  /** @readonly Name of the course. */
  readonly name: string;
  /** @readonly Name of the teacher in First Name Last Name format.
   * @example "Michael Whalen"
   */
  readonly teacher: string;
  /** @readonly Period of the course. */
  readonly period: number;
  /** @readonly Subject of the course. */
  readonly subject: Subjects;
}

export interface StudentCourse extends Course {
  assignments: StudentAssignment[];
}

export interface TeacherCourseNoAssignment extends Course {
  /** @readonly 6-digit join code for the course. */
  readonly joinCode: string;
  /** The number of students in the course. */
  numStudents: number;
  /** Total number of unsubmitted, future assignments. */
  assignmentsLength: number;
}

export interface TeacherCourse extends TeacherCourseNoAssignment {
  assignments: TeacherAssignment[];
}

export interface AssignmentInstance {
  /** @readonly ID of the assignment instance. */
  readonly assignment: number;
  /** @readonly ID of the student. */
  readonly student: number;
}

export interface SubmitAnswer {
  /** @readonly Tells you if the answer was correct. */
  readonly isCorrect: boolean;
  /** Number of remaining attempts. */
  remainingAttempts: number;
}

export interface SubmitAssignment {
  /** @readonly Number of questions in the assignment. */
  readonly numQuestions: number;
  /** Number of questions completed. */
  questionsCompleted: number;
  /** Number of questions correct. */
  questionsCorrect: number;
}

export interface AssignmentResults extends SubmitAssignment {
  /** @readonly An array of the question results. */
  readonly questionInstances: {
    /** @readonly ID of the question. */
    id: number;
    /** @readonly The data for the question referenced by the instance. */
    question: Question;
    /** Array of dynamic user answers (IDs of selected answers). */
    dynamicUserAnswers: number[];
    /** @readonly Tells if the question is complete. */
    isComplete: boolean;
    /** @readonly Time spent on the question (in seconds). */
    timeSpent: number;
  }[];
}
