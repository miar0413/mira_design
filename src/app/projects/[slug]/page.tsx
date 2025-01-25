import { notFound } from 'next/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: PageProps) {
  try {
    const filePath = join(process.cwd(), 'contents', `${params.slug}.mdx`)
    const source = readFileSync(filePath, 'utf-8')
    
    const { content, frontmatter } = await compileMDX({
      source,
      options: { parseFrontmatter: true }
    })

    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose dark:prose-invert">
          {content}
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
} 