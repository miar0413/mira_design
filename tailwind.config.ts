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
    },
  },
  plugins: [
    require('@hyeon/mac-scrollbar'),
    require('@tailwindcss/typography'),
  ],
};
