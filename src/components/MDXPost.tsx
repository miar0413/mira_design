import type { MDXPost as TMDXPost } from '@/lib/mdx'
import { PostNavigation } from './PostNavigation'
import { ReadingProgress } from './ReadingProgress'
import { ReadingTime } from './ReadingTime'

interface MDXPostProps {
  post: TMDXPost
  navigation: {
    prev: TMDXPost['frontmatter'] | null
    next: TMDXPost['frontmatter'] | null
  }
}

export function MDXPost({ post, navigation }: MDXPostProps) {
  const { content, frontmatter } = post

  return (
    <>
      <ReadingProgress />
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
          <div className="flex items-center gap-4">
            <time className="text-gray-500">
              {new Date(frontmatter.date).toLocaleDateString('zh-CN')}
            </time>
            {frontmatter.readingTime && (
              <ReadingTime 
                minutes={frontmatter.readingTime.minutes}
                words={frontmatter.readingTime.words}
              />
            )}
          </div>
        </header>
        <div className="prose dark:prose-invert">
          {content}
        </div>
        <PostNavigation prev={navigation.prev} next={navigation.next} />
      </article>
    </>
  )
} 