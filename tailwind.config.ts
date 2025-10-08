import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        lalezar: ["Lalezar", "sans-serif"],
      },
      colors: {
        // Light theme
        light: {
          primary: "#2563EB",
          primaryHover: "#1D4ED8",
          secondary: "#0EA5E9",
          secondaryHover: "#0284C7",
          accent: "#10B981",
          accentHover: "#059669",
          danger: "#EF4444",
          warning: "#F59E0B",
        },
        // Dark theme
        dark: {
          primary: "#3B82F6",
          primaryHover: "#60A5FA",
          secondary: "#06B6D4",
          secondaryHover: "#22D3EE",
          accent: "#10B981",
          accentHover: "#34D399",
          danger: "#F87171",
          warning: "#FBBF24",
        },
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'scan': 'scan 3s linear infinite',
        'orbit': 'orbit 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'ripple': 'ripple 0.5s ease-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

