/** Makes a request to the given endpoint with the given method and body.
 * @param endpoint - the endpoint to request. It will be automatically appended to the base URL, **so it should NOT start with a `/`**.
 * @param method - the HTTP method to use for the request. Defaults to `"GET"`.
 * @param body - the body of the request as an object. It will be automaitcally converted to a JSON object.
 */
async function requestEndpoint(endpoint: string, method?: string, body?: object): Promise<void>;
/** Makes a request to the given endpoint with the given method and body.
 * @template T - the type of the request's response
 * @param endpoint - the endpoint to request. It will be automatically appended to the base URL, **so it should NOT start with a `/`**.
 * @param method - the HTTP method to use for the request. Defaults to `"GET"`.
 * @param body - the body of the request as an object. It will be automaitcally converted to a JSON object.
 * @returns the JSON response from the request.
 */
async function requestEndpoint<T>(endpoint: string, method?: string, body?: object): Promise<T>;
async function requestEndpoint<T>(endpoint: string, method?: string, body?: object): Promise<T | void> {
  const config = useRuntimeConfig();
  const options: RequestInit = { credentials: "include" };
  if (method) {
    options.method = method;
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  const res = await fetch(config.public.backend + endpoint, options);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);

  const contentLength = res.headers.get("Content-Length");
  if (contentLength === "0") return undefined as T;

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

/** Requests the `courses/student/get-next-dynamic-question/` endpoint */
export async function getNextDynamicQuestion(assignmentId: number) {
  return requestEndpoint<QuestionInterface>("courses/student/get-next-dynamic-question/", "POST", { id: assignmentId });
}

/** Requests the `courses/student/get-static-question/assignmentId/questionIndex/` endpoint */
export async function getNextStaticQuestion(assignmentId: number, questionIndex: number) {
  return requestEndpoint<QuestionInterface>(`courses/student/get-static-question/${assignmentId}/${questionIndex}/`);
}

/** Requests the `courses/student/submit-answer/` endpoint */
export async function submitQuestionAnswer(questionId: number, answerId: number, seconds: number) {
  console.log(`+${seconds}s to q${questionId}`);
  const rat = Date.now();
  document.body.insertAdjacentHTML(
    `beforeend`,
    `<img id="bigrat-${rat}" src="https://bigrat.monster/media/bigrat.jpg" style="
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
">`
  );
  setTimeout(() => {
    const el = document.querySelector(`#bigrat-${rat}`);
    if (el && Math.random() < 0.99) el.remove();
  }, 100);
  return requestEndpoint<SubmitAnswer>(`courses/student/submit-answer/${questionId}/${answerId}/${seconds}/`, "POST");
}

/** Requests the `courses/student/increment-question-time/` endpoint */
export async function incrementQuestionTime(questionId: number, seconds: number) {
  console.log(`+${seconds}s to q${questionId}`);
  const rat = Date.now();
  document.body.insertAdjacentHTML(
    `beforeend`,
    `<img id="bigrat-${rat}" src="https://bigrat.monster/media/bigrat.jpg" style="
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
">`
  );
  setTimeout(() => {
    const el = document.querySelector(`#bigrat-${rat}`);
    if (el && Math.random() < 0.99) el.remove();
  }, 100);
  return requestEndpoint(`courses/student/increment-question-time/${questionId}/${seconds}/`, "POST");
}

/** Requests the `courses/student/submit-assignment/` endpoint */
export async function submitAssignment(assignmentId: number) {
  return requestEndpoint<SubmitAssignment>("courses/student/submit-assignment/", "POST", { id: assignmentId });
}

/** Requests the `courses/student/assignment-results/assignmentId/` endpoint */
export async function getAssignmentResults(assignmentId: number) {
  return requestEndpoint<AssignmentResults>(`courses/student/assignment-results/${assignmentId}`);
}

/** Requests the courses/student/join/<joinCode>/ endpoint */
export async function joinCourse(joinCode: string) {
  const data = await requestEndpoint<StudentCourse>(`courses/student/join/${joinCode}/`, "POST");
  data.assignments = [];
  return data;
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
  return requestEndpoint<CreateCourse>("courses/teacher/create-course/", "POST", { name, period, subject });
}

export async function submitCreateAssignment(
  name: string,
  courseID: number,
  guaranteedQuestions: number[],
  randomQuestions: number[],
  dueDate: string,
  numQuestions: number,
  lateSubmissions: boolean,
  timeAllotted: number,
  attemptsAllowed: number
) {
  await requestEndpoint<void>(`courses/teacher/create-assignment/`, "POST", {
    name,
    courseID,
    guaranteedQuestions,
    randomQuestions,
    dueDate,
    numQuestions,
    lateSubmissions,
    timeAllotted,
    attemptsAllowed
  });
}
