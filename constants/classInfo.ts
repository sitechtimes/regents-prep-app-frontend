import {
  ClassPreviewInformation,
  ClassPreviewAssignments,
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
    assignment: {
      today: ["Kinematics (5)"],
      otherDay: ["Energy (10)", "Circuits (4)"],
    } as ClassPreviewAssignments,
  },
  chemistry: {
    // theme: colorThemes.blue,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as ClassPreviewInformation,
    assignment: {
      today: ["Atomic Weights (5)", " Stochiometry (2)"],
      otherDay: ["Sig Figs (10)", "Temperature (1)"],
    } as ClassPreviewAssignments,
  },
  chemistry1: {
    // theme: colorThemes.blue,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as ClassPreviewInformation,
    assignment: {
      today: ["Atomic Weights (5)", " Stochiometry (2)"],
      otherDay: ["Sig Figs (10)", "Temperature (1)"],
    } as ClassPreviewAssignments,
  },
  chemistry2: {
    // theme: colorThemes.green,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as ClassPreviewInformation,
    assignment: {
      today: ["Atomic Weights (5)", " Stochiometry (2)"],
      otherDay: ["Sig Figs (10)", "Temperature (1)"],
    } as ClassPreviewAssignments,
  },
  chemistry3: {
    // theme: colorThemes.red,
    information: {
      title: "Regents Chemistry - P4",
      teacher: "Mr. Weitzman",
      classCode: 2,
    } as ClassPreviewInformation,
    assignment: {
      today: ["Atomic Weights (5)", " Stochiometry (2)"],
      otherDay: ["Sig Figs (10)", "Temperature (1)"],
    } as ClassPreviewAssignments,
  },
};

//Above are the format in which props will be passed into the class previews. The theme, followed by the information (the title of the class as well as the teacher), the assignments (for the current and a past day), and the class Code. This is only the format, and is a placeholder until the backend will be connected to the frontend.
