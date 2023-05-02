/** @type {import('tailwindcss').Config} */
const withUiKit = require('@pezeshk-book/ui-kit/dist/withUiKit');
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,svg}",
    "./node_modules/@pezeshk-book/ui-kit/**/*"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({addComponents}) {
      addComponents({
        '.btn-big': {
          height: '240px',
          '@media (min-width: 640px)': {
            height: '240px',
          },
          '@media (min-width: 1024px)': {
            height: '240px',
          }
        },
      })
    }),
  ],
}
