/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#191919',
          'strong': '#202020',            // Used for sidebar and main scrollbar
          'potent': '#2c2c2c',            // Selected item background & Hover over item background
          'white1': '#e8e6e3cf',          // Hovering over selected item background
          'white2': '#d5d5d4',            // Item text
          'white3': '#ffffffcf',          // Selected item text
          'white4': '#ffffff08'           // Item text on mouse click
        }
      },
    },
  },
  plugins: [],
}

