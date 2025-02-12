export interface Question {
  /** @readonly What the question says (HTML string). */
  text: string;
  /** @readonly The type of answer for the question. */
  answerType: "Multiple Choice" | "Written Response" | "True or False";
  /** @readonly Array of answers. */
  answers: {
    /** @readonly ID of the answer. */
    id: number;
    /** @readonly What the answer choice says (HTML string). */
    text: string;
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
  question: Question[];
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
  /** @readonly Date object of when the assignment was submitted (Date() or null). */
  dateSubmitted: Date | null;

  /** @readonly Number of questions completed. */
  questionsCompleted: number;

  /** @readonly Number of correct questions in the assignment */
  questionsCorrect?: number;

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
      subject: "Math" | "English" | "Science" | "History" | "Russian";
    };
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
  subject: "Math" | "English" | "Science" | "History" | "Russian";
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
