import { defineStore } from 'pinia'
import { questionStateInterface } from '~/interfaces/interfaces';

export const useQuestions = defineStore("questions", () => {

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

    return { /* qText, timeLeft, qLeft, answers, $resetQuestion, */ questionState: [] as questionStateInterface[]}
    
    async function fill() {
      //const {data} = await api.from('api').select()
      //this.question = data.question
      //this.question = data.answer
      //This code (and likely the entire file) will be changed when the api is developed.
    }
});