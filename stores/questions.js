export const useQuestions = defineStore("Questions", {
  state: () => {
    return {
      question: "",
      answers: [],
    };
  },
  actions: {
    async fill() {
      //const {data} = await api.from('api').select()
      //this.question = data.question
      //this.question = data.answer
      //This code (and likely the entire file) will be changed when the api is developed.
    },
  },
});
