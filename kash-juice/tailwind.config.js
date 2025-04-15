/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'custom': "cubic-bezier(0, 1.32, 0.22, 0.9)", 
      }
    },
  },
  plugins: [],
}

