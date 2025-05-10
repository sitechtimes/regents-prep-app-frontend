export interface TopicQuestionInterfaceAnswer {
  id: number;
  /** @readonly What the answer choice says (HTML string). */
  text: string;
  isCorrect: boolean;
}
export interface TopicQuestionInterface {
  id: number;
  /** @readonly What the answer choice says (HTML string). */
  readonly text: string;
  answerType: "Multiple Choice" | "Written Response" | "True or False";
  difficulty: number;
  answers: TopicQuestionInterfaceAnswer[];
  correctFirstAttempts: number;
  totalFirstAttempts: number;
}

export interface Topic {
  id: number;
  name: string;
  hasChildren: boolean;
  hasQuestions: boolean;
}
export interface TopicMapped extends Topic {
  /** IDs of child topics */
  children: number[] | null;
  questionIds: number[];
}

export interface CreateAssignmentQuestion {
  questionId: number;
  isGuaranteed: boolean;
}
