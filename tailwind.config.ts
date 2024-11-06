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
    "./public/scripts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "screen-minus-navbar": "calc(100vh - 96px)",
      },
      fontFamily: {
        heading: ["var(--font-changaOne)"],
        sans: ["var(--font-openSans)"],
        logo: ["var(--font-georama)"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        semibold: "500",
        bold: "600",
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
        twSlideInLeft: {
          "0%": { transform: "translateX(-20%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        twSlideOutLeft: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-20%)", opacity: "0" },
        },
        twSlideInRight: {
          "0%": { transform: "translateX(20%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        twSlideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(20%)", opacity: "0" },
        },
        twSlideInTop: {
          "0%": { transform: "translateY(-20%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        twSlideOutTop: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-20%)", opacity: "0" },
        },
        twSlideInBottom: {
          "0%": { transform: "translateY(20%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        twSlideOutBottom: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(20%)", opacity: "0" },
        },
        fadeInLeftToRight: {
          "0%": { backgroundSize: "0% 100%" },
          "100%": { backgroundSize: "100% 100%" },
        },
        expandFadeIn: {
          "0%": {
            transform: "scaleX(0)",
            transformOrigin: "bottom left",
          },
          "100%": {
            transform: "scaleX(1)",
            transformOrigin: "bottom left",
          },
        },
        expandFadeOut: {
          "0%": {
            transform: "scaleX(1)",
            transformOrigin: "bottom left",
          },
          "100%": {
            transform: "scaleX(0)",
            transformOrigin: "bottom left",
          },
        },
      },
      animation: {
        twSlideInLeft: "twSlideInLeft 0.3s ease-in-out forwards",
        twSlideOutLeft: "twSlideOutLeft 0.2s ease-in-out forwards",
        twSlideInRight: "twSlideInRight 0.3s ease-in-out forwards",
        twSlideOutRight: "twSlideOutRight 0.2s ease-in-out forwards",
        twSlideInTop: "twSlideInTop 0.3s ease-in-out forwards",
        twSlideOutTop: "twSlideOutTop 0.2s ease-in-out forwards",
        twSlideInBottom: "twSlideInBottom 0.3s ease-in-out forwards",
        twSlideOutBottom: "twSlideOutBottom 0.2s ease-in-out forwards",
        fadeInLeftToRight: "fadeInLeftToRight 0.1s ease-out forwards",
        expandFadeIn: "expandFadeIn 0.5s cubic-bezier(.1, 1.2, .3, 1) forwards",
        expandFadeOut:
          "expandFadeOut 0.5s cubic-bezier(.1, 1.2, .3, 1) forwards",
      },
    },
  },
  plugins: [daisyui],
};
export default config;
