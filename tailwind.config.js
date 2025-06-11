// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'alert-thumb': '#FA565F',
        'alert-thumb-dark': '#9352F4',
      },
    },
    minHeight: {
      'screen-minus-bar': 'calc(100dvh - 40px)',
    },
    padding: {
      'safe-bottom': 'env(safe-area-inset-bottom)',
    },
  },
  variants: {
    extend: {
      scrollbar: ['rounded', 'dark'],            // habilita dark para scrollbar
      scrollbarThumb: ['dark'],                  // habilita dark para thumb
      scrollbarTrack: ['dark'],                  // (opcional) se quiser track custom
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}
