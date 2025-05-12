export type TodoSorter = (assignmentA: StudentAssignment, assignmentB: StudentAssignment) => number;
export type TodoFilter = (assignment: StudentAssignment) => boolean;
