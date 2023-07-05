import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@beskar-labs/gravity/**/*.js',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          pre: {
            margin: 0,
            backgroundColor: theme('colors.black'),
            borderRadius: '11px',
            display: 'grid',
            '& > code': {
              display: 'grid',
              minWidth: '100%',
              overflowWrap: 'break-word',
              padding: 0,
            },
          },
          code: {
            backgroundColor: theme('colors.neutral.900'),
            borderRadius: theme('borderRadius.md'),
            paddingLeft: theme('padding.2'),
            paddingRight: theme('padding.2'),
            paddingTop: theme('padding.1'),
            paddingBottom: theme('padding.1'),
            counterReset: 'line',
            fontWeight: theme('fontWeight.normal'),
            '&::before': {
              display: 'none',
            },
            '&::after': {
              display: 'none',
            },
            '& > span': {
              display: 'inline-block',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
