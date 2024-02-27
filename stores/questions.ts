import { defineStore } from "pinia";
import {
  questionInterface,
} from "~/interfaces/interfaces";

export const useQuestions = defineStore("questions", () => {
  const assignmentName: Ref<String> = ref("");
  const qText: Ref<String> = ref("");
  const timeLeft: Ref<Number> = ref(0);
  const qLeft: Ref<Number> = ref(0);
  const answers: Ref<Array<String>> = ref([]);

  function $resetQuestion() {
    assignmentName.value = "",
    qText.value = "",
    qLeft.value = 0,
    timeLeft.value = 0,
    answers.value = []
  }

  return {
    assignmentName,
    qText,
    timeLeft,
    qLeft,
    answers,
    $resetQuestion
  };

  //The necessary properties are returned, and the state is in the questionStateInterface, as typescript Pinia is utilized.

  async function fill() {
    //const {data} = await api.from('api').select()
    //this.question = data.question
    //this.question = data.answer
    //This code (and likely the entire file) will be changed when the api is developed.
  }
});
