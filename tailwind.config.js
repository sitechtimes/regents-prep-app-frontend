/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app.vue", "./pages/**/*.{vue,js,ts,jsx,tsx}", "./components/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    boxShadow: {
      innertop: "inset 2px 1px 10px -4px  rgba(0, 0, 0, 0.06)",
      innerleft: "inset 4px 0px 8px -5px  rgba(0, 0, 0, 0.06)",
      innerbottom: "inset 0px -5px 8px -5px  rgba(0, 0, 0, 0.06)",
      innerhover: "inset -3px -2.5px 2.5px -4px  rgba(0, 0, 0, 0.06)"
    },
    extend: {
      colors: {
        bg: {
          light: "#FAF9E5",
          reg: "#f1f0d6",
          dark: "#F2F0CC",
          navbar: "#EAE9CA"
        },
        green: "#A6B880",
        secondary: "#426B1F",
        tertiary: "#4E684A",
        gray: "#DADCE0"
      }
    }
  },
  plugins: [require('daisyui'),],
  darkMode: "selector"
};
