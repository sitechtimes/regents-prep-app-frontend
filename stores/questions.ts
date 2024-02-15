import { defineStore } from 'pinia'
import { questionStateInterface } from '~/interfaces/interfaces';

export const useQuestions = defineStore("questions", () => {

  
/*
  const qText = ref("");
  const timeLeft = ref(0); 
  const qLeft = ref(0);
  const answers = ref([]); 

  function $resetQuestion() {
    qText.value = ""
    timeLeft.value = ""
    qLeft.value = ""
    answers.value = ([])
  } */

    return { /* qText, timeLeft, qLeft, answers  qText: "", timeLeft: 0, qLeft: 0, answers: [],*/  questionState: [] as questionStateInterface[]}
    
    async function fill() {
      //const {data} = await api.from('api').select()
      //this.question = data.question
      //this.question = data.answer
      //This code (and likely the entire file) will be changed when the api is developed.
    }
});