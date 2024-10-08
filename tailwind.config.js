module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "header-pattern": "url('/src/static/banner.png')",
        "sun-pattern": "url('/src/static/sun.png')",
        "dark-pattern": "url('/src/static/dark.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "share-pattern": "url('/src/static/sharePage.png')",
      }),
      fontFamily: {
        sanss: ["Festive", "Noto Serif KR"],
        sanss2: ["Poor Story", "Noto Serif KR"],
      },
      keyframes: {
        shiny: {
          "0%": {
            transform: "scale(1) rotateZ(0)",
          },

          "50%": {
            transform: "scale(2) rotateZ(180deg)",
          },

          "100%": {
            transform: "scale(1) rotateZ(360deg)",
          },
        },
      },
      animation: {
        shiny: "shiny .85s linear both",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1180px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    plugins: [],
  },
};