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
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <article className="max-w-3xl mx-auto px-6 py-12">
          <header className="mb-16 text-center">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              {frontmatter.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              {frontmatter.readingTime && (
                <ReadingTime 
                  minutes={frontmatter.readingTime.minutes}
                  words={frontmatter.readingTime.words}
                />
              )}
            </div>
          </header>
          <div className="prose prose-lg dark:prose-invert mx-auto 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-gray-700 prose-p:dark:text-gray-300
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:dark:text-gray-100
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300
            prose-blockquote:pl-6 prose-blockquote:italic
            prose-code:text-gray-900 prose-code:dark:text-gray-100
            prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-100 prose-pre:dark:bg-gray-800
            prose-img:rounded-lg prose-img:shadow-md">
            {content}
          </div>
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <PostNavigation prev={navigation.prev} next={navigation.next} />
          </footer>
        </article>
      </div>
    </>
  )
} 