import {
  ClassPreviewInformation,
  ClassPreviewAssignments,
  Assignment,
  questionInterface,
  assignmentDetails,
} from "~/interfaces/interfaces";

import {
  studentCourses,
  course,
  studentAssignments,
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

export const getStudentCourses = {
  username: "kmaslov",
  is_student: true,
  is_teacher: false,
  student_courses: [
    {
      id: 29,
      name: "Physics - Period 1",
      teachers: ["Colangelo, Johnathan"],
      assignments: [
        {
          id: 1,
          name: "Homework 1",
          due_date: "2015-09-01",
        } as assignmentDetails,
        {
          id: 2,
          name: "Homework 2",
          due_date: "2015-09-08",
        } as assignmentDetails,
        {
          id: 3,
          name: "Homework 3",
          due_date: "2015-09-15",
        } as assignmentDetails,
      ],
    } as course,
    {
      id: 30,
      name: "Physics - Period 2",
      teachers: ["Jax, Jared"],
      assignments: [
        {
          id: 4,
          name: "Homework 1",
          due_date: "2015-09-01",
        } as assignmentDetails,
        {
          id: 5,
          name: "Homework 2",
          due_date: "2015-09-08",
        } as assignmentDetails,
        {
          id: 6,
          name: "Homework 3",
          due_date: "2015-09-15",
        } as assignmentDetails,
      ],
    } as course,
    {
      id: 31,
      name: "Physics - Period 3",
      teachers: ["Weitzman, Michael"],
      assignments: [
        {
          id: 1,
          name: "Homework 1",
          due_date: "2015-09-01",
        } as assignmentDetails,
        {
          id: 2,
          name: "Homework 2",
          due_date: "2015-09-08",
        } as assignmentDetails,
        {
          id: 3,
          name: "Homework 3",
          due_date: "2015-09-15",
        } as assignmentDetails,
      ],
    } as course,
    {
      id: 32,
      name: "Physics - Period 4",
      teachers: ["Colangelo, Johnathan"],
      assignments: [
        {
          id: 1,
          name: "Homework 1",
          due_date: "2015-09-01",
        } as assignmentDetails,
        {
          id: 2,
          name: "Homework 2",
          due_date: "2015-09-08",
        } as assignmentDetails,
        {
          id: 3,
          name: "Homework 3",
          due_date: "2015-09-15",
        } as assignmentDetails,
      ],
    } as course,
    {
      id: 33,
      name: "Physics - Period 5",
      teachers: ["Jax, Jared"],
      assignments: [
        {
          id: 1,
          name: "Homework 1",
          due_date: "2015-09-01",
        } as assignmentDetails,
        {
          id: 2,
          name: "Homework 2",
          due_date: "2015-09-08",
        } as assignmentDetails,
        {
          id: 3,
          name: "Homework 3",
          due_date: "2015-09-15",
        } as assignmentDetails,
      ],
    } as course,
    {
      id: 34,
      name: "Physics - Period 6",
      teachers: ["Weitzman, Michael"],
      assignments: [
        {
          id: 1,
          name: "Homework 1",
          due_date: "2015-09-01",
        } as assignmentDetails,
        {
          id: 2,
          name: "Homework 2",
          due_date: "2015-09-08",
        } as assignmentDetails,
        {
          id: 3,
          name: "Homework 3",
          due_date: "2015-09-15",
        } as assignmentDetails,
      ],
    } as course,
    {
      id: 35,
      name: "Physics - Period 7",
      teachers: ["Colangelo, Johnathan"],
      assignments: [
        {
          id: 1,
          name: "Homework 1",
          due_date: "2015-09-01",
        } as assignmentDetails,
        {
          id: 2,
          name: "Homework 2",
          due_date: "2015-09-08",
        } as assignmentDetails,
        {
          id: 3,
          name: "Homework 3",
          due_date: "2015-09-15",
        } as assignmentDetails,
      ],
    } as course,
    {
      id: 36,
      name: "Physics - Period 8",
      teachers: ["Jax, Jared"],
      assignments: [
        {
          id: 1,
          name: "Homework 1",
          due_date: "2015-09-01",
        } as assignmentDetails,
        {
          id: 2,
          name: "Homework 2",
          due_date: "2015-09-08",
        } as assignmentDetails,
        {
          id: 3,
          name: "Homework 3",
          due_date: "2015-09-15",
        } as assignmentDetails,
      ],
    } as course,
    {
      id: 37,
      name: "Physics - Period 9",
      teachers: ["Weitzman, Michael"],
      assignments: [
        {
          id: 1,
          name: "Homework 1",
          due_date: "2015-09-01",
        } as assignmentDetails,
        {
          id: 2,
          name: "Homework 2",
          due_date: "2015-09-08",
        } as assignmentDetails,
        {
          id: 3,
          name: "Homework 3",
          due_date: "2015-09-15",
        } as assignmentDetails,
      ],
    } as course,
  ],
} as studentCourses;

export const getStudentAssignments = [
  {
    id: 1,
    datetime_assigned: "2024-03-21T07:13:59.239779Z",
    datetime_due: "2024-03-31T18:00:00Z",
    question_number: 14,
    timer_style: "UT",
    time_allotted: 9,
    attempts_allowed: 6,
    questions_completed: 0,
  } as studentAssignments,
];
