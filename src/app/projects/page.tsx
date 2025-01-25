import Link from 'next/link'
import { getAllMDXPosts } from '@/lib/mdx'

export default async function ProjectsPage() {
  const posts = await getAllMDXPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <h2 className="text-2xl font-bold mb-2">
              <Link 
                href={`/projects/${post.slug}`}
                className="hover:text-blue-500"
              >
                {post.title}
              </Link>
            </h2>
            <time className="text-gray-500">
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </time>
          </article>
        ))}
      </div>
    </div>
  )
}

export const themeConfig = {
  // 背景色
  background: {
    primary: 'bg-white dark:bg-gray-900',
    secondary: 'bg-gray-50 dark:bg-gray-800',
    overlay: 'bg-white/80 dark:bg-gray-900/90',
  },
  
  // 文本颜色
  text: {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-600 dark:text-gray-300',
    accent: 'text-blue-600 dark:text-blue-400',
  },
  
  // 边框
  border: {
    primary: 'border-gray-200 dark:border-gray-800',
    secondary: 'border-gray-200/80 dark:border-gray-800/80',
  },
  
  // 悬浮效果
  hover: {
    bg: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    text: 'hover:text-blue-600 dark:hover:text-blue-400',
  },
  
  // 卡片
  card: {
    bg: 'bg-white dark:bg-gray-800',
    border: 'border-gray-200 dark:border-gray-700',
    shadow: 'shadow-sm hover:shadow-lg',
  },
  
  // 按钮
  button: {
    primary: `
      bg-blue-600 dark:bg-blue-500 
      text-white
      hover:bg-blue-700 dark:hover:bg-blue-600
    `,
    secondary: `
      bg-gray-100 dark:bg-gray-800 
      text-gray-900 dark:text-gray-100
      hover:bg-gray-200 dark:hover:bg-gray-700
    `,
  },
  
  // 过渡效果
  transition: {
    colors: 'transition-colors duration-200',
    transform: 'transition-transform duration-200',
    all: 'transition-all duration-300',
  },
  
  // 渐变
  gradient: {
    text: 'bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent',
  },
  
  // 特效
  effects: {
    blur: 'backdrop-blur-sm',
  }
};