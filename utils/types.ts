export interface Question {
  /** @readonly What the question says. */
  text: string;
  /** @readonly The type of answer for the question. */
  answerType: "Multiple Choice" | "Written Response" | "True or False";
  /** @readonly Array of answers. */
  answers: {
    /** @readonly ID of the answer. */
    id: number;
    /** @readonly What the answer choice says. */
    text: string;
    /**
     * Used to store which answer the student selected.
     * @warning Must be manually added to `Question`; this field is not returned from the API.
     */
    selected: boolean;
  }[];
}

export interface QuestionInterface {
  /** @readonly ID of the question. */
  id: number;
  /** @readonly Number of attempts allowed.
   *
   * If `null`, there is no limit.
   */
  questionsRemaining: number;
  /** Number of remaining attempts. */
  remainingAttempts: number | null;
  /** @readonly Question data */
  question: Question;
}

export interface StudentAssignmentInstance {
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
}

export interface CreateCourse {
  id: number;
  joinCode: string;
}

export interface TeacherStudentList {
  /** @readonly UID of the student. */
  id: number;
  /** @readonly First name of the student. */
  firstName: string;
  /** @readonly Last name of the student. */
  lastName: string;
  /** @readonly Email of the student. */
  email: string;
}

interface Assignment {
  /** @readonly ID of the question. */
  id: number;
}

export interface StudentAssignment extends Assignment {
  /** @readonly Date object of when the assignment was submitted. */
  dateSubmitted: Date | null;

  /** @readonly Number of questions completed. */
  questionsCompleted: number;

  /** @readonly Number of correct questions in the assignment */
  questionsCorrect: number;

  /** @readonly assignment object for assignment properties. */

  assignment: {
    /** @readonly Name of the assignment. */
    name: string;

    /** @readonly Number of questions in the assignment */
    numOfQuestions: number;

    /** @readonly Whether or not the assignment can be turned in late. */
    lateSubmissions: boolean;

    /** @readonly Date object of when the assignment is due. */
    dueDate: Date;

    /** @readonly Date object of when the assignment was assigned. */
    dateAssigned: Date;

    /** @readonly Object identifying the course assignment belongs to. */
    course?: {
      /** @readonly Id of the course assignment belongs to */
      id: number;
      /** @readonly Name of the course assignment belongs to */
      name: string;
      subject: Subjects;
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
  name: string;

  /** @readonly Date the assignment was submitted */
  dateAssigned: Date;

  /** @readonly Date the assignment is due */
  dueDate: Date;

  /** @readonly Number of questions in the assignment */
  numOfQuestions: number;

  /** @readonly Whether or not the assignment can be turned in late. */
  lateSubmissions: boolean;

  /** @readonly Number of questions submitted */
  numSubmitted: number;
}

interface Course {
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
  /** @readonly Subject of the course. */
  subject: Subjects;
}

export interface StudentCourse extends Course {
  assignments: StudentAssignment[];
}

export interface TeacherCourseNoAssignment extends Course {
  /** @readonly 6-digit join code for the course. */
  joinCode: string;
  /** @readonly The number of students in the course. */
  numOfStudents: number;
  /** Total number of unsubmitted, future assignments. */
  assignmentsLength: number;
}

export interface TeacherCourse extends TeacherCourseNoAssignment {
  assignments: TeacherAssignment[];
}

export interface AssignmentInstance {
  /** @readonly ID of the assignment instance. */
  assignment: number;
  /** @readonly ID of the student. */
  student: number;
}

export interface SubmitAnswer {
  /** @readonly Tells you if the answer was correct. */
  isCorrect: boolean;
  /** @readonly Number of remaining attempts. */
  remainingAttempts: number;
}

export interface SubmitAssignment {
  /** @readonly Number of questions in the assignment. */
  numOfQuestions: number;
  /** @readonly Number of questions completed. */
  questionsCompleted: number;
  /** @readonly Number of questions correct. */
  questionsCorrect: number;
}

export interface AssignmentResults extends SubmitAssignment {
  /** @readonly An array of the question results. */
  questionInstances: {
    /** @readonly ID of the question. */
    id: number;
    /** @readonly Array of the user answers to the question. */
    userAnswers: string[];
    /** @readonly Tells if you if the question is complete. */
    isComplete: boolean;
    /** @readonly The data for the question referenced by the instance. */
    question: Question;
  }[];
}
