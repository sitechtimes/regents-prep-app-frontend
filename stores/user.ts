export const useUserStore = defineStore("userStore", () => {
  const isAuth = ref(false);
  const theme = ref<"light" | "dark">("light");

  return { isAuth, theme };
});
