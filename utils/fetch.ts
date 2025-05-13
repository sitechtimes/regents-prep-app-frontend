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
  const data = await requestEndpoint<DynamicQuestionInterface>("courses/student/get-next-dynamic-question/", "POST", { id: assignmentId });
  return { ...data, question: { ...data.question, text: sanitize(data.question.text) } };
}

/** Requests the `courses/student/get-static-question/assignmentId/questionIndex/` endpoint */
export async function getNextStaticQuestion(assignmentId: number, questionIndex: number) {
  const data = await requestEndpoint<StaticQuestionInterface>(`courses/student/get-static-question/${assignmentId}/${questionIndex}/`);
  return { ...data, question: { ...data.question, text: sanitize(data.question.text) } };
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
  return await requestEndpoint<TeacherAssignmentStatistic<T>>(
    `/courses/teacher/assignment/${assignmentId}/per-question-statistics/${includeGuaranteedQuestions}/${studentIds ? studentIds.join(";") : 0}`
  );
}

/** Requests the `questions/teacher/topic-questions/<topicId>/<offset>/<numOfQuestions>/<includeQuestionCount>` endpoint
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

/** Requests the `/questions/teacher/get-topic-paths/<topic_ids | semicolon-delimited list of integer ids in string form>/` endpoint
 * @param topicIds - The topic IDs to get the paths for
 *
 * @returns number[][]. each array is a topic path; [2,3,4] would be the topic path for topic id 4
 */
export async function getTopicAncestorPaths(topicIds: number[]) {
  if (topicIds.length === 0) return [];
  // remove root because topic paths aren't stored starting with 1
  return (await requestEndpoint<number[][]>(`questions/teacher/get-topic-paths/${topicIds.join(";")}/`)).map((path) => path.slice(1));
}

// https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned
export * from "./functions/fetch";
