/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#9145B6',
        'primary-bg': '#EDE3F2',
        'dark-grey': '#333333',
        'medium-grey': '#8D8D8D',
        'border': '#DCDCDC',
        'light-grey': '#F9F9F9',
        'error': '#FF617E',
        'success': '#00C48C',
        'light-bg': '#FFFFFF',
        'dark': '#111111',
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
      width: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
      height: {
        '18': '4.5rem', // 72px
        '34': '8.5rem', // 136px
      },
    },
  },
  plugins: [],
}

