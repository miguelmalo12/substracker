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
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        'grow-and-fade-in-1s': 'grow-and-fade-in 3s ease-out 0s forwards',
        'grow-and-fade-in-2s': 'grow-and-fade-in 3s ease-out 0.75s forwards',
        'grow-and-fade-in-4s': 'grow-and-fade-in 3s ease-out 1.5s forwards',
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

