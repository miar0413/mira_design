import { MDXPost } from '@/lib/mdx'

interface MDXPostProps {
  post: MDXPost
}

export function MDXPost({ post }: MDXPostProps) {
  const { content, frontmatter } = post

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
        <time className="text-gray-500">
          {new Date(frontmatter.date).toLocaleDateString('zh-CN')}
        </time>
      </header>
      <div className="prose dark:prose-invert">
        {content}
      </div>
    </article>
  )
} 