import { defineStore } from 'pinia'

export const useQuestions = defineStore("questions", () => {
  const qText = ref("");
  const timeLeft = ref(); 
  const qLeft = ref();
    const answers = ref([]);
    return {qText, timeLeft, qLeft, answers}
    async function fill() {
      //const {data} = await api.from('api').select()
      //this.question = data.question
      //this.question = data.answer
      //This code (and likely the entire file) will be changed when the api is developed.
    }
});