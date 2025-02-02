/**
 * Makes a request to the given endpoint with the given method and body.
 *
 * By default, the method will be "GET".
 *
 * Automatically sets "Content-Type" to "application/json" if a method is given.
 *
 * Automatically converts the body to JSON if given.
 * @template T the type of the JSON response
 * @param endpoint the endpoint to request. Will be automatically appended to the base URL, so it should start NOT with a slash.
 * @returns the JSON response, or throws an error if the response is not OK.
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

export async function getCourseStudents(courseId: number) {
  return requestEndpoint<TeacherStudentList[]>(`courses/${courseId}/teacher/student-list/`);
}

export async function getStudentAssignment(assignmentId: number) {
  return requestEndpoint<AssignmentInstance>("courses/student/assignment-instance/", "POST", { id: assignmentId });
}

export async function getNextQuestion(assignmentId: number) {
  return requestEndpoint<QuestionInterface>("courses/student/assignment/get-next-question/", "POST", { id: assignmentId });
}

export async function submitQuestionAnswer(questionId: number, answerId: number) {
  return requestEndpoint<SubmitAnswer>("courses/student/submit-answer/", "POST", { questionInstanceID: questionId, answerID: answerId });
}

export async function submitAssignment(assignmentId: number) {
  return requestEndpoint<SubmitAssignment>("courses/student/submit-assignment/", "POST", { id: assignmentId });
}

export async function getAssignmentResults(assignmentId: number) {
  return requestEndpoint<AssignmentResults>(`courses/student/assignment-results/${assignmentId}`);
}

export async function studentJoinCourse(courseCode: string) {
  return requestEndpoint<number>(`courses/student/join/${courseCode}`);
}

export async function getStudentTodo() {
  return requestEndpoint<StudentAssignment[]>("courses/0/assignments/");
}

export async function removeStudents(courseId: number, studentId: number) {
  await requestEndpoint<TeacherStudentList[]>(`courses/teacher/remove-student/${courseId}/${studentId}`, "DELETE");
}

export async function submitCreateCourse(name: string, period: number, subject: number) {
  return requestEndpoint<CreateCourse[]>("courses/teacher/create-course/", "POST", { name, period, subject });
}
