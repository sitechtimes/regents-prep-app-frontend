/* export interface Theme {
  assignment: string;
  title: string;
  border: string;
  background: string;
} */
//Every property within the 'theme' interface is a part of the props that are passed in to the classpreview in order to stylize it through tailwind. The assignment property gives each assignment a text color and the title assigns a text color to each class title. The border and background properties are both background colors for each of the class previews- the 'border' is the part of the class preview with a darker color, and is at the top and bottom of the class preview. The background is in the middle, and is the backdrop for each assignment.

//Theme is currently not used because a redesign has excluded all colors except for green.

export interface ClassPreviewInformation {
  name: string;
  teacher: string;
  class_code: string;
  id: number;
}

//Every property within the 'ClassPreviewInformation' interface is a part of the props which are passed to identify each class individually with information that does not change, such as the class title (named title), the teacher of that class (named teacher), and the class code of the class (named classCode)

export interface ClassPreviewAssignments {
  today: Array<Assignment>;
  otherDay: Array<Assignment>;
}

//Every property within the 'ClassPreviewAssignments' interface accounts for the assignments shown in the class preview before the student either chooses to go into the class, or to display for assingments for the student to click on. There should only be assignments from two days within the class preview- the current day (today), and the second nearest day in the future (otherDay). For convienence, as the backend has not been connected to the frontend yet, and the proper distinction between the dates has not been made for each assignment, the second nearest day in the future (with the first being the current day) has been named to otherDay.

export interface Assignment {
  id: number;               
  name: string;
  date: string;
  qLeft: number;
  timeLeft: number;
  question: questionInterface;
  datetime_assigned: string;    
  datetime_due: string;
  question_number: number;     
  time_allotted: number;        
}

//The "Assignment" interface is that used for every assignment in the classInfo.ts file. Every assignment has a name (the assignment name), the amount of questions left in the assignment for this specific student (qLeft), the timeLeft for the student to complete the assignment (stored as seconds, but will later be implemented as a calculation to display minutes and seconds separately), and a separate interface entirely for the question that the student is currently on (question, which uses the interface questionInterface, and is explained below). This will later be changed in order to account for how the api is structured (whether we will have to fetch the question by id, or simply select the one the student is on).

export interface questionInterface {
  text: string;
  answer_type: number;
  answers: Array<answers>;
}
//The "questionInterface" interface is used for the question itself. The qText displays the question text, or the actual question that the student has to answer. The "answers" are stored in a string array, and are displayed on the page when the user is on this specific question.

export interface answers {
  id: number;
  text: string;
}

export interface currentAssignments {
  due_date: string;
}

//The "currentAssignments" interface is used within index.vue under the class folder. It is used to hold assignment dates and given the alias currentArr within index.vue. It will then be used to display dates in the CurrentAssignments view. These dates are also used as a filter to display assignments that  have due dates that correspond with the dates in the arrays.

export interface pastAssignments {
  due_date: string;
}

//The "pastAssignments" interface is used within index.vue under the class folder. It is used to hold assignment dates and given the alias pastArr within index.vue. It will then be used to display dates in the PastAssignments view.These dates are also used as a filter to display assignments that  have due dates that correspond with the dates in the arrays.

// NEW INTERFACES
export interface studentCourses {
  username: string;
  is_student: boolean;
  is_teacher: boolean;
  student_courses: Array<course>;
}

export interface course {
  id: number;
  name: string;
  teacher: string;
  course_code: string;
  assignments: Array<studentAssignments>;
}

export interface assignmentDetails {
  id: number;
  name: string;
  datetime_due: string;
}

export interface studentAssignments {
  id: number;
  name: string;
  datetime_assigned: string;
  datetime_due: string;
  question_number: number;
  questions_completed: number;
  questions_remaining: number;
  timer_style: string;
  time_allotted: number;
  attempts_allowed: number;
}

export interface assignment {
  id: number;
}

export interface TeacherDashboard {
  username: string;
  user_type: string;
  teacher_courses: TeacherCourse[];
}

export interface TeacherCourse {
  id: number | boolean;
  name: string;
  course_code: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
}