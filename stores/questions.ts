import { defineStore } from 'pinia'

export const useQuestions = defineStore("questions", () => {
    const question = ref("");
    const answers = ref([]);
    async function fill() {
      //const {data} = await api.from('api').select()
      //this.question = data.question
      //this.question = data.answer
      //This code (and likely the entire file) will be changed when the api is developed.
    }
});