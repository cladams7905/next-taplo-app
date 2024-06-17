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
      {
        default: {
          primary: "#c084fc",
          secondary: "#f0abfc",
          accent: "#a7f3d0",
          neutral: "#2B2970",
          "base-100": "#ffffff",
          "base-content": "#374151",
          info: "#0891b2",
          success: "#4ade80",
          warning: "#fde047",
          error: "#f87171",
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
    },
  },
  plugins: [daisyui],
};
export default config;
