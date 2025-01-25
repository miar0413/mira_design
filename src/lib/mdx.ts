import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cache } from 'react'
import { getReadingTime } from './readingTime'

export interface Frontmatter {
  title: string
  date: string
  slug: string
  readingTime?: {
    minutes: number
    words: number
  }
}

export interface MDXPost {
  content: React.ReactElement
  frontmatter: Frontmatter
}

export interface PostNavigation {
  prev: Frontmatter | null
  next: Frontmatter | null
}

const CONTENTS_PATH = join(process.cwd(), 'contents')

// 缓存获取所有 MDX 文件的函数
export const getMDXFiles = cache(() => {
  return readdirSync(CONTENTS_PATH)
    .filter(file => file.endsWith('.mdx'))
})

// 获取单个 MDX 文件内容
export async function getMDXPost(slug: string): Promise<MDXPost | null> {
  try {
    const filePath = join(CONTENTS_PATH, `${slug}.mdx`)
    const source = readFileSync(filePath, 'utf-8')

    // 计算阅读时间
    const readingTime = getReadingTime(source)

    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source,
      options: {
        parseFrontmatter: true,
      }
    })

    return {
      content,
      frontmatter: {
        ...frontmatter,
        slug,
        readingTime
      }
    }
  } catch (error) {
    console.error(`Error reading MDX file: ${slug}`, error)
    return null
  }
}

// 获取所有 MDX 文件的 frontmatter
export async function getAllMDXPosts(): Promise<Frontmatter[]> {
  const files = getMDXFiles()
  const posts = []

  for (const file of files) {
    const slug = file.replace('.mdx', '')
    const post = await getMDXPost(slug)
    if (post) {
      posts.push(post.frontmatter)
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 获取相邻的文章
export async function getPostNavigation(currentSlug: string): Promise<PostNavigation> {
  const posts = await getAllMDXPosts()
  const currentIndex = posts.findIndex(post => post.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  }
} 