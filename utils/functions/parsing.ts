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

      assignment.assignment.dueDate = new Date(assignment.assignment.dueDate);
      assignment.assignment.dateAssigned = new Date(assignment.assignment.dateAssigned);
      assignment.assignment.questionInterfaces = {};
    } else {
      assignment.dueDate = new Date(assignment.dueDate);
      assignment.dateAssigned = new Date(assignment.dateAssigned);
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
