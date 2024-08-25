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
          DEFAULT: '#3B82F6', // Deep blue, основной цвет для акцентов
          light: '#93C5FD',  // Светлый оттенок для акцентов
          dark: '#1D4ED8',   // Темный оттенок для акцентов
        },
        background: {
          light: '#1F2937',  // Темно-серый фон для секций
          DEFAULT: '#111827', // Основной темный фон
          dark: '#0F172A',    // Ещё более темный фон для более глубоких слоёв
        },
        text: {
          DEFAULT: '#F9FAFB', // Основной цвет текста (светло-серый)
          muted: '#D1D5DB',   // Цвет для второстепенного текста (ослабленный серый)
          dark: '#E5E7EB',    // Темный оттенок для текста на светлом фоне
        },
      },
      // Дополнительные настройки шрифтов, отступов и т.д. можно добавить здесь
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
