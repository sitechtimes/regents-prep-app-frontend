import { defineStore } from "pinia";
import { questionInterface } from "~/interfaces/interfaces";

export const useQuestions = defineStore("questions", () => {
  const assignmentName = ref<string>("");
  const qText = ref<string>("");
  const timeLeft = ref<number>(0);
  const qLeft = ref<number>(0);
  const answers = ref<Array<string>>([]);

  function $resetQuestion() {
    (assignmentName.value = ""),
      (qText.value = ""),
      (qLeft.value = 0),
      (timeLeft.value = 0),
      (answers.value = []);
  }

  return {
    assignmentName,
    qText,
    timeLeft,
    qLeft,
    answers,
    $resetQuestion,
  };

  //The necessary properties are returned, and the state is in the questionStateInterface, as typescript Pinia is utilized.

  async function fill() {
    //const {data} = await api.from('api').select()
    //this.question = data.question
    //this.question = data.answer
    //This code (and likely the entire file) will be changed when the api is developed.
  }
});
