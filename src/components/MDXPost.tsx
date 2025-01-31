'use client';
import { MDXRemote } from 'next-mdx-remote';

import type { MDXPost as TMDXPost } from '@/lib/mdx';
import MDXcomponents from '@/app/mdx-components';

import { PostNavigation } from './PostNavigation';
import { ReadingProgress } from './ReadingProgress';
import { ReadingTime } from './ReadingTime';
import { Breadcrumb } from './Breadcrumb';

interface MDXPostProps {
  post: TMDXPost;
  navigation: {
    prev: TMDXPost['frontmatter'] | null;
    next: TMDXPost['frontmatter'] | null;
  };
}

export function MDXPost({ post, navigation }: MDXPostProps) {
  const { mdxSource, frontmatter } = post;

  return (
    <>
      <ReadingProgress />
      <Breadcrumb />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <article className="max-w-3xl mx-auto px-6 py-8">
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              {frontmatter.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter?.date || '').toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
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

          <MDXRemote {...mdxSource} components={MDXcomponents} />

          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <PostNavigation prev={navigation.prev} next={navigation.next} />
          </footer>
        </article>
      </div>
    </>
  );
}
