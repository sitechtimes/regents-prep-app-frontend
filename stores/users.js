export const userInfo = definestore("settings", {
  state: () => {
    return {
      user: {
        email: null,
        loggedIn: false,
        student: null,
      },
    };
  },
});
