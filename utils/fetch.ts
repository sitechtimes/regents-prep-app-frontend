export async function getAssignments(courseId: number): Promise<(StudentAssignment | TeacherAssignment)[]> {
  const config = useRuntimeConfig();

  const res = await fetch(config.public.backend + `courses/${courseId}/assignments/`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch assignments");
  const data = await res.json();
  assignmentToDate(data);
  return data;
}

export async function getCourseStudents(courseId: number): Promise<TeacherStudentList[]> {
  const config = useRuntimeConfig();

  const res = await fetch(config.public.backend + `courses/${courseId}/teacher/student-list/`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch students");
  return await res.json();
}

export async function getStudentAssignment(assignmentId: number): Promise<AssignmentInstance> {
  const config = useRuntimeConfig();

  const res = await fetch(config.public.backend + `courses/student/assignment-instance/`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: assignmentId })
  });
  if (!res.ok) throw new Error("Failed to fetch student assignment");
  return await res.json();
}

export async function getNextQuestion(assignmentId: number): Promise<QuestionInterface> {
  const config = useRuntimeConfig();

  const res = await fetch(config.public.backend + `courses/student/assignment/get-next-question/`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: assignmentId })
  });
  if (!res.ok) throw new Error("Failed to fetch next question");
  return await res.json();
}

export async function submitQuestionAnswer(questionId: number, answerId: number): Promise<SubmitAnswer> {
  const config = useRuntimeConfig();

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
  const config = useRuntimeConfig();

  const res = await fetch(config.public.backend + "courses/student/submit-assignment/", {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: assignmentId })
  });
  if (!res.ok) throw new Error("Failed to submit answer");
  return await res.json();
}

export async function getAssignmentResults(assignmentId: number): Promise<AssignmentResults> {
  const config = useRuntimeConfig();

  const res = await fetch(config.public.backend + `courses/student/assignment-results/${assignmentId}`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch assignment results");
  return await res.json();
}

export async function studentJoinCourse(courseCode: string): Promise<number> {
  const config = useRuntimeConfig();

  const res = await fetch(config.public.backend + `courses/student/join/${courseCode}`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to join course");
  return await res.json();
}

export async function studentTodo(): Promise<StudentAssignment[]> {
  const config = useRuntimeConfig();
  console.log(config.public.backend);
  const res = await fetch(config.public.backend + `courses/student/to-do/0`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch student todo");
  return await res.json();
}

export async function submitCreateCourse(name:string, period:number, subject: number): Promise<CreateCourse[]> {
  const config = useRuntimeConfig();
  const res = await fetch(config.public.backend + "courses/teacher/create-course", {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, period: period, subject: subject })
  });
  if (!res.ok) throw new Error("Failed to create course.");
  return await res.json();
}