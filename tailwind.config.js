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
        'primary-dark': '#7E33A3',
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
        'sans': ['Lexend', 'Montserrat', 'sans-serif'],
      },
      width: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
      height: {
        '18': '4.5rem', // 72px
        '34': '8.5rem', // 136px
      },
      inset: {
        '2%': '2%',
        '5%': '5%',
        '7%': '7%',
        '10%': '10%',
        '12%': '12%',
        '15%': '15%',
        '20%': '20%',
        '25%': '25%',
        '30%': '30%',
      },
      keyframes: {
        'grow-and-fade-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '0.7' },
        },
      },
      animation: {
        'grow-and-fade-in-1s': 'grow-and-fade-in 3s ease-out 0s forwards',
        'grow-and-fade-in-2s': 'grow-and-fade-in 3s ease-out 0.75s forwards',
        'grow-and-fade-in-4s': 'grow-and-fade-in 3s ease-out 1.5s forwards',
      },
    },
  },
  plugins: [],
}

