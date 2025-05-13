import sanitizeHtml from "sanitize-html";

/** Sanitizes an HTML string
 * @param html - HTML string
 */
function sanitize(html: string) {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "src"]),
    allowedAttributes: false,
    allowedSchemes: ["http", "https", "data"]
  });
}

/** Requests the `courses/courseId/assignments/` endpoint */
export async function getAssignments<T extends StudentAssignment[] | TeacherAssignment[]>(courseId: number) {
  const data = await requestEndpoint<T>(`courses/${courseId}/assignments/`);
  assignmentToDate(data);
  return data;
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
  return await requestEndpoint<SubmitAnswer>(`courses/student/submit-answer/${questionId}/${answerId}/${seconds}/`, "POST");
}

/** Requests the `courses/teacher/create-assignment/` endpoint */
export async function submitCreateAssignment(
  name: string,
  courseIDs: number[],
  guaranteedQuestions: number[],
  randomQuestions: number[],
  randomTopics: number[],
  excludedQuestions: number[],
  dueDate: number,
  numQuestions: number,
  lateSubmissions: boolean,
  timeAllotted: number,
  attemptsAllowed: number
) {
  await requestEndpoint<void>(`courses/teacher/create-assignment/`, "POST", {
    name,
    courseIDs,
    guaranteedQuestions,
    randomQuestions,
    randomTopics,
    excludedQuestions,
    dueDate,
    numQuestions,
    lateSubmissions,
    timeAllotted,
    attemptsAllowed
  });
}

/** Requests the `courses/teacher/assignment/{assignmentId}/per-question-statistics/{includeGuaranteedQuestions}/{studentIds}` endpoint
 * @param assignmentId - The ID of the assignment for which to get statistics.
 * @param includeGuaranteedQuestions - Whether to include guarnanteed questions, or just their IDs.
 * @param studentIds - An optional array of student IDs for which to get statistics. Defaults to all students.
 */
export async function getTeacherQuestionStatistic<T extends boolean>(assignmentId: number, includeGuaranteedQuestions: T, studentIds?: number[]) {
  return await requestEndpoint<StaticTeacherAssignmentStatistic<T> | DynamicTeacherAssignmentStatistic<T>>(
    `/courses/teacher/assignment/${assignmentId}/per-question-statistics/${includeGuaranteedQuestions}/${studentIds ? studentIds.join(";") : 0}`
  );
}

/** Requests the `courses/teacher/assignment/{assignmentId}/per-student-statistics/{includeStudentInfo}` endpoint
 * @param assignmentId - The ID of the assignment for which to get statistics.
 * @param includeGuaranteedQuestions - Whether to include student data, or just their IDs.
 */
export async function getTeacherStudentStatistics<T extends boolean>(assignmentId: number, includeStudentInfo: T) {
  const studentList = await requestEndpoint<StudentStatistic<T>[]>(`/courses/teacher/assignment/${assignmentId}/per-student-statistics/${includeStudentInfo}`);
  for (const student of studentList) {
    student.timeStarted = student.timeStarted ? new Date(student.timeStarted) : null;
    student.dateSubmitted = student.dateSubmitted ? new Date(student.dateSubmitted) : null;
  }
  return studentList;
}

/** Requests the `courses/teacher/assignment/{assignmentId}/individualized-statistics/{studentId}/{includeQuestions}` endpoint
 * @param assignmentId - The ID of the assignment for which to get statistics.
 * @param studentIds - The student IDs for which to get statistics.
 * @param includeQuestions - Whether to include questions, or just their IDs.
 */
export async function getIndividualStudentStatistics<T extends boolean>(assignmentId: number, includeQuestions: T) {
  return await requestEndpoint<(StaticIndividualStudentStatistic<T> | DynamicIndividualStudentStatistic<T>)[]>(
    `/courses/teacher/assignment/individualized-statistics/${assignmentId}/${includeQuestions}`
  );
}

/** Requests the `questions/teacher/topic-questions/<topicId>/<offset>/<numOfQuestions>/<includeQuestionCount>/` endpoint
 * @param topicId - The ID of the topic to get questions under.
 * @param offset - The index to get questions at. Defaults to 0.
 * @param includeQuestionCount - Whether to include the number of questions under the topic. Defaults to true.
 * @param numOfQuestions - The number of questions to get. Defaults to 20.
 */
export async function getQuestionsUnderTopic(topicId: number, offset = 0, includeQuestionCount = true, numOfQuestions = 20) {
  return await requestEndpoint<{ count: number; questions: TopicQuestionInterface[] }>(`/questions/teacher/topic-questions/${topicId}/${offset}/${numOfQuestions}/${includeQuestionCount}`);
}

/** Requests the `/auth/password/reset/confirm/` endpoint */
export async function confirmResetPassword(uid: string, token: string, newPassword1: string, newPassword2: string) {
  return await requestEndpoint(`/auth/password/reset/confirm/`, "POST", {
    uid,
    token,
    newPassword1,
    newPassword2
  });
}

// https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned
export * from "./functions/fetch";
