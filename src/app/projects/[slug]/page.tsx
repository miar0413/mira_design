import path from 'path';
import fs from 'fs/promises';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

import { getMDXPost, getPostNavigation } from '@/lib/mdx';
import { MDXPost as MDXPostComponent } from '@/components/MDXPost';
import Header from '@/components/Header';

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
    <div className="mac-scrollbar mac-scrollbar-x mac-scrollbar-y h-screen">
      <div className="top-0 bottom-0 left-0 right-0 opacity-30 z-[-1] flex items-center justify-center fixed">
        <Image
          src={'/cross_bg.svg'}
          width="1250"
          height={900}
          alt="bg"
          className="w-full h-full"
        />
      </div>
      <Header isDetailPage={true} />
      <div className={`bg-${post?.frontmatter?.bg || ''}`}>
        <div className="flex mx-auto max-w-7xl box-border px-[60px] pt-[60px] gap-8 bg">
          <div className="flex justify-center hover:text-[#c4c4c4] cursor-pointer">
            <Link href="/" className="flex gap-1 font-bold font-Quark">
              <ArrowLeftIcon width={24} height={24} />
              Back
            </Link>
          </div>
          <div className="flex-1">
            <MDXPostComponent post={post} navigation={navigation} />
          </div>
        </div>
      </div>
    </div>
  );
}
