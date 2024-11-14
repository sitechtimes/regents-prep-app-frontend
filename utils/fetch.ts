import type { TeacherStudentList } from "./types";

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
  const data = await res.json();
  return data;
}
/* 
export async function getStudentList(courseId:number): Promise<TeacherStudentList[]> {
  const config = useRuntimeConfig();

  const res = await fetch(config.public.backend + ``)
}; */

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

export async function studentJoinCourse(courseCode: string): Promise<string> {
  const config = useRuntimeConfig();

  const res = await fetch(config.public.backend + `courses/student/join/${courseCode}`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to join course");
  return await res.json();
}
