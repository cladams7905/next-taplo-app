import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    themes: [
      "dark",
      {
        default: {
          primary: "#6091F3",
          secondary: "#f0abfc",
          accent: "#172554",
          neutral: "#D1D3D7" /**9ca3af */,
          "base-100": "#ffffff",
          "base-content": "#172554",
          info: "#0891b2",
          success: "#4ade80",
          warning: "#fde047",
          error: "#f87171",
          "accent-light": "#f9fafb",
          "accent-tab": "#ffffff",
          "link-hover": "#DFE9FD",
        },
      },
    ],
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "screen-minus-navbar": "calc(100vh - 68px)",
      },
      fontFamily: {
        heading: ["var(--font-changaOne)"],
        sans: ["var(--font-openSans)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "accent-light": "#f9fafb",
        "accent-tab": "#ffffff",
        "link-hover": "#DFE9FD",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [daisyui],
};
export default config;
