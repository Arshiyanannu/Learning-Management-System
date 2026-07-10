/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Simple custom color palette used across the app
        primary: {
          DEFAULT: '#4F46E5', // indigo - main brand color
          dark: '#4338CA',
          light: '#6366F1',
        },
        secondary: '#0EA5E9', // sky blue - used for accents
      },
    },
  },
  plugins: [],
};
