/* export interface Theme {
  assignment: string;
  title: string;
  border: string;
  background: string;
} */
//Every property within the 'theme' interface is a part of the props that are passed in to the classpreview in order to stylize it through tailwind. The assignment property gives each assignment a text color and the title assigns a text color to each class title. The border and background properties are both background colors for each of the class previews- the 'border' is the part of the class preview with a darker color, and is at the top and bottom of the class preview. The background is in the middle, and is the backdrop for each assignment.

//Theme is currently not used because a redesign has excluded all colors except for green.

export interface ClassPreviewInformation {
  title: string;
  teacher: string;
  classCode: number;
}

//Every property within the 'ClassPreviewInformation' interface is a part of the props which are passed to identify each class individually with information that does not change, such as the class title (named title), the teacher of that class (named teacher), and the class code of the class (named classCode)

export interface ClassPreviewAssignments {
  today: Array<Assignment>;
  otherDay: Array<Assignment>;
}

//Every property within the 'ClassPreviewAssignments' interface accounts for the assignments shown in the class preview before the student either chooses to go into the class, or to display for assingments for the student to click on. There should only be assignments from two days within the class preview- the current day (today), and the second nearest day in the future (otherDay). For convienence, as the backend has not been connected to the frontend yet, and the proper distinction between the dates has not been made for each assignment, the second nearest day in the future (with the first being the current day) has been named to otherDay.

export interface Assignment {
  name: String;
  qLeft: Number;
  timeLeft: Number;
  question: questionInterface;
}

export interface questionInterface {
  qText: String;
  answers: Array<String>;
}

export interface questionStateInterface {
  qText?: String;
  timeLeft?: Number;
  qLeft?: Number;
  answers?: Array<String>;
}
