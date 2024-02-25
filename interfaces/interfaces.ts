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

//The "Assignment" interface is that used for every assignment in the classInfo.ts file. Every assignment has a name (the assignment name), the amount of questions left in the assignment for this specific student (qLeft), the timeLeft for the student to complete the assignment (stored as seconds, but will later be implemented as a calculation to display minutes and seconds separately), and a separate interface entirely for the question that the student is currently on (question, which uses the interface questionInterface, and is explained below). This will later be changed in order to account for how the api is structured (whether we will have to fetch the question by id, or simply select the one the student is on).

export interface questionInterface {
  qText: String;
  answers: Array<String>;
}

//The "questionInterface" interface is used for the question itself. The qText displays the question text, or the actual question that the student has to answer. The "answers" are stored in a string array, and are displayed on the page when the user is on this specific question.

export interface questionStateInterface {
  assignmentName: String;
  qText: String;
  timeLeft: Number;
  qLeft: Number;
  answers: Array<String>;
}

//The "questionStateInterface" is used within the questions.ts state file, which is used to display the individual question to the user. The "assignmentName" displays the assignment name for the user at the bottom of the page (shown in the figma), and will be the name the teacher gave the assignment itself. The "qText" displays the question text, the "timeLeft" displays the time left in seconds, the "qLeft" displays the amount of questions left in the assignment, and the answers the answers available for that question. "assignmentName" corresponds to "name" in the Assignment interface, "qText" corresponds to "qText" in the question interface, "timeLeft" corresponds to "timeLeft" in the Assignment interface, "qLeft" corresponds to "qLeft in the Assignment interface, and "answers" corresponds to "answers" in the questionInterface.
