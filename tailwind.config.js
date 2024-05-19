import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'messiri': ['El Messiri', 'sans-serif']
      },
      borderWidth: {
        '3': '3px',
      },
      backgroundColor: {
        'primary': '#009759',
        'secondary-default': '#363636',
        'secondary-light': '#474747'
      },
      borderColor: {
        'primary': '#009759',
        'secondary-default': '#363636',
        'secondary-light': '#474747'
      },
      textColor:{
        'primary': '#009759',
        'secondary-default': '#363636',
        'secondary-light': '#474747'
      },
      stroke: {
        'primary': '#009759',
        'secondary-default': '#363636',
        'secondary-light': '#474747'
      },
      height: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      },
      width: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      },
      maxWidth: {
        'inherit': 'inherit',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.flex-center': {
          'display': 'flex',
          'justifyContent': 'center',
          'alignItems': 'center',  
        },
        '.translate-center': {
          'position': 'absolute',
          'top': '50%',
          'left': '50%',
          'transform': 'translate(-50%, -50%)',
        },
        '.outer-shadow': {
          'box-shadow': '5px 5px 16px -3px rgba(0, 0, 0, 0.75)',
          '-webkit-box-shadow': '5px 5px 16px -3px rgba(0, 0, 0, 0.75)',
          '-moz-box-shadow': '5px 5px 16px -3px rgba(0, 0, 0, 0.75)',
        },
        '.inner-shadow': {
          'box-shadow': '0px 0px 20px -10px rgba(0,0,0,0.75) inset',
          '-webkit-box-shadow': '0px 0px 20px -10px rgba(0,0,0,0.75) inset',
          '-moz-box-shadow': '0px 0px 20px -10px rgba(0,0,0,0.75) inset',
        },
        '.warning-shadow': {
          'box-shadow': '0px 0px 16px 0px rgba(255,0,0,1)',
          '-webkit-box-shadow': '0px 0px 16px 0px rgba(255,0,0,1)',
          '-moz-box-shadow': '0px 0px 16px 0px rgba(255,0,0,1)'
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-primary': {
          'scrollbar-color': '#057b4a #333',
        },
        '.scrollbar-beige': {
          'scrollbar-color': '#ae9c73 #e5d4b9',
        },
        '.checkbox-input': {
          'box-sizing': 'border-box',
          'appearance': 'none',
          'width': '20px',
          'height': '20px',
          'border-radius': '5px',
          'border': '3px solid' ,
          'border-color': '#fff',
          'background-color': '#fff',
          'transition': 'border-color 0.2s ease-in-out',
          'cursor': 'pointer',
        },
        '.input-hide-arrows': {
            '-webkit-appearance': 'none',
            '-moz-appearance': 'textfield',
            'margin': '0',
        },
        '.stroke-linecap-round': {
          'stroke-linecap': 'round',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    plugin(function ({ addVariant, matchUtilities, theme }) {
      addVariant('hocus', ['&:hover', '&:focus'])
      // Square utility
      matchUtilities(
        {
          square: (value) => ({
            width: value,
            height: value
          })
        },
        { values: theme('spacing') }
      )
    })
  ]
};