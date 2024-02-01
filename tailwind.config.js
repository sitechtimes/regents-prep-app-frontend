/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./constants/*.ts",
  ],
  theme: {
    boxShadow: {
      innertop: "inset 2px 1px 10px -4px  rgba(0, 0, 0, 0.06)",
      innerleft: "inset 4px 0px 8px -5px  rgba(0, 0, 0, 0.06)",
      innerbottom: "inset 0px -5px 8px -5px  rgba(0, 0, 0, 0.06)",
      innerhover: "inset -3px -2.5px 2.5px -4px  rgba(0, 0, 0, 0.06)",
    },
    extend: {
      colors: {
        'background': '#f1f0d6',
        'primary': '#AAB840',
        'secondary': '#426B1F',
      },
    },

  },
  plugins: [],
};
