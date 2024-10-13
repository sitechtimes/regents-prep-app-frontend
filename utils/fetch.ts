export async function getStudentDashboard(): Promise<StudentCourseInfo[] | undefined> {
  const res = await fetch("wtv/api/courses/student/all", {
    headers: {
      Authorization: `Bearer wtv`
    }
  });
  if (!res.ok) return;
  const data = (await res.json()) as any[];

  return data.map((course) => {
    return {
      type: "student",
      id: course.id,
      name: course.name,
      teacher: course.teacher,
      period: course.period,
      subject: course.subject,
      assignments: course.assignments
    };
  });
}

export async function getTeacherDashboard(): Promise<TeacherCourseInfo[] | undefined> {
  const res = await fetch("wtv/api/courses/teacher/all", {
    headers: {
      Authorization: `Bearer wtv`
    }
  });
  if (!res.ok) return;
  const data = (await res.json()) as any[];

  return data.map((course) => {
    return {
      type: "teacher",
      id: course.id,
      name: course.name,
      teacher: course.teacher,
      period: course.period,
      subject: course.subject,
      joinCode: course.join_code,
      assignments: course.assignments
    };
  });
}

export async function getStudentAssignments(courseId: number): Promise<StudentAssignmentOverview[] | undefined> {
  const res = await fetch(`wtv/api/courses/${courseId}/assignments`, {
    headers: {
      Authorization: `Bearer wtv`
    }
  });
  if (!res.ok) return;
  const data = (await res.json()) as any[];

  return data.map((assignment) => {
    return {
      type: "student",
      id: assignment.id,
      name: assignment.name,
      assigned: new Date(assignment.datetime_assigned),
      due: new Date(assignment.datetime_due),
      questionsLength: assignment.num_of_questions,
      allowLate: assignment.late_submissions,
      questionsCompleted: assignment.instance_info.questions_completed,
      submitted: assignment.instance_info.datetime_submitted ?? null
    };
  });
}

export async function getTeacherAssignments(courseId: number): Promise<TeacherAssignmentOverview[] | undefined> {
  const res = await fetch(`wtv/api/courses/${courseId}/assignments`, {
    headers: {
      Authorization: `Bearer wtv`
    }
  });
  if (!res.ok) return;
  const data = (await res.json()) as any[];

  return data.map((assignment) => {
    return {
      type: "teacher",
      id: assignment.id,
      name: assignment.name,
      assigned: new Date(assignment.datetime_assigned),
      due: new Date(assignment.datetime_due),
      questionsLength: assignment.num_of_questions,
      allowLate: assignment.late_submissions
    };
  });
}

export async function getStudentList(courseId: number): Promise<TeacherStudentList[] | undefined> {
  const res = await fetch(`wtv/api/courses/${courseId}/teacher/student-list`, {
    headers: {
      Authorization: `Bearer wtv`
    }
  });
  if (!res.ok) return;
  const data = (await res.json()) as any[];

  return data.map((student) => {
    return {
      uid: student.id,
      name: student.name,
      email: student.email
    };
  });
}
