import { defineStore } from "pinia";
import {
  questionInterface,
  questionStateInterface,
} from "~/interfaces/interfaces";

export const useQuestions = defineStore("questions", () => {

  const assignmentName = ref<string>("");
  const qText = ref<string>("");
  const timeLeft = ref<number>(0);
  const qLeft = ref<number>(0);
  const answers = [] as Array<String>
  
    return {
      assignmentName,
      qText,
      timeLeft,
      qLeft,
      answers,
    };

    //The necessary properties are returned, and the state is in the questionStateInterface, as typescript Pinia is utilized.

    async function fill() {
      //const {data} = await api.from('api').select()
      //this.question = data.question
      //this.question = data.answer
      //This code (and likely the entire file) will be changed when the api is developed.
    }
  })

