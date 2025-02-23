import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { cache } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { getReadingTime } from './readingTime';
import { flatList } from '@/app/const';

export interface Frontmatter {
  title?: string;
  date?: string;
  slug?: string;
  duration?: string;
  role?: string;
  tool?: string;
  bg?: string;
  readingTime?: {
    minutes: number;
    words: number;
  };
}

export interface MDXPost {
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  frontmatter: Frontmatter;
}

export interface PostNavigation {
  prev: Frontmatter | null;
  next: Frontmatter | null;
}

const CONTENTS_PATH = join(process.cwd(), 'src', 'contents');

// 缓存获取所有 MDX 文件的函数
export const getMDXFiles = cache(() => {
  return readdirSync(CONTENTS_PATH).filter((file) => file.endsWith('.mdx'));
});

// 获取单个 MDX 文件内容
export async function getMDXPost(slug: string): Promise<MDXPost | null> {
  try {
    const filePath = join(CONTENTS_PATH, `${slug}.mdx`);
    const source = readFileSync(filePath, 'utf-8');

    // 计算阅读时间
    const readingTime = getReadingTime(source);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content);

    return {
      mdxSource,
      frontmatter: {
        ...data,
        slug,
        readingTime,
      },
    };
  } catch (error) {
    console.error(`Error reading MDX file: ${slug}`, error);
    return null;
  }
}

// 获取所有 MDX 文件的 frontmatter
export async function getAllMDXPosts(): Promise<Frontmatter[]> {
  const files = getMDXFiles();
  const posts = [];

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const post = await getMDXPost(slug);

    if (post) {
      posts.push(post.frontmatter);
    }
  }

  return posts.sort(
    (a: Frontmatter, b: Frontmatter) =>
      new Date(b?.date || '').getTime() - new Date(a?.date || '').getTime()
  );
}

// 获取相邻的文章
export async function getPostNavigation(
  currentSlug: string
): Promise<PostNavigation> {
  const posts = flatList;
  const currentIndex = posts.findIndex((post) =>
    post.link?.includes(currentSlug)
  );

  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}
