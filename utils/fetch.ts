/**
 * Makes a request to the given endpoint with the given method and body.
 *
 * @template T - the type of the request's response
 * @param endpoint - the endpoint to request. It will be automatically appended to the base URL, **so it should NOT start with a `/`**.
 * @param method - the HTTP method to use for the request. Defaults to `"GET"`.
 * @param body - the body of the request as an object. It will be automaitcally converted to a JSON object.
 * @returns - the JSON response, or throws an error if the response is not OK.
 */
async function requestEndpoint<T>(endpoint: string, method?: string, body?: object): Promise<T> {
  const config = useRuntimeConfig();
  const options: RequestInit = { credentials: "include" };
  if (method) {
    options.method = method;
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  const res = await fetch(config.public.backend + endpoint, options);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

/** Requests the `courses/courseId/assignments/` endpoint */
export async function getAssignments<T extends StudentAssignment[] | TeacherAssignment[]>(courseId: number) {
  const data = await requestEndpoint<T>(`courses/${courseId}/assignments/`);
  assignmentToDate(data);
  return data;
}

/** Requests the `courses/courseId/teacher/student-list/` endpoint */
export async function getCourseStudents(courseId: number) {
  return requestEndpoint<TeacherStudentList[]>(`courses/${courseId}/teacher/student-list/`);
}

/** Requests the `courses/student/assignment-instance/` endpoint */
export async function getStudentAssignment(assignmentId: number) {
  return requestEndpoint<AssignmentInstance>("courses/student/assignment-instance/", "POST", { id: assignmentId });
}

/** Requests the `courses/student/assignment/get-next-question/` endpoint */
export async function getNextQuestion(assignmentId: number) {
  return requestEndpoint<QuestionInterface>("courses/student/assignment/get-next-question/", "POST", { id: assignmentId });
}

/** Requests the `courses/student/submit-answer/` endpoint */
export async function submitQuestionAnswer(questionId: number, answerId: number) {
  return requestEndpoint<SubmitAnswer>("courses/student/submit-answer/", "POST", { questionInstanceID: questionId, answerID: answerId });
}

/** Requests the `courses/student/submit-assignment/` endpoint */
export async function submitAssignment(assignmentId: number) {
  return requestEndpoint<SubmitAssignment>("courses/student/submit-assignment/", "POST", { id: assignmentId });
}

/** Requests the `courses/student/assignment-results/assignmentId/` endpoint */
export async function getAssignmentResults(assignmentId: number) {
  return requestEndpoint<AssignmentResults>(`courses/student/assignment-results/${assignmentId}`);
}

/** Requests the `courses/student/join/courseCode/` endpoint */
export async function studentJoinCourse(courseCode: string) {
  return requestEndpoint<number>(`courses/student/join/${courseCode}`);
}

/** Requests the `courses/0/assignments/` endpoint and returns student to-do list*/
export async function getStudentTodo() {
  const data = await requestEndpoint<StudentAssignment[]>("courses/0/assignments/");
  assignmentToDate(data);
  return data;
}

/** Requests the `courses/teacher/` endpoint */
export async function removeStudents(courseId: number, studentId: number) {
  await requestEndpoint<TeacherStudentList[]>(`courses/teacher/remove-student/${courseId}/${studentId}`, "DELETE");
}

/** Requests the `courses/teacher/create-course/` endpoint */
export async function submitCreateCourse(name: string, period: number, subject: number) {
  return requestEndpoint<CreateCourse[]>("courses/teacher/create-course/", "POST", { name, period, subject });
}
