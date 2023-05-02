/** @type {import('tailwindcss').Config} */
const withUiKit = require('@pezeshk-book/ui-kit/dist/withUiKit');
const plugin = require('tailwindcss/plugin')

module.exports = withUiKit({
  content: [
    "./src/**/*.{js,jsx,ts,tsx,svg}"
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
})
