export interface Answer {
  /** @readonly ID of the answer. */
  readonly id: number;
  /** @readonly What the answer choice says (HTML string). */
  readonly text: string;
  /** Used to store which answer the student selected.
   * @warning Must be manually added to `Answer`; this field is not returned from the API.
   */
  selected: boolean;
  /** Whether or not the answer is correct.
   * @warning Must be added manually. Should be added after submitting a question and receiving results.
   */
  isCorrect?: boolean;
}

export interface Question {
  /** @readonly What the question says (HTML string). */
  readonly text: string;
  /** @readonly The type of answer for the question. */
  readonly answerType: "Multiple Choice" | "Written Response" | "True or False";
  /** @readonly Array of answers. */
  readonly answers: Answer[];
}

export interface QuestionInterface {
  /** @readonly ID of the question interface. */
  readonly id: number;
  question: Question;
}

export interface DynamicQuestionInterface extends QuestionInterface {
  /** Number of attempts used on this dynamic question. */
  answerAttemptsUsed: number;
}

export interface StaticQuestionInterface extends QuestionInterface {
  /** Index of the question.
   * @warning Only present if questionIndex was not passed in the URL.
   * @warning Starts at 1, with 0 indicating an unknown index.
   */
  questionIndex: number;
  staticUserAnswer: number | null;
}
