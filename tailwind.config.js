const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: "class",
  lightMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: '"SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif'
      },
      fontSize: {
        xs: "1.3rem",
        sm: "1.4rem",
        md: "1.6rem",
        lg: "1.8rem",
        xl: ["2.2rem", "1.3"],
        "2xl": "2.4rem",
        "3xl": "2.6rem",
        "4xl": "3.2rem",
        "5xl": "4rem",
        "6xl": ["4.4rem", "1.1"],
        "7xl": ["4.8rem", "1.1"],
        "8xl": ["6rem", "1.1"],
        "9xl": ["8rem", "1.1"],
      },
      colors: {
        "transparent-black": "rgba(0, 0, 0, 0.08)",
        "transparent-gray": "rgba(189, 189, 189, 0.8)",
        background: "#fff",
        "gray-dark": "#222326",
        "primary-text": "#b4bcd0",
      },
      spacing: {
        0: "0",
        1: "0.4rem",
        2: "0.8rem",
        3: "1.2rem",
        4: "1.6rem",
        5: "2rem",
        6: "2.4rem",
        7: "2.8rem",
        8: "3.2rem",
        9: "3.6rem",
        10: "4rem",
        11: "4.4rem",
        12: "4.8rem",
        "nav-height": "var(--navigation-height)"
      },
      backgroundImage: {
        "page-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3), transparent)",
        "hero-gradient":
          "radial-gradient(ellipse 50% 80% at 20% 40%,rgba(93,52,221,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(120,119,198,0.15),transparent)",
        "hero-glow":
          "conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)",
        "glow-lines":
          "linear-gradient(var(--direction),#9d9bf2 0.43%,#7877c6 14.11%,rgba(120,119,198,0) 62.95%)",
        "radial-faded":
          "radial-gradient(circle at bottom center,var(--color),transparent 70%)",
        "glass-gradient":
          "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%)",
      },
      boxShadow: {
        primary: "rgb(216, 180, 254) 0px 1px 40px"
      },
      transitionDelay: {
        0: "0ms"
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0, transform: "translateY(-10px)" },
          to: { opacity: 1, transform: "none" },
        },
        "floating": {
          "0%, 100%": {
            transform: "translateY(-1%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(1%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1000ms var(--animation-delay, 0ms) ease forwards",
        "floating" : "floating 3s infinite"
      },
    },
  },
  plugins: [addVariablesForColors, nextui()],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
