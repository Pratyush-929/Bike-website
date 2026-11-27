import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#06130e",
          900: "#0d211a",
          800: "#133529",
          700: "#1d4c3c",
          600: "#276550",
          500: "#36886c",
          400: "#4cb08e",
          300: "#7bd0b3",
          100: "#dcf2e9",
          50: "#f0f9f5",
        },
        charcoal: {
          950: "#0b0d10",
          900: "#111418",
          850: "#171b21",
          800: "#1d222a",
          750: "#242a34",
          700: "#2d3542",
          600: "#434e60",
          500: "#606d83",
          400: "#8e9bb0",
          300: "#bcc6d6",
          200: "#e0e5ee",
          100: "#f1f3f7",
          50: "#f8f9fb",
        },
        blaze: {
          50: "#fff7ed",
          100: "#ffedd5",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        limeaccent: {
          400: "#a3e635",
          500: "#84cc16",
          600: "#65a30d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 12px 32px -4px rgba(0, 0, 0, 0.6)",
        glow: "0 0 25px -5px rgba(249, 115, 22, 0.3)",
        "glow-forest": "0 0 25px -5px rgba(54, 136, 108, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
