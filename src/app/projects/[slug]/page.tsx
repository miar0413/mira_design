import path from 'path';
import fs from 'fs/promises';

import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getMDXPost, getPostNavigation } from '@/lib/mdx';
import { MDXPost as MDXPostComponent } from '@/components/MDXPost';
import Header from '@/components/Header';
import { navList } from '@/app/const';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // 获取 projects 目录下所有的 .mdx 文件
  const docsDir = path.join(process.cwd(), 'src', 'contents'); // 使用 process.cwd() 来获取正确的路径
  const files = await fs.readdir(docsDir);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
    }));
}

export default async function ProjectPage(props: PageProps) {
  const params = await props.params;
  const post = await getMDXPost(params.slug);

  if (!post) {
    notFound();
  }

  const navigation = await getPostNavigation(params.slug);

  return (
    <>
      <div className="flex mx-auto max-w-7xl">
        <div className="flex-1">
          <MDXPostComponent post={post} navigation={navigation} />
        </div>
      </div>
    </>
  );
}
