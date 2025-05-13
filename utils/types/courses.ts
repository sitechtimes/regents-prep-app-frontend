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
  readonly subject: Subject;
  /** @warning This field is not returned from the API, must be added manually on fetch */
  assignmentsFetched: boolean;
}

export interface StudentCourse extends Course {
  assignments: StudentAssignment[];
}

export interface TeacherCourseNoAssignment extends Course {
  /** @warning This field is not returned from the API, must be added manually on fetch */
  assignments: TeacherAssignment[];
  /** @readonly 6-digit join code for the course. */
  readonly joinCode: string;
  /** The number of students in the course. */
  numStudents: number;
}

export interface TeacherCourse extends TeacherCourseNoAssignment {
  assignments: TeacherAssignment[];
}
