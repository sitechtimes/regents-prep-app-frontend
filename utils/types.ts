export interface CreateCourse {
  id: number;
  joinCode: string;
  subject: number;
}

export interface StudentData {
  /** @readonly UID of the student. */
  id: number;
  /** @readonly First name of the student. */
  firstName: string;
  /** @readonly Last name of the student. */
  lastName: string;
  /** @readonly Email of the student. */
  email: string;
}

/** @template T - Whether the `student` field should be `StudentData` objects or an array of student IDs */
export interface StudentStatistic<T extends boolean = true> {
  /** Assignment instance ID */
  id: number;
  /** Array of student data if `T` is true, student IDs if false */
  student: T extends true ? StudentData : number;
  dateSubmitted: Date | null;
  questionsCompleted: number;
  questionsCorrect: number;
  /** Measured in seconds */
  timeSpent: number;
  timeStarted: Date | null;
}

export interface SubmitAnswer {
  /** @readonly Tells you if the answer was correct. */
  readonly isCorrect: boolean;
  /** @readonly Number of remaining attempts. */
  readonly remainingAttempts: number | null;
}

// https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned
export * from "./types/teacherStatistics";
export * from "./types/assignments";
export * from "./types/questions";
export * from "./types/subjects";
export * from "./types/courses";
export * from "./types/topics";
export * from "./types/todo";
