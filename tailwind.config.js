/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      gray: {
        100: '#F2F4F6',
        200: '#D6DBDD',
        300: '#8D99AE',
        500: '#595E60',
        700: '#515151',
      },
      green: {
        300: '#76C893',
      },
      black: {
        900: '#000000',
        700: '#2B2D42',
      },
      blue: {
        300: '#3A86FF',
        500: '#1864DD'
      },
      red: '#D62828',
    },
    extend: {
      gridTemplateColumns: {
        'layout': '480px 1fr',
        'table': '1fr 1fr 1fr 1fr 10rem'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
