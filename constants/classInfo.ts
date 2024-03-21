import {
  ClassPreviewInformation,
  ClassPreviewAssignments,
  Assignment,
  questionInterface,
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
      today: [
        {
          name: "Kinematics Practice",
          date: "04-12-2023",
          qLeft: 5,
          timeLeft: 183,
          question: {
            qText: "Kinematics question",
            answers: ["Answer A", "Answer B", "Answer C", "Answer D"],
          } as questionInterface,
        } as Assignment,
      ],
      otherDay: [
        {
          name: "Energy",
          date: "04-20-2023",
          qLeft: 10,
          timeLeft: 56,
          question: {
            qText: "Energy question",
            answers: ["Answer A", "Answer B"],
          } as questionInterface,
        } as Assignment,
        {
          name: "Circuits",
          date: "04-20-2023",
          qLeft: 4,
          timeLeft: 54,
          question: {
            qText: "Test",
            answers: [],
          } as questionInterface,
        } as Assignment,
      ],
    } as ClassPreviewAssignments,
  },
  /*
  chemistry: {
    // theme: colorThemes.blue,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as ClassPreviewInformation,
    assignments: {
      today: [{name: "Atomic Weights", qLeft: 5, timeLeft: 214} as Assignment, {name: "Stochiometry", qLeft: 2, timeLeft: 528} as Assignment],

      otherDay: [{name: "Sig Figs", qLeft: 10, timeLeft: 183} as Assignment, {name: "Temperature", qLeft: 1, timeLeft: 24} as Assignment],
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
      today: [{name: "Atomic Weights", qLeft: 5, timeLeft: 214} as Assignment, {name: "Stochiometry", qLeft: 2, timeLeft: 528} as Assignment],
      otherDay: [{name: "Sig Figs", qLeft: 10, timeLeft: 183} as Assignment, {name: "Temperature", qLeft: 1, timeLeft: 24} as Assignment],
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
      today: [{name: "Atomic Weights", qLeft: 5, timeLeft: 214} as Assignment, {name: "Stochiometry", qLeft: 2, timeLeft: 528} as Assignment],
      otherDay: [{name: "Sig Figs", qLeft: 10, timeLeft: 183} as Assignment, {name: "Temperature", qLeft: 1, timeLeft: 24} as Assignment],
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
      today: [{name: "Atomic Weights", qLeft: 5, timeLeft: 214} as Assignment, {name: "Stochiometry", qLeft: 2, timeLeft: 528} as Assignment],
      otherDay: [{name: "Sig Figs", qLeft: 10, timeLeft: 183} as Assignment, {name: "Temperature", qLeft: 1, timeLeft: 24} as Assignment],
    } as ClassPreviewAssignments,
  }, */
};

//Above are the format in which props will be passed into the class previews. The theme, followed by the information (the title of the class as well as the teacher), the assignments (for the current and a past day), and the class Code. This is only the format, and is a placeholder until the backend will be connected to the frontend.
