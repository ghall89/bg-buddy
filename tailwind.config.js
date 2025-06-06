/** @type {import('tailwindcss').Config} */
import { heroui } from '@heroui/theme';

const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  darkMode: 'class',
  plugins: [heroui()],
};

export default config;
