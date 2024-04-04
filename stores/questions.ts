import { defineStore } from "pinia";
import { questionInterface } from "~/interfaces/interfaces";

export const useQuestions = defineStore("questions", () => {
  const classCode = ref<number>(0);
  const assignmentName = ref<string>("");
  const qText = ref<string>("");
  const timeLeft = ref<number>(0);
  const qLeft = ref<number>(0);
  const answers = ref<Array<string>>([]);
  const dueDate = ref<string>("");

  function $resetQuestion() {
    (classCode.value = 0),
      (assignmentName.value = ""),
      (qText.value = ""),
      (timeLeft.value = 0),
      (qLeft.value = 0),
      (answers.value = []),
      (dueDate.value = "");
  }

  function $updateState(code: number, name: string, time: number, questionsLeft: number, answer: Array<string>, due: string) {
    classCode.value = code,
      assignmentName.value = name,
      timeLeft.value = time
    qLeft.value = questionsLeft,
      answers.value = answer
    dueDate.value = due
  }

  return {
    classCode,
    assignmentName,
    qText,
    timeLeft,
    qLeft,
    answers,
    dueDate,
    $resetQuestion,
    $updateState
  };

  //The necessary properties are returned, and the state is in the questionStateInterface, as typescript Pinia is utilized.

  async function fill() {
    //const {data} = await api.from('api').select()
    //this.question = data.question
    //this.question = data.answer
    //This code (and likely the entire file) will be changed when the api is developed.
  }
});
