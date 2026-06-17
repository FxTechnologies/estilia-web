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
        brand: {
          DEFAULT: "#875aa0",
          soft:    "#4a2970",
          light:   "#c4a4d8",
          50:      "#f5eefb",
          100:     "#e8d8f5",
        },
        gold: {
          DEFAULT: "#d3b87f",
          dark:    "#b8943e",
          light:   "#e8d4a8",
          50:      "#fdf8ee",
        },
        ink: {
          DEFAULT: "#1c1622",
          muted:   "#6b5585",
          faint:   "#9d8ab0",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans:  ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
