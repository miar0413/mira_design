/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            maxWidth: 'none',
            hr: {
              borderColor: theme('colors.gray.200'),
              marginTop: '3em',
              marginBottom: '3em',
            },
            'h1, h2, h3': {
              letterSpacing: '-0.025em',
            },
            h1: {
              marginBottom: '2rem',
            },
            h2: {
              marginTop: '3rem',
              marginBottom: '1.5rem',
            },
            h3: {
              marginTop: '2.5rem',
              marginBottom: '1rem',
            },
            'ul, ol': {
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            code: {
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.gray.100'),
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.gray.900'),
              borderRadius: '0.5rem',
              padding: '1rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
              color: 'inherit',
              fontSize: '0.875em',
            },
            blockquote: {
              fontStyle: 'italic',
              color: theme('colors.gray.600'),
              borderLeftColor: theme('colors.gray.300'),
              quotes: '""" """',
            },
            'blockquote p:first-of-type::before': {
              content: '""',
            },
            'blockquote p:last-of-type::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.100'),
            },
            blockquote: {
              color: theme('colors.gray.400'),
              borderLeftColor: theme('colors.gray.700'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 