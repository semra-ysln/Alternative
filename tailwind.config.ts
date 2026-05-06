import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Gece modu desteği için kritik[cite: 2]
  theme: {
    extend: {
      colors: {
        lyraBlue: {
          DEFAULT: "#0055ff", // Görseldeki canlı mavi tonu[cite: 2]
          dark: "#0044cc",
        },
        slate: {
          950: "#020617", // Koyu tema için özel slate tonu[cite: 2]
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem', // Tasarımdaki çok yuvarlak köşeler için[cite: 2]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;