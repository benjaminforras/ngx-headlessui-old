module.exports = (isProd) => ({
  prefix: '',
  important: true,
  purge: {
    enabled: isProd,
    content: ['**/*.html', '**/*.ts']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    opacity: ["hover", "focus", "disabled"],
    cursor: ["disabled"]
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
});
