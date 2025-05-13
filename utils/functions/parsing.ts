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
      assignment.assignment.dueDate = new Date(assignment.assignment.dueDate * 1000);
      // @ts-expect-error dateAssigned is a unix timestamp before parsing
      assignment.assignment.dateAssigned = new Date(assignment.assignment.dateAssigned * 1000);
      // @ts-expect-error dateSubmitted is a unix timestamp before parsing
      assignment.dateSubmitted = assignment.dateSubmitted ? new Date(assignment.dateSubmitted * 1000) : null;
      assignment.assignment.questionInterfaces = {};
    } else {
      // @ts-expect-error dueDate is a unix timestamp before parsing
      assignment.dueDate = new Date(assignment.dueDate * 1000);
      // @ts-expect-error dateAssigned is a unix timestamp before parsing
      assignment.dateAssigned = new Date(assignment.dateAssigned * 1000);
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
