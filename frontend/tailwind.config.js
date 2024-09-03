/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  important:true,
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

