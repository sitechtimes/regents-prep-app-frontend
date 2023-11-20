/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      boxShadow: {
        lg: "0px 10px 21px 0px rgba(0,0,0,0.49)",
        md: "0px 1px 20px 3px rgba(0,0,0,0.49) inset",
      },
    },
  },
  plugins: [],
};
