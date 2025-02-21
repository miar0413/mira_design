/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        Quark: ['Quark', 'sans-serif'], // 替换为你的字体名称
        Lato: ['Lato', 'sans-serif'], // 替换为你的字体名称
      },
      writingMode: {
        'vertical-rl': 'vertical-rl', // 文字从上到下，行从右到左
        'vertical-lr': 'vertical-lr', // 文字从上到下，行从左到右
      },
      textOrientation: {
        upright: 'upright', // 字符正立
        sideways: 'sideways', // 字符侧立
      },
      colors: {
        'custom-bg': '#FF5733', // 自定义背景颜色
      },
      keyframes: {
        scrollText: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(calc(-100% + 800px))' },
        },
        fadeIn: {
          '0%': {
            transform: 'translate3d(0px, 0px, 0px) scale3d(0.9, 0.9, 1)',
            opacity: 0,
          },
          '100%': {
            transform:
              'translate3d(0px, 0px, 0px) scale3d(1.04168, 1.04168, 1)',
            opacity: 1,
          },
        },
        zoomIn: {
          '0%': {
            transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',
            opacity: 0,
          },
          '100%': {
            transform: 'translate3d(0px, 0px, 0px) scale3d(1.1, 1.1, 1)',
            opacity: 1,
          },
        },
      },
      animation: {
        scrollText: 'scrollText 14s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'zoom-in': 'zoomIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@hyeon/mac-scrollbar'),
    require('@tailwindcss/typography'),
  ],
};
