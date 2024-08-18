/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Deep blue
          light: '#93C5FD',
          dark: '#1D4ED8',
        },
        background: {
          light: '#1F2937', // Dark gray background
          DEFAULT: '#111827', // Even darker for sections
        },
        text: {
          DEFAULT: '#F9FAFB', // Light gray text
          muted: '#D1D5DB', // Muted gray for secondary text
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
