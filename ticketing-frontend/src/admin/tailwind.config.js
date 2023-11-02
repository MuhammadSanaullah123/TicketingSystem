/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './**/*.{js,ts,jsx,tsx}',
    './src/admin/layout/*.{js,ts}',
    './layout/Layout.js'
    // Add more here
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      boxShadow: {
        bottom:
          '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
    },
  },
};
