'use client';
import { MDXRemote } from 'next-mdx-remote';

import type { MDXPost as TMDXPost } from '@/lib/mdx';
import MDXcomponents from '@/app/mdx-components';

interface MDXPostProps {
  post: TMDXPost;
  navigation: {
    prev: TMDXPost['frontmatter'] | null;
    next: TMDXPost['frontmatter'] | null;
  };
}

export function MDXPost({ post }: MDXPostProps) {
  const { mdxSource } = post;

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <article className="max-w-4xl box-border">
          <MDXRemote {...mdxSource} components={MDXcomponents} />
        </article>
      </div>
    </>
  );
}
