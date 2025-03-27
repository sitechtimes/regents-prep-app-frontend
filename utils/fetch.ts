interface Success<T> {
  data: T;
  error?: never;
}
interface Failure<E> {
  data?: never;
  error: E;
}

export type Result<T, E = Error> = Success<T> | Failure<E>;
/** Implements try/catch for a given promise.
 *
 * If the promise resolves, returns an object with a `data` property. If the promise rejects, returns an object with an `error` property.
 * @template E - the type of error to return. Defaults to `Error`.
 * @param promise - the promise to implement try/catch for.
 * @example
 * const { data, error } = await tryCatch(getData());
 * if (error) return; // handle the error
 * doSomething(data); // data can now be used
 */
export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data };
  } catch (error) {
    return { error: error as E };
  }
}

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
  return requestEndpoint<DynamicQuestionInterface>("courses/student/get-next-dynamic-question/", "POST", { id: assignmentId });
}

/** Requests the `courses/student/get-static-question/assignmentId/questionIndex/` endpoint */
export async function getNextStaticQuestion(assignmentId: number, questionIndex: number) {
  return requestEndpoint<StaticQuestionInterface>(`courses/student/get-static-question/${assignmentId}/${questionIndex}/`);
}

/** Requests the `courses/student/submit-answer/` endpoint */
export async function submitQuestionAnswer(questionId: number, answerId: number, seconds: number) {
  return requestEndpoint<SubmitAnswer>(`courses/student/submit-answer/${questionId}/${answerId}/${seconds}/`, "POST");
}

/** Requests the `courses/student/increment-question-time/` endpoint */
export async function incrementQuestionTime(questionId: number, seconds: number) {
  if (seconds < 1) return;
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

/** Requests the `courses/teacher/assignment/{assignmentId}/per-question-statistics/{includeGuaranteedQuestions}/{studentIds}` endpoint
 * @param assignmentId - The ID of the assignment for which to get statistics.
 * @param includeGuaranteedQuestions - Whether to include guarnanteed questions, or just their IDs. Defaults to false.
 * @param studentIds - An optional array of student IDs for which to get statistics. Defaults to all students.
 */
export async function getTeacherQuestionStatistic<T extends boolean = false>(assignmentId: number, includeGuaranteedQuestions?: T, studentIds?: number[]) {
  return requestEndpoint<TeacherAssignmentStatistic<T>>(`/courses/teacher/assignment/${assignmentId}/per-question-statistics/${!!includeGuaranteedQuestions}/${studentIds ? studentIds.join(";") : 0}`);
}

/** Requests the `questions/teacher/topics/<topicId>` endpoint */
export async function getTopics(topicId: number) {
  return requestEndpoint<Topic[]>(`/questions/teacher/topics/${topicId}`);
}

/** Requests the `questions/teacher/topic-questions/<topicId>/<offset>/<numOfQuestions>/<includeQuestionCount>` endpoint
 * @param topicId - The ID of the topic to get questions under.
 * @param offset - The index to get questions at. Defaults to 0.
 * @param includeQuestionCount - Whether to include the number of questions under the topic. Defaults to true.
 * @param numOfQuestions - The number of questions to get. Defaults to 20.
 */
export async function getQuestionsUnderTopic(topicId: number, offset = 0, includeQuestionCount = true, numOfQuestions = 20) {
  return requestEndpoint<{ count: number; questions: TopicQuestionInterface[] }>(`/questions/teacher/topic-questions/${topicId}/${offset}/${numOfQuestions}/${includeQuestionCount}`);
}

export async function deleteAssignment(assignmentId: number) {
  return requestEndpoint(`/courses/teacher/delete-assignment/${assignmentId}`, "DELETE");
}

export async function deleteCourse(courseId: number) {
  return requestEndpoint(`/courses/teacher/delete-course/${courseId}`, "DELETE");
}
