import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@beskar-labs/gravity/**/*.js',
  ],
  theme: {},
  plugins: [typography],
};

export default config;
