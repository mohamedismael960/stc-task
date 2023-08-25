/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  important:true,
  theme: {
    colors: {
      primary_color: "var(--primary-color)",
      dark: '#303952',
      dark_half:'#30395280',
      light_highlight:'#30395226',
      white:"#fff",
      red:'#FF5252',
      bg_main:'#F8F8F8',
      black:'#000',
      blue:'#3f51b5',
      text_yellow:'#ffff00'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '53': '3.313rem',
        '68': '4.25rem',
        '26': '1.625rem',
        '120' : '7.5rem',
        '74' : '4.625rem',
        '32' : '2rem'
      }
    },
  },
  plugins: [],
}

