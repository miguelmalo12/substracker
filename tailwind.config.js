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
        'dark-grey': '#333333',
        'medium-grey': '#8D8D8D',
        'border': '#DCDCDC',
        'light-grey': '#F9F9F9',
        'error': '#FF617E',
        'success': '#00C48C',
        'light-bg': '#FFFFFF',
        'dark-bg': '#111111',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      spacing: {
        '1/2': '0.125rem',
        '1/3': '0.1666667rem',
        '1/4': '0.25rem',
        '1/5': '0.2rem',
        '1/6': '0.1666667rem',
        '1/7': '0.1428571rem',
        '1/8': '0.125rem',
        '1/9': '0.1111111rem',
        '1/10': '0.1rem',
        '1/11': '0.0909091rem',
        '1/12': '0.0833333rem',
      },
    },
  },
  plugins: [],
}

