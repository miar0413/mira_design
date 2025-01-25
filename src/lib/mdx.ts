import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cache } from 'react'

export interface Frontmatter {
  title: string
  date: string
  slug: string
  [key: string]: any
}

export interface MDXPost {
  content: React.ReactElement
  frontmatter: Frontmatter
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
        slug
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