import { defineStore } from 'pinia'

export const userState = defineStore("settings", {
  state: () => {
    return {
      user: {
        email: null,
        loggedIn: false,
        name: null,
        student: null,
      },
    };
  },
});
