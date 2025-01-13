/**
 * @warning Be sure to await this function in order to actually use the delay.
 * @param {number} ms - Number of milliseconds to delay.
 * @example await delay(1000); // Wait for 1 second
 */
export function delay(ms: number): Promise<void> {
  return new Promise((executor: any) => setTimeout(executor, ms));
}

/** Returns a random integer between `min` and `max`, inclusive. */
export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

/** Returns a random item from an array. */
export function getRandomItem<T>(arr: T[]) {
  return arr[getRandomInt(0, arr.length - 1)];
}

export function formatDate(target: Date, current: Date) {
  const dateHour = target.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" });
  const week = target.toLocaleDateString("default", { weekday: "long" });
  const long =
    target.toLocaleString("default", { year: target.getFullYear() === current.getFullYear() ? undefined : "numeric", month: "short", day: "numeric" }) +
    " at " +
    target.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" });

  const inputDate = new Date(target).setHours(0, 0, 0, 0);
  const now = new Date(current).setHours(0, 0, 0, 0);
  const diffDays = Math.round((inputDate - now) / (24 * 60 * 60 * 1000));

  const labels: Record<string, string> = {
    "0": `today at ${dateHour}`,
    "1": `tomorrow at ${dateHour}`,
    "-1": `yesterday at ${dateHour}`
  };

  return labels[String(diffDays)] || (diffDays > 1 && diffDays <= 7 ? week : diffDays < -1 && diffDays >= -7 ? `last ${week}` : long);
}

export function courseToDate(courses: (StudentCourse | TeacherCourse)[]) {
  for (let course of courses) {
    assignmentToDate(course.assignments);
  }
}

export function assignmentToDate(assignments: StudentAssignment[] | TeacherAssignment[]) {
  for (let assignment of assignments) {
    if ("assignment" in assignment) {
      //This if statement determines if the function is done to a studentAssignment, as the type for studentAssignment includes an 'assignment' object.
      assignment.assignment.dueDate = new Date(assignment.assignment.dueDate);
      assignment.assignment.dateAssigned = new Date(assignment.assignment.dateAssigned);
      if ("dateSubmitted" in assignment) {
        assignment.dateSubmitted = assignment.dateSubmitted;
      }
    } else {
      assignment.dueDate = new Date(assignment.dueDate);
      assignment.dateAssigned = new Date(assignment.dateAssigned);
    }
  }
}
