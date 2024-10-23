const config = useRuntimeConfig();

export async function getAssignments(assignmentId: number): Promise<(StudentAssignment | TeacherAssignment)[]> {
  const res = await fetch(config.public.backend + `courses/${assignmentId}/assignments/`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch assignments");
  return await res.json();
}

export async function getCourseStudents(courseId: number): Promise<TeacherStudentList[]> {
  const res = await fetch(config.public.backend + `courses/${courseId}/teacher/student-list/`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch students");
  return await res.json();
}

export async function getStudentAssignment(assignmentId: number): Promise<AssignmentInstance> {
  const res = await fetch(config.public.backend + `courses/student/assignment-instance/`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: assignmentId })
  });
  if (!res.ok) throw new Error("Failed to fetch student assignment");
  return await res.json();
}

export async function getNextQuestion(assignmentId: number): Promise<Question> {
  const res = await fetch(config.public.backend + `courses/student/assignment/get-next-question/`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: assignmentId })
  });
  if (!res.ok) throw new Error("Failed to fetch next question");
  return await res.json();
}

export async function submitQuestionAnswer(questionId: number, answerId: number): Promise<SubmitAnswer | string> {
  const res = await fetch(config.public.backend + `courses/student/submit-answer/`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionInstanceID: questionId, answerID: answerId })
  });
  if (!res.ok) throw new Error("Failed to submit answer");
  return await res.json();
}

export async function submitAssignment(assignmentId: number): Promise<SubmitAssignment> {
  const res = await fetch(config.public.backend + `courses/student/submit-assignment/`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: assignmentId })
  });
  if (!res.ok) throw new Error("Failed to submit answer");
  return await res.json();
}
