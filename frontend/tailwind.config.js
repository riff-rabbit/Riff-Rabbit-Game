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
    },
  },
  plugins: [],
};
