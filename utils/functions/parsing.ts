function unixToDate(timestamp: number) {
  return new Date(timestamp * 1000);
}

/**
 * Converts the `dueDate` and `dateAssigned` properties of an array of assignments to `Date` objects.
 *
 * @param assignments - An array of assignments to modify.
 * @example assignmentToDate(assignment)
 */
export function assignmentToDate(assignments: StudentAssignment[] | TeacherAssignment[]) {
  for (const assignment of assignments) {
    // Check if assignment is of type StudentAssignment
    if ("assignment" in assignment) {
      if (assignment.dateSubmitted === undefined) assignment.dateSubmitted = null; // dateSubmitted isnt in init data

      // @ts-expect-error dueDate is a unix timestamp before parsing
      assignment.assignment.dueDate = unixToDate(assignment.assignment.dueDate);
      // @ts-expect-error dateAssigned is a unix timestamp before parsing
      assignment.assignment.dateAssigned = unixToDate(assignment.assignment.dateAssigned);
      // @ts-expect-error timeStarted is a unix timestamp before parsing
      assignment.timeStarted = unixToDate(assignment.timeStarted);
      // @ts-expect-error dateSubmitted is a unix timestamp before parsing
      assignment.dateSubmitted = assignment.dateSubmitted ? unixToDate(assignment.dateSubmitted) : null;
      assignment.assignment.questionInterfaces = {};
    } else {
      // @ts-expect-error dueDate is a unix timestamp before parsing
      assignment.dueDate = unixToDate(assignment.dueDate);
      // @ts-expect-error dateAssigned is a unix timestamp before parsing
      assignment.dateAssigned = unixToDate(assignment.dateAssigned);
    }
  }
}

/**
 * Converts the `dueDate` and `dateAssigned` properties of an array of courses to `Date` objects.
 *
 * @param courses - An array of courses.
 * @example courseToDate(course);
 */
export function courseToDate(courses: StudentCourse[]) {
  for (const course of courses) {
    course.assignmentsFetched = false;
    assignmentToDate(course.assignments);
  }
}
