'use client';
import { MDXRemote } from 'next-mdx-remote';

import type { MDXPost as TMDXPost } from '@/lib/mdx';
import MDXcomponents from '@/app/mdx-components';

import { PostNavigation } from './PostNavigation';

interface MDXPostProps {
  post: TMDXPost;
  navigation: {
    prev: TMDXPost['frontmatter'] | null;
    next: TMDXPost['frontmatter'] | null;
  };
}

export function MDXPost({ post, navigation }: MDXPostProps) {
  const { mdxSource } = post;

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <article className="max-w-4xl box-border">
          <MDXRemote {...mdxSource} components={MDXcomponents} />
        </article>
        <footer className="mt-16 pt-8 border-gray-200 dark:border-gray-800">
          <PostNavigation prev={navigation.prev} next={navigation.next} />
        </footer>
      </div>
    </>
  );
}
