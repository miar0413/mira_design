import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 添加 mdx 文件扩展名支持
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

// 创建 MDX 配置
const withMDX = createMDX({
  options: {
    // 如果你想要使用其他插件，可以在这里添加
    remarkPlugins: [],
    rehypePlugins: [],
  }
})

// 应用 MDX 配置
export default withMDX(nextConfig)
