'use client';
import { MDXRemote } from 'next-mdx-remote';

import type { MDXPost as TMDXPost } from '@/lib/mdx';
import MDXcomponents from '@/app/mdx-components';
import { NavItem } from '@/app/const';

import { PostNavigation } from './PostNavigation';
import styles from './MDXPost.module.css';

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
    <div className={`${styles.content} flex-1 flex flex-col relative`}>
      <article className="prose prose-invert box-border !max-w-none prose-headings:font-Quark prose-headings:leading-[0.98] prose-headings:text-[#f4f1ea] prose-h1:mb-10 prose-h1:max-w-[980px] prose-h1:text-[clamp(3.1rem,8vw,7rem)] prose-h1:font-bold prose-h2:mt-20 prose-h2:border-t prose-h2:border-white/10 prose-h2:pt-10 prose-h2:text-[clamp(2rem,4vw,3.6rem)] prose-h3:mt-12 prose-h3:text-[clamp(1.45rem,2.5vw,2.2rem)] prose-p:max-w-[780px] prose-p:font-Lato prose-p:text-[clamp(1rem,1.2vw,1.12rem)] prose-p:leading-[1.85] prose-p:text-white/[0.68] prose-strong:text-white prose-ul:max-w-[780px] prose-ol:max-w-[780px] prose-li:font-Lato prose-li:leading-[1.75] prose-li:text-white/[0.68] prose-blockquote:max-w-[780px] prose-blockquote:border-white/[0.18] prose-blockquote:text-white/[0.52] prose-code:font-Lato prose-img:my-10 prose-img:w-full prose-img:rounded-[24px] prose-img:border prose-img:border-white/10 prose-img:opacity-100 prose-img:shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
        <MDXRemote {...mdxSource} components={MDXcomponents} />
      </article>
      <footer className="mt-20">
        <PostNavigation prev={navigation.prev} next={navigation.next} />
      </footer>
    </div>
  );
}
