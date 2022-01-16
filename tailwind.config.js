module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // SLIDE IN ANIMATION
      animation: {
        slideIn: "slideIn 1s ease-out forwards",
        openExpand: "expand 1s ease-out forwards",
        openGame: "open 1s ease-in-out forwards"
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: 0.5,
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        expand: {
          "0%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
          "20%": {
            opacity: 1,
            transform: "scale(0.8, 0.8)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(-100px) scale(10, 10) rotate(140deg)"
          },
        },
        open: {
          "0%": {
            opacity: 0,
            transform: "scale(1,1)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1,1)",
          },
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
