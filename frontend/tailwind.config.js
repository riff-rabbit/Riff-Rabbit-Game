export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ct': {
          'light-blue': '#47B6FF',
          'light-green': '#56FFFF',
          'light-purple': '#957FFF',
          'light-grey': '#222233',
          'dark-grey': '#13111D',
          'orange': '#ffa245',
          'hover-purple': '#5849a1', 
          'hover-blue': '#3a93cd',
        },
      },
      animation: {
        correctGlow: "correctGlow 1s ease-in-out",
        incorrectGlow: "incorrectGlow 1s ease-in-out",
      },
      keyframes: {
        correctGlow: {
          "0%": { boxShadow: "0 0 0px 0 rgba(0, 255, 0, 0)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(0, 255, 0, 0.7)" },
          "100%": { boxShadow: "0 0 0px 0 rgba(0, 255, 0, 0)" },
        },
        incorrectGlow: {
          "0%": { boxShadow: "0 0 0px 0 rgba(255, 0, 0, 0)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(255, 0, 0, 0.7)" },
          "100%": { boxShadow: "0 0 0px 0 rgba(255, 0, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
