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
          DEFAULT: '#3B82F6', 
          light: '#93C5FD', 
          dark: '#1D4ED8',   
        },
        background: {
          light: '#1F2937',  
          DEFAULT: '#111827', 
          dark: '#0F172A',   
        },
        text: {
          DEFAULT: '#F9FAFB', 
          muted: '#D1D5DB',  
          dark: '#E5E7EB',   
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
