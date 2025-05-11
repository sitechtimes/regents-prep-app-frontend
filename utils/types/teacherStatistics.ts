interface TeacherAssignmentStatisticData {
  /** ID of the assignment instance */
  assignmentInstance: number;
  /** ID of the question */
  question: number;
  /** Time spent on the assignment, in seconds */
  timeSpent: number;
}
/** @template T - Whether the `guaranteedQuestions` field should be an array of `Question` objects or an array of question IDs */
interface TeacherAssignmentStatistic<T extends boolean> {
  statisticsData: TeacherAssignmentStatisticData;
  /** Array of guaranteed questions if `T` is true, question IDs if false */
  guaranteedQuestions: T extends true ? Question[] : number[];
}
export interface DynamicTeacherAssignmentStatistic<T extends boolean = true> extends TeacherAssignmentStatistic<T> {
  statisticsData: TeacherAssignmentStatisticData & {
    /** Array of answer IDs that represent the user's answers for the question */
    dynamicUserAnswers: number[];
  };
}
export interface StaticTeacherAssignmentStatistic<T extends boolean = true> extends TeacherAssignmentStatistic<T> {
  statisticsData: TeacherAssignmentStatisticData & {
    /** Answer ID */
    staticUserAnswer: number;
  };
}

interface IndividualStudentStatistic<T extends boolean> {
  /** ID of the assignment instance */
  assignmentInstance: number;
  /** Measured in seconds */
  timeSpent: number;
  /** Array of questions if `T` is true, question IDs if false */
  question: T extends true ? TopicQuestionInterface : number;
}
export interface DynamicIndividualStudentStatistic<T extends boolean = true> extends IndividualStudentStatistic<T> {
  /** Array of answer IDs that represent the user's answers for the question */
  dynamicUserAnswers: number[];
}
export interface StaticIndividualStudentStatistic<T extends boolean = true> extends IndividualStudentStatistic<T> {
  staticUserAnswer: number;
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
    readonly id: number;
    /** @readonly The data for the question referenced by the instance. */
    readonly question: Question;
    /** @readonly Array of dynamic user answers (IDs of selected answers). */
    readonly dynamicUserAnswers: number[] | null;
    /** @readonly The ID of the chosen answer if the assignment is static.*/
    readonly staticUserAnswer: number | null;
    /** @readonly Tells if the question is complete. */
    readonly isComplete: boolean;
    /** @readonly Time spent on the question (in seconds). */
    readonly timeSpent: number;
  }[];
}
