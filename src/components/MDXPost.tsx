'use client';
import { MDXRemote } from 'next-mdx-remote';

import type { MDXPost as TMDXPost } from '@/lib/mdx';
import MDXcomponents from '@/app/mdx-components';
import { NavItem } from '@/app/const';

import { PostNavigation } from './PostNavigation';

interface MDXPostProps {
  post: TMDXPost;
  navigation: {
    prev: NavItem | null;
    next: NavItem | null;
  };
}

export function MDXPost({ post, navigation }: MDXPostProps) {
  const { mdxSource } = post;

  return (
    <div className="flex-1 flex flex-col relative">
      <article className="prose prose-gray prose-img:rounded-lg prose-img:border prose-img:opacity-100 box-border !max-w-[1064px]">
        <MDXRemote {...mdxSource} components={MDXcomponents} />
      </article>
      <footer className="mt-16 pt-8 border-gray-200 dark:border-gray-800">
        <PostNavigation prev={navigation.prev} next={navigation.next} />
      </footer>
    </div>
  );
}
