import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#0D0D0D",
        "medium-gray": "#121212",
        "light-gray": "#3D3D3D",
        "primary-blue": "#1475E6",
        "secondary-blue": "#60A7FB",
        "light-white": "#D9D9D9",
        "medium-white": "#9F9F9F",
      },
    },
  },
  plugins: [],
};

export default config;
