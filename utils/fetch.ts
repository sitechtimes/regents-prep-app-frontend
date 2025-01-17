async function requestEndpoint<T>(endpoint: string, method?: string, body?: Record<string | number, T>): Promise<any> {
  const config = useRuntimeConfig();
  const options: RequestInit = { credentials: "include" };
  if (method) {
    options.method = method;
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  const res = await fetch(config.public.backend + endpoint, options);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return await res.json();
}

export async function getAssignments(courseId: number): Promise<StudentAssignment[] | TeacherAssignment[]> {
  const data = await requestEndpoint(`courses/${courseId}/assignments/`);
  assignmentToDate(data);
  return data;
}

export async function getCourseStudents(courseId: number): Promise<TeacherStudentList[]> {
  return await requestEndpoint(`courses/${courseId}/teacher/student-list/`);
}

export async function getStudentAssignment(assignmentId: number): Promise<AssignmentInstance> {
  return await requestEndpoint(`courses/student/assignment-instance/`, "POST", { id: assignmentId });
}

export async function getNextQuestion(assignmentId: number): Promise<QuestionInterface> {
  return await requestEndpoint(`courses/student/assignment/get-next-question/`, "POST", { id: assignmentId });
}

export async function submitQuestionAnswer(questionId: number, answerId: number): Promise<SubmitAnswer> {
  return await requestEndpoint(`courses/student/submit-answer/`, "POST", { questionInstanceID: questionId, answerID: answerId });
}

export async function submitAssignment(assignmentId: number): Promise<SubmitAssignment> {
  return await requestEndpoint("courses/student/submit-assignment/", "POST", { id: assignmentId });
}

export async function getAssignmentResults(assignmentId: number): Promise<AssignmentResults> {
  return await requestEndpoint(`courses/student/assignment-results/${assignmentId}`);
}

export async function studentJoinCourse(courseCode: string): Promise<number> {
  return await requestEndpoint(`courses/student/join/${courseCode}`);
}

export async function getStudentTodo(): Promise<StudentAssignment[]> {
  return await requestEndpoint(`courses/0/assignments/`);
}
