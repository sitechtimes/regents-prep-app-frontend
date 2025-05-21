interface Assignment {
  /** @readonly ID of the question. */
  readonly id: number;
}

export interface StudentAssignment extends Assignment {
  /**Date object of when the assignment was submitted. */
  dateSubmitted: Date | null;
  /** Number of questions completed. */
  questionsCompleted: number;
  /** @readonly The time an assignment was started. */
  timeStarted: Date | null;
  /** Number of correct questions in the assignment */
  questionsCorrect: number;
  /** @readonly assignment object for assignment properties. */
  readonly assignment: {
    /** @readonly Number of attempts allowed, if assignment is dynamic */
    readonly attemptsAllowed: number;
    /** @readonly Name of the assignment. */
    readonly name: string;
    /** @readonly Number of questions in the assignment */
    readonly numQuestions: number;
    /** @readonly Whether or not the assignment can be turned in late. */
    readonly lateSubmissions: boolean;
    /**Date object of when the assignment is due (Date(UTC)). */
    dueDate: Date;
    /**Date object of when the assignment was assigned (Date(UTC)). */
    dateAssigned: Date;
    /** @readonly If the assignment is a static assignment.*/
    readonly isStatic: boolean;
    /** @readonly Object identifying the course assignment belongs to.
     * @warning Only present if assignment is fetched for all courses.
     */
    readonly course?: {
      /** @readonly Id of the course assignment belongs to */
      readonly id: number;
      /** @readonly Name of the course assignment belongs to */
      readonly name: string;
      readonly subject: Subject;
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
  /** Date the assignment was submitted (Date(UTC)) */
  dateAssigned: Date;
  /** Date the assignment is due (Date(UTC)) */
  dueDate: Date;
  /** @readonly Number of questions in the assignment */
  readonly numQuestions: number;
  /** @readonly Whether or not the assignment can be turned in late. */
  readonly lateSubmissions: boolean;
  /** @readonly Number of questions submitted */
  readonly numSubmitted: number;
}

export interface AssignmentInstance {
  /** @readonly ID of the assignment instance. */
  readonly assignment: number;
  /** @readonly ID of the student. */
  readonly student: number;
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
