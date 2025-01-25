/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            // 基础文本颜色
            '--tw-prose-body': theme('colors.gray[700]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-lead': theme('colors.gray[600]'),
            '--tw-prose-bold': theme('colors.gray[900]'),

            // 链接样式
            '--tw-prose-links': theme('colors.blue[600]'),
            '--tw-prose-links-hover': theme('colors.blue[700]'),

            // 列表和引用
            '--tw-prose-bullets': theme('colors.gray[600]'),
            '--tw-prose-counters': theme('colors.gray[600]'),
            '--tw-prose-quote': theme('colors.gray[700]'),
            '--tw-prose-quote-borders': theme('colors.gray[300]'),

            // 代码相关
            '--tw-prose-code': theme('colors.gray[900]'),
            '--tw-prose-code-bg': theme('colors.gray[100]'),
            '--tw-prose-pre-code': theme('colors.gray[800]'),
            '--tw-prose-pre-bg': theme('colors.gray[50]'),
            '--tw-prose-pre-border': theme('colors.gray[200]'),

            // 表格相关
            '--tw-prose-th-borders': theme('colors.gray[300]'),
            '--tw-prose-td-borders': theme('colors.gray[200]'),

            // 分割线和描述文字
            '--tw-prose-hr': theme('colors.gray[200]'),
            '--tw-prose-captions': theme('colors.gray[500]'),

            // 自定义样式覆盖
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },

            // 代码块样式优化
            'pre': {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              borderRadius: theme('borderRadius.lg'),
              padding: theme('spacing.4'),
              boxShadow: theme('boxShadow.sm'),
              border: '1px solid var(--tw-prose-pre-border)',
            },

            // 行内代码样式
            ':not(pre) > code': {
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              backgroundColor: 'var(--tw-prose-code-bg)',
              border: `1px solid ${theme('colors.gray[200]')}`,
              fontSize: '0.875em',
              fontWeight: '500',
            },

            // 引用块样式
            'blockquote': {
              borderLeftWidth: '4px',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              backgroundColor: theme('colors.gray[50]'),
              padding: '1rem',
              borderRadius: '0.375rem',
              color: 'var(--tw-prose-quote)',
              fontStyle: 'normal',
            },

            // 标题样式优化
            'h1, h2, h3, h4': {
              fontWeight: '600',
              letterSpacing: '-0.025em',
              'scroll-margin-top': '6rem',
            },
            'h1': {
              fontSize: '2.25em',
              marginBottom: '1.5rem',
            },
            'h2': {
              fontSize: '1.875em',
              marginTop: '2.5rem',
              marginBottom: '1.25rem',
            },
            'h3': {
              fontSize: '1.5em',
              marginTop: '2rem',
              marginBottom: '1rem',
            },

            // 链接悬停效果
            'a': {
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.blue[200]')}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderBottomColor: theme('colors.blue[600]'),
              },
            },

            // 列表样式优化
            'ul, ol': {
              paddingLeft: '1.5rem',
              'li': {
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                '&::marker': {
                  color: 'var(--tw-prose-bullets)',
                },
              },
            },

            // 图片样式
            'img': {
              borderRadius: theme('borderRadius.lg'),
              boxShadow: theme('boxShadow.md'),
            },

            // 段落样式
            'p': {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              lineHeight: '1.75',
            },
          },
        },
        invert: {
          css: {
            // 基础文本颜色
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray[300]'),
            '--tw-prose-bold': theme('colors.white'),

            // 链接样式
            '--tw-prose-links': theme('colors.sky[400]'),
            '--tw-prose-links-hover': theme('colors.sky[300]'),

            // 列表和引用
            '--tw-prose-bullets': theme('colors.gray[400]'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-quote': theme('colors.gray[300]'),
            '--tw-prose-quote-borders': theme('colors.gray[600]'),

            // 代码相关
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-code-bg': theme('colors.gray[800]/80'),
            '--tw-prose-pre-code': theme('colors.gray[200]'),
            '--tw-prose-pre-bg': theme('colors.gray[900]'),
            '--tw-prose-pre-border': theme('colors.gray[700]'),

            // 表格相关
            '--tw-prose-th-borders': theme('colors.gray[600]'),
            '--tw-prose-td-borders': theme('colors.gray[700]'),

            // 分割线和描述文字
            '--tw-prose-hr': theme('colors.gray[700]'),
            '--tw-prose-captions': theme('colors.gray[400]'),

            // 自定义样式覆盖
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },

            // 代码块样式优化
            'pre': {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              borderRadius: theme('borderRadius.lg'),
              padding: theme('spacing.4'),
              boxShadow: theme('boxShadow.md'),
              border: '1px solid var(--tw-prose-pre-border)',
            },

            // 行内代码样式
            ':not(pre) > code': {
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              backgroundColor: 'var(--tw-prose-code-bg)',
              border: `1px solid ${theme('colors.gray[700]')}`,
              wordBreak: 'break-word',
            },

            // 引用块样式
            'blockquote': {
              borderLeftWidth: '4px',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              backgroundColor: theme('colors.gray[800]/30'),
              padding: '1rem',
              borderRadius: '0.375rem',
            },

            // 标题样式优化
            'h1, h2, h3, h4': {
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },

            // 链接悬停效果
            'a:hover': {
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.sky[400]')}`,
            },

            // 列表样式优化
            'ul, ol': {
              'li::marker': {
                color: 'var(--tw-prose-bullets)',
              },
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