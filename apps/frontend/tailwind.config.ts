import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const settings = {
  breakpoints: {
    height: {
      md: 700,
    },
    width: {
      desktop: {
        lg: 1280,
        md: 960,
      },
      tablet: {
        md: 768,
      },
      mobile: {
        lg: 600,
        md: 480,
        sm: 400,
        xs: 360,
      },
    },
  },
}

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/services/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stores/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["text-highlight", "text-x-express", "text-x-next"], // Add classes here that are generated dynamically or used in translations
  theme: {
    extend: {
      backgroundColor: {
        primary: "#232425",
        input: "#333435",
        button: {
          primary: "#232425",
          secondary: "#333435",
          disabled: "#333435",
        },
        select: {
          primary: "#333435",
          secondary: "#535455",
        },
      },
      backgroundImage: {
        "gradient-body":
          "linear-gradient(180deg, rgb(37 16 53) 0%, rgb(42 26 93) 100%)",
        "gradient-button":
          "linear-gradient(90deg, rgb(155 31 241) 0%, rgb(71 127 175) 100%)",
        // Toast
        "toast-success":
          "linear-gradient(45deg, rgba(34, 87, 52, 1) 0%, rgba(48, 105, 65, 1) 100%)",
        "toast-error":
          "linear-gradient(45deg, rgba(138, 45, 45, 1) 0%, rgba(165, 52, 52, 1) 100%)",
        "toast-warning":
          "linear-gradient(45deg, rgba(150, 95, 0, 1) 0%, rgba(175, 120, 20, 1) 100%)",
        "toast-info":
          "linear-gradient(45deg, rgba(40, 80, 140, 1) 0%, rgba(55, 105, 160, 1) 100%)",
      },
      borderColor: {
        primary: "#282828",
      },
      boxShadow: {
        button: "0 0 15px 0 rgba(55,0,116,0.5)",
        image: "0 0 20px 0 rgba(0,0,0,0.25)",
        toast: "0 0 15px 0 rgb(0 0 0 / 10%)",
      },
      maxWidth: {
        "one-col": "1280px",
      },
      placeholderColor: {
        primary: "#A9AAAB",
        error: "#D1A5FD",
      },
      ringColor: {
        primary: "#878889",
      },
      screens: {
        "mobile-w-xs": {
          raw: `(min-width: ${settings.breakpoints.width.mobile.xs}px)`,
        },
        "mobile-w-sm": {
          raw: `(min-width: ${settings.breakpoints.width.mobile.sm}px)`,
        },
        "mobile-w-md": {
          raw: `(min-width: ${settings.breakpoints.width.mobile.md}px)`,
        },
        "mobile-w-lg": {
          raw: `(min-width: ${settings.breakpoints.width.mobile.lg}px)`,
        },
        "tablet-w": {
          raw: `(min-width: ${settings.breakpoints.width.tablet.md}px)`,
        },
        "desktop-h": {
          raw: `(min-height: ${settings.breakpoints.height.md}px)`,
        },
        "desktop-w-md": {
          raw: `(min-width: ${settings.breakpoints.width.desktop.md}px)`,
        },
        "desktop-w-lg": {
          raw: `(min-width: ${settings.breakpoints.width.desktop.lg}px)`,
        },
      },
      textColor: {
        primary: "#FFFFFF",
        secondary: "#878889",
        muted: "#DDDDDD",
        highlight: "#D1A5FD",
        error: "#D1A5FD",
        "x-next": "#B45BF5",
        "x-express": "#726FFF",
        // Toast
        toast: {
          DEFAULT: "#FFFFFF",
        },
      },
      transitionDuration: {
        xs: "250ms",
        md: "500ms",
      },
    },
  },
  plugins: [buttonAnimationPlugin(), headerPlugin(), textShadowPlugin()],
} satisfies Config

function buttonAnimationPlugin() {
  return plugin(function ({ addUtilities }) {
    addUtilities({
      ".button-animation": {
        border: "none",
        outline: "#535455 solid 0",
        outlineOffset: "0",
        transition: "none",
      },
      ".button-animation:hover": {
        outline: "transparent solid 5px",
        outlineOffset: "15px",
        transition:
          "outline 500ms cubic-bezier(0.25, 1, 0.5, 1), outline-offset 1000ms cubic-bezier(0.25, 1, 0.5, 1)",
      },
    })
  })
}

function headerPlugin() {
  return plugin(function ({ addUtilities }) {
    const breakpoint = settings.breakpoints.height.md
    const small = 50
    const large = 100

    addUtilities({
      ".header-based-h": {
        height: `${small}px`,
        [`@media (min-height: ${breakpoint}px)`]: {
          height: `${large}px`,
        },
      },
      ".header-based-pt": {
        "padding-top": `${small}px`,
        [`@media (min-height: ${breakpoint}px)`]: {
          "padding-top": `${large}px`,
        },
      },
      ".header-based-top": {
        top: `${small}px`,
        [`@media (min-height: ${breakpoint}px)`]: {
          top: `${large}px`,
        },
      },
    })
  })
}

function textShadowPlugin() {
  return plugin(function ({ addUtilities }) {
    addUtilities({
      ".text-shadow": {
        "text-shadow": "1px 1px 1px rgba(0, 0, 0, 0.2)",
      },
      ".text-shadow-none": {
        "text-shadow": "none",
      },
    })
  })
}
