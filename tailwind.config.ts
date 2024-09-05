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
          primary: "#7A81EB",
          secondary: "#F7E47F",
          accent: "#172554",
          neutral: "#D1D3D7" /**9ca3af */,
          "base-100": "#ffffff",
          "base-content": "#172554",
          info: "#f9fafb",
          success: "#4ade80",
          warning: "#fde047",
          error: "#f87171",
          "accent-light": "#f9fafb",
          "accent-tab": "#ffffff",
          "link-hover": "var(--fallback-p,oklch(var(--p)/0.20))",
          "purchase-event": "#3eb981",
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
        logo: ["var(--font-georama)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "accent-light": "#f9fafb",
        "accent-tab": "#ffffff",
        "link-hover": "var(--fallback-p,oklch(var(--p)/0.20))",
        "purchase-event": "#3eb981",
        chkfg: "#ffffff",
      },
      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-20%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-20%)", opacity: "0" },
        },
        slideInRight: {
          "0%": { transform: "translateX(20%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(20%)", opacity: "0" },
        },
        slideInTop: {
          "0%": { transform: "translateY(-20%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOutTop: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-20%)", opacity: "0" },
        },
        slideInBottom: {
          "0%": { transform: "translateY(20%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOutBottom: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(20%)", opacity: "0" },
        },
        fadeInLeftToRight: {
          "0%": { backgroundSize: "0% 100%" },
          "100%": { backgroundSize: "100% 100%" },
        },
      },
      animation: {
        slideInLeft: "slideInLeft 0.3s ease-in-out forwards",
        slideOutLeft: "slideOutLeft 0.2s ease-in-out forwards",
        slideInRight: "slideInRight 0.3s ease-in-out forwards",
        slideOutRight: "slideOutRight 0.2s ease-in-out forwards",
        slideInTop: "slideInTop 0.3s ease-in-out forwards",
        slideOutTop: "slideOutTop 0.2s ease-in-out forwards",
        slideInBottom: "slideInBottom 0.3s ease-in-out forwards",
        slideOutBottom: "slideOutBottom 0.2s ease-in-out forwards",
        fadeInLeftToRight: "fadeInLeftToRight 0.1s ease-out forwards",
      },
    },
  },
  plugins: [daisyui],
};
export default config;
