import { defineStore } from "pinia";
import {
  questionInterface,
  questionStateInterface,
} from "~/interfaces/interfaces";

export const useQuestions = defineStore("questions", {
  state: (): questionStateInterface => {
    return {
      assignmentName: "",
      qText: "",
      timeLeft: 0,
      qLeft: 0,
      answers: [],
    };

    //The necessary properties are returned, and the state is in the questionStateInterface, as typescript Pinia is utilized.

    async function fill() {
      //const {data} = await api.from('api').select()
      //this.question = data.question
      //this.question = data.answer
      //This code (and likely the entire file) will be changed when the api is developed.
    }
  },
});
