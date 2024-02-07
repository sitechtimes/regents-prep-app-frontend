import {
  ClassPreviewInformation,
  ClassPreviewAssignments,
  Assignment,
} from "~/interfaces/interfaces";

// import { colorThemes } from "~/constants/themes";

export const classInfo = {
  physics: {
    // theme: colorThemes.purple,
    information: {
      title: "Regents Physics - P1",
      teacher: "Mr. Colangelo",
      classCode: 1,
    } as ClassPreviewInformation,
    assignments: {
      today: [{name: "Kinematics", qLeft: 5, timeLeft: 183,} as Assignment],
      otherDay: [{name: "Energy", qLeft: 10, timeLeft: 56} as Assignment, {name: "Circuits", qLeft: 4, timeLeft: 54} as Assignment],
    } as ClassPreviewAssignments,
  },
  chemistry: {
    // theme: colorThemes.blue,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as ClassPreviewInformation,
    assignments: {
      today: [{name: "Atomic Weights", qLeft: 5} as Assignment, {name: "Stochiometry", qLeft: 2, timeLeft: 528} as Assignment],

      otherDay: [{name: "Sig Figs", qLeft: 10} as Assignment, {name: "Temperature", qLeft: 1} as Assignment],
    } as ClassPreviewAssignments,
  },
  chemistry1: {
    // theme: colorThemes.blue,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as ClassPreviewInformation,
    assignments: {
      today: [{name: "Atomic Weights", qLeft: 5} as Assignment, {name: "Stochiometry", qLeft: 2} as Assignment],

      otherDay: [{name: "Sig Figs", qLeft: 10} as Assignment, {name: "Temperature", qLeft: 1} as Assignment],
    } as ClassPreviewAssignments,
  },
  chemistry2: {
    // theme: colorThemes.green,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as ClassPreviewInformation,
    assignments: {
      today: [{name: "Atomic Weights", qLeft: 5} as Assignment, {name: "Stochiometry", qLeft: 2} as Assignment],
      otherDay: [{name: "Sig Figs", qLeft: 10} as Assignment, {name: "Temperature", qLeft: 1} as Assignment],
    } as ClassPreviewAssignments,
  },
  chemistry3: {
    // theme: colorThemes.red,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as ClassPreviewInformation,
    assignments: {
      today: [{name: "Atomic Weights", qLeft: 5} as Assignment, {name: "Stochiometry", qLeft: 2} as Assignment],
      otherDay: [{name: "Sig Figs", qLeft: 10} as Assignment, {name: "Temperature", qLeft: 1} as Assignment],
    } as ClassPreviewAssignments,
  },
};

//Above are the format in which props will be passed into the class previews. The theme, followed by the information (the title of the class as well as the teacher), the assignments (for the current and a past day), and the class Code. This is only the format, and is a placeholder until the backend will be connected to the frontend.
