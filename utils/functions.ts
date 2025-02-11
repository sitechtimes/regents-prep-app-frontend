/**
 * Sets a delay for a specified number of milliseconds.
 *
 * @warning - Be sure to await this function in order to actually use the delay.
 * @param ms - Number of milliseconds to delay.
 * @example await delay(1000); // Wait for 1 second
 */
export function delay(ms: number): Promise<void> {
  return new Promise((executor: () => void) => setTimeout(executor, ms));
}

/**
 * Returns a random integer between `min` and `max`.
 *
 * @param min - The minimum value of the random integer.
 * @param max - The maximum value of the random integer.
 * @example getRandomInt(1, 10) -> 5
 */
export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

/**
 * Returns a random item from an array.
 *
 * @param arr - The array to get a random item from.
 * @example getRandomItem([1, 2, 3, 4, 5]) -> 3
 */
export function getRandomItem<T>(arr: T[]) {
  return arr[getRandomInt(0, arr.length - 1)];
}

/**
 * Modifies the current route's query parameters while keeping other existing query parameters.
 *
 * @param query - An object representing the query parameters to add or update.
 * @param replace - Whether to use `router.push` or `router.replace` to change the route. Defaults to `replace`.
 * @example changeRouteQuery({ u: 0 }) -> router.replace({ query: { ...route.query, u: 0 } })
 */
export async function changeRouteQuery(query: Record<string, string | number | undefined>, method: "replace" | "push" = "replace"): Promise<void> {
  const route = useRoute();
  const router = useRouter();

  if (method === "replace") return void (await router.replace({ query: { ...route.query, ...query } }));
  await router.push({ query: { ...route.query, ...query } });
}

/**
 * Returns a formatted string representing the difference between two dates.
 *
 * @param target - The date to format.
 * @param current - The current date to compare to.
 * @example formatDate(new Date("2021-09-01T00:00:00"), new Date("2021-09-02T00:00:00")) -> "yesterday at 12:00 AM"
 */
export function formatDate(target: Date, current: Date) {
  const dateHour = target.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" });
  const week = target.toLocaleDateString("default", { weekday: "long" });
  const long = `${target.toLocaleString("default", { year: target.getFullYear() === current.getFullYear() ? undefined : "numeric", month: "short", day: "numeric" })} at ${target.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" })}`;

  const inputDate = new Date(target).setHours(0, 0, 0, 0);
  const now = new Date(current).setHours(0, 0, 0, 0);
  const diffDays = Math.round((inputDate - now) / (24 * 60 * 60 * 1000));

  const labels: Readonly<Record<string, string>> = {
    "0": `today at ${dateHour}`,
    "1": `tomorrow at ${dateHour}`,
    "-1": `yesterday at ${dateHour}`
  };

  return labels[String(diffDays)] || (diffDays > 1 && diffDays <= 7 ? week : diffDays < -1 && diffDays >= -7 ? `last ${week}` : long);
}

/**
 * Converts the `dueDate` and `dateAssigned` properties of an array of assignments to `Date` objects.
 *
 * @param assignments - An array of assignments to modify.
 * @example assignmentToDate(assignment)
 */
export function assignmentToDate(assignments: StudentAssignment[] | TeacherAssignment[]) {
  for (const assignment of assignments) {
    if ("assignment" in assignment) {
      // Check if assignment is of type StudentAssignment
      assignment.assignment.dueDate = new Date(assignment.assignment.dueDate);
      assignment.assignment.dateAssigned = new Date(assignment.assignment.dateAssigned);
      if ("dateSubmitted" in assignment) assignment.dateSubmitted = assignment.dateSubmitted;
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
    assignmentToDate(course.assignments);
  }
}
