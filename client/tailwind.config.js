const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    //Because we made a dynamic class with the label we need to add those classes
    // to the safe list so the purge does not remove that
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
      ...labelsClasses.map((lbl) => `text-${lbl}-400`),
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '700px',
        'ms-mm': { min: '1024px', max: '1480px' },
      },
      fontFamily: {
        sans: ['Open Sans'],
      },
      gridTemplateColumns: {
        '1/5': '1fr 5fr',
      },

      themes: [
        // {
        //   dark: {
        //     primary: '#0047ab',
        //     'primary-focus': '#2b4f82',
        //     'primary-content': '#ffffff',

        //     secondary: '#f70844',
        //     'secondary-focus': '#bd0039',
        //     'secondary-content': '#ffffff',

        //     accent: '#37cdbe',
        //     'accent-focus': '#2ba69a',
        //     'accent-content': '#ffffff',

        //     neutral: '#2a2e37',
        //     'neutral-focus': '#16181d',
        //     'neutral-content': '#ffffff',

        //     'base-100': '#3b424e',
        //     'base-200': '#2a2e37',
        //     'base-300': '#16181d',
        //     'base-content': '#ebecf0',

        //     info: '#66c7ff',
        //     success: '#87cf3a',
        //     warning: '#e1d460',
        //     error: '#ff6b6b',

        //     '--rounded-box': '1rem',
        //     '--rounded-btn': '.5rem',
        //     '--rounded-badge': '1.9rem',

        //     '--animation-btn': '.25s',
        //     '--animation-input': '.2s',

        //     '--btn-text-case': 'uppercase',
        //     '--navbar-padding': '.5rem',
        //     '--border-btn': '1px',
        //   },
        //   light: {
        //     primary: '#34bb2a',
        //     'primary-focus': '#228b22',
        //     'primary-content': '#f9fafb',

        //     secondary: '#377cfb',
        //     'secondary-focus': '#055bfa',
        //     'secondary-content': '#f9fafb',

        //     accent: '#c41e3a',
        //     'accent-focus': '#9d102d',
        //     'accent-content': '#f9fafb',

        //     neutral: '#333c4d',
        //     'neutral-focus': '#1f242e',
        //     'neutral-content': '#f9fafb',

        //     'base-100': '#ffffff',
        //     'base-200': '#f9fafb',
        //     'base-300': '#f0f0f0',
        //     'base-content': '#333c4d',

        //     info: '#1c92f2',
        //     success: '#009485',
        //     warning: '#ff9900',
        //     error: '#ff5724',

        //     '--rounded-box': '1rem',
        //     '--rounded-btn': '.5rem',
        //     '--rounded-badge': '1.9rem',

        //     '--animation-btn': '0',
        //     '--animation-input': '0',

        //     '--btn-text-case': 'uppercase',
        //     '--navbar-padding': '.5rem',
        //     '--border-btn': '1px',
        //   },
        // },
        {
          darkCustom: {
            primary: '#0047ab',
            'primary-focus': '#2b4f82',
            'primary-content': '#ffffff',

            secondary: '#f70844',
            'secondary-focus': '#bd0039',
            'secondary-content': '#ffffff',

            accent: '#37cdbe',
            'accent-focus': '#2ba69a',
            'accent-content': '#ffffff',

            neutral: '#2a2e37',
            'neutral-focus': '#16181d',
            'neutral-content': '#ffffff',

            'base-100': '#3b424e',
            'base-200': '#2a2e37',
            'base-300': '#16181d',
            'base-content': '#ebecf0',

            info: '#66c7ff',
            success: '#87cf3a',
            warning: '#e1d460',
            error: '#ff6b6b',

            '--rounded-box': '1rem',
            '--rounded-btn': '.5rem',
            '--rounded-badge': '1.9rem',

            '--animation-btn': '.25s',
            '--animation-input': '.2s',

            '--btn-text-case': 'uppercase',
            '--navbar-padding': '.5rem',
            '--border-btn': '1px',
          },
          light: {
            primary: '#34bb2a',
            'primary-focus': '#228b22',
            'primary-content': '#f9fafb',

            secondary: '#377cfb',
            'secondary-focus': '#055bfa',
            'secondary-content': '#f9fafb',

            accent: '#c41e3a',
            'accent-focus': '#9d102d',
            'accent-content': '#f9fafb',

            neutral: '#333c4d',
            'neutral-focus': '#1f242e',
            'neutral-content': '#f9fafb',

            'base-100': '#ffffff',
            'base-200': '#f9fafb',
            'base-300': '#f0f0f0',
            'base-content': '#333c4d',

            info: '#1c92f2',
            success: '#009485',
            warning: '#ff9900',
            error: '#ff5724',

            '--rounded-box': '1rem',
            '--rounded-btn': '.5rem',
            '--rounded-badge': '1.9rem',

            '--animation-btn': '0',
            '--animation-input': '0',

            '--btn-text-case': 'uppercase',
            '--navbar-padding': '.5rem',
            '--border-btn': '1px',
          },
        },
        //
      ],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
  plugins: [require('daisyui')],
};
