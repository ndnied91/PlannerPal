const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

module.exports = {
  purge: {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
    //Because we made a dynamic class with the label we need to add those classes
    // to the safe list so the purge does not remove that
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-300`),
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
};
