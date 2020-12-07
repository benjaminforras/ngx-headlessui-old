const colors = require('tailwindcss/colors');

module.exports = (isProd) => ({
  prefix: '',
  important: true,
  purge: {
    enabled: isProd,
    content: ['**/*.html', '**/*.ts']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        fuchsia: colors.fuchsia
      }
    },
  },
  variants: {
    opacity: ["hover", "focus", "disabled"],
    cursor: ["disabled"]
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
});
