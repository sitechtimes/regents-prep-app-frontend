export interface Answer {
  /** @readonly ID of the answer. */
  id: number;
  /** @readonly What the answer choice says (HTML string). */
  text: string;
  /** Used to store which answer the student selected.
   * @warning Must be manually added to `Answer`; this field is not returned from the API.
   */
  selected: boolean;
  /** @readonly ID of the selected answer.
   * @warning only present for static questions.
   */
  selectedAnswerId: number | null;
}

export interface Question {
  /** @readonly What the question says (HTML string). */
  text: string;
  /** @readonly The type of answer for the question. */
  answerType: "Multiple Choice" | "Written Response" | "True or False";
  /** @readonly Array of answers. */
  answers: Answer[];
}

interface QuestionInterface {
  /** @readonly ID of the question interface. */
  id: number;
  question: Question;
  selectedAnswerId: number | null;
}

export interface DynamicQuestionInterface extends QuestionInterface {
  /** Number of attempts used on this dynamic question. */
  answerAttemptsUsed: number;
}

export interface StaticQuestionInterface extends QuestionInterface {
  /** Index of the question.
   * @warning Only present if questionIndex was not passed in the URL.
   * @warning Starts at 1, with 0 indicating an unknown index.
   */
  questionIndex: number;
}

export interface TopicQuestionInterface {
  id: number;
  /** @readonly What the answer choice says (HTML string). */
  text: string;
  answerType: "Multiple Choice" | "Written Response" | "True or False";
  difficulty: number;
  answers: {
    id: number;
    /** @readonly What the answer choice says (HTML string). */
    text: string;
    isCorrect: boolean;
  }[];
  correctFirstAttempts: number;
  totalFirstAttempts: number;
}

/** @template T - Whether the `guaranteedQuestions` field should be an array of `Question` objects or an array of question IDs */
export interface TeacherAssignmentStatistic<T extends boolean> {
  statisticsData: {
    /** ID of the assignment instance */
    assignmentInstance: number;
    /** ID of the question */
    question: number;
    /** User answers for the entire assignment */
    userAnswers: number[];
    /** Time spent on the assignment, in seconds */
    timeSpent: number;
  };
  /** Array of guaranteed questions if `T` is true, question IDs if false */
  guaranteedQuestions: T extends true ? Question[] : number[];
}

export interface Topic {
  id: number;
  name: string;
  hasChildren: boolean;
  hasQuestions: boolean;
}
export interface TopicMapped extends Topic {
  /** IDs of child topics */
  children: number[] | null;
  questionIds: number[];
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
    numQuestions: number;

    /** @readonly Whether or not the assignment can be turned in late. */
    lateSubmissions: boolean;

    /** @readonly Date object of when the assignment is due (Date(UTC)). */
    dueDate: Date;

    /** @readonly Date object of when the assignment was assigned (Date(UTC)). */
    dateAssigned: Date;

    /** @readonly If the assignment is a static assignment.*/
    isStatic: boolean;

    /** @readonly Object identifying the course assignment belongs to. */
    course?: {
      /** @readonly Id of the course assignment belongs to */
      id: number;
      /** @readonly Name of the course assignment belongs to */
      name: string;
      subject: Subject;
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

  /** @readonly Date the assignment was submitted (Date(UTC)) */
  dateAssigned: Date;

  /** @readonly Date the assignment is due (Date(UTC)) */
  dueDate: Date;

  /** @readonly Number of questions in the assignment */
  numQuestions: number;

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
  subject: Subject;
}

export interface StudentCourse extends Course {
  assignments: StudentAssignment[];
}

export interface TeacherCourseNoAssignment extends Course {
  /** @readonly 6-digit join code for the course. */
  joinCode: string;
  /** @readonly The number of students in the course. */
  numStudents: number;
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
  numQuestions: number;
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

export interface CreateAssignmentQuestion {
  questionId: number;
  isGuaranteed: boolean;
}
