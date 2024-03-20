const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

module.exports = {
  purge: {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
    //Because we made a dynamic class with the label we need to add those classes
    // to the safe list so the purge does not remove that
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
      ...labelsClasses.map((lbl) => `text-${lbl}-400`),
    ],
  },

  theme: {
    extend: {
      screens: {
        xs: '700px',
        'ms-mm': { min: '1024px', max: '1480px' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: ['dark', 'light', 'forest', 'black'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};
