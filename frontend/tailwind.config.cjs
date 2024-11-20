const { withAnimations } = require("animated-tailwindcss");

module.exports = withAnimations({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          light: "var(--color-secondary-light)",
        },
        background: "var(--color-background)",
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
        },
        accent: "var(--color-accent)",
        gradient: {
          start: {
            DEFAULT: "var(--color-gradient-start)",
          },
          end: {
            DEFAULT: "var(--color-gradient-end",
          },
        },
      },
    },
  },
  plugins: [],
});
