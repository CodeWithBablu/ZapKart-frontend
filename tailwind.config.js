/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto-fit':'repeat(auto-fit,minmax(15rem,1fr))',
      },

      animation: {
        blob: "bolb 7s infinite",
      },

      keyframes:{
        bolb: {
          "0%":{
            transform: "scale(1) translate(0px,0px)",
          },
          "33%":{
            transform: "scale(1.1) translate(20px,-50px)",
          },
          "66%":{
            transform: "scale(0.9) translate(20px,20px)",
          },
          "100%":{
            transform: "scale(1) translate(0px,0px)",
          }
        }
      },
    },
  },
  plugins: [],
}