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
    extend: {},
  },
  plugins: [],
};

module.exports = {
  mode: "jit",
  theme: {
    boxShadow: {
      innertop: "inset 3px 2.5px 8px -4px  rgba(0, 0, 0, 0.06)",
      innerleft: "inset 4px 0px 8px -5px  rgba(0, 0, 0, 0.06)",
      innerbottom: "inset 0px -5px 8px -5px  rgba(0, 0, 0, 0.06)",
      innerhover: "inset -3px -2.5px 2.5px -4px  rgba(0, 0, 0, 0.06)",
    },
  },
};
