interface TeacherAssignmentStatisticData {
  /** ID of the assignment instance */
  assignmentInstance: number;
  /** ID of the question */
  question: number;
  /** Time spent on the assignment, in seconds */
  timeSpent: number;
}
export interface DynamicTeacherAssignmentStatisticData extends TeacherAssignmentStatisticData {
  /** Array of answer IDs that represent the user's answers for the question */
  dynamicUserAnswers: number[];
}
export interface StaticTeacherAssignmentStatisticData extends TeacherAssignmentStatisticData {
  /** Answer ID */
  staticUserAnswer: number;
}
/** @template T - Whether the `guaranteedQuestions` field should be an array of `Question` objects or an array of question IDs */
export interface TeacherAssignmentStatistic<T extends boolean = true> {
  /** Array of guaranteed questions if `T` is true, question IDs if false */
  guaranteedQuestions: T extends true ? TopicQuestionInterface[] : number[];
  statisticData: (DynamicTeacherAssignmentStatisticData | StaticTeacherAssignmentStatisticData)[];
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

export interface QuestionStat {
  /** Total time spent on this question */
  totalTimeSpent: number;
  /** Total number of times this question was answered */
  totalInstances: number;
  /** Array of students' answer IDs for this question */
  studentChoices: number[];
  /** @readonly Answer ID of the correct answer for this question */
  readonly correctAnswer: number;
}
