import { defineStore } from "pinia";
import {
  questionInterface,
  questionStateInterface,
} from "~/interfaces/interfaces";

export const useQuestions = defineStore("questions", {
  state: (): questionStateInterface => {
    return {
      /* qText, timeLeft, qLeft, answers, */
      qText: "",
      timeLeft: 0,
      qLeft: 0,
      answers: [] /* questionState:
      [] as questionStateInterface[], */,
    };

    /*   const qText = ref("");
  const timeLeft = ref(); 
  const qLeft = ref();
  const answers = ref([]); 

  function $resetQuestion() {
    qText.value = ""
    timeLeft.value = ""
    qLeft.value = ""
    answers.value = ([])
  } */

    async function fill() {
      //const {data} = await api.from('api').select()
      //this.question = data.question
      //this.question = data.answer
      //This code (and likely the entire file) will be changed when the api is developed.
    }
  },
});
