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
        cream: {
          DEFAULT: "#F5F0E8",
          light: "#FAF7F2",
          dark: "#EDE5D8",
        },
        stone: {
          DEFAULT: "#E4DACB",
          light: "#ECE4D8",
          dark: "#D7CABC",
        },
        clay: {
          DEFAULT: "#B8A38C",
          light: "#C6B5A1",
          dark: "#9E8870",
        },
        ink: {
          DEFAULT: "#1E1A17",
          light: "#36302B",
          muted: "#5A524A",
          subtle: "#7E756B",
        },
        plum: {
          DEFAULT: "#4A1D26",
          hover: "#3B161E",
          deep: "#2D1016",
          light: "#662834",
        },
        blush: {
          DEFAULT: "#E8C9CB",
          light: "#F4DFE1",
          dark: "#D8AEB1",
          tint: "#FBF3F4",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
        site: "1280px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.03em",
        wider: "0.06em",
        widest: "0.12em",
      },
      borderRadius: {
        pill: "9999px",
        editorial: "16px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(30, 26, 23, 0.06)",
        card: "0 14px 40px rgba(30, 26, 23, 0.08)",
        plum: "0 8px 25px rgba(74, 29, 38, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
