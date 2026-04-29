import path from 'path';
import fs from 'fs/promises';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

import { getMDXPost, getPostNavigation } from '@/lib/mdx';
import { MDXPost as MDXPostComponent } from '@/components/MDXPost';
import Header from '@/components/Header';
import ProjectDetailScroll from '@/components/ProjectDetailScroll';

import styles from './page.module.css';

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
    <ProjectDetailScroll>
      <div className={styles.bgLayer} aria-hidden="true">
        <Image
          src={'/cross_bg.svg'}
          width="1250"
          height={900}
          alt="bg"
          className={styles.bgImage}
        />
      </div>
      <Header isDetailPage={true} theme="dark" />
      <main className={styles.frame}>
        <div className={styles.grid}>
          <aside className={styles.backRail}>
            <Link href="/" className={styles.backLink}>
              <ArrowLeftIcon width={24} height={24} />
              Back
            </Link>
          </aside>
          <div className={styles.articleColumn}>
            <div className={styles.articlePanel}>
              {post.frontmatter.readingTime ? (
                <div className="mb-8 flex flex-wrap items-center gap-3 font-Quark text-[12px] uppercase leading-none tracking-[0.18em] text-white/[0.46]">
                  <span>Mira project</span>
                  <span className="h-px w-8 bg-white/[0.16]" />
                  <span>
                    {Math.ceil(post.frontmatter.readingTime.minutes)} min read
                  </span>
                </div>
              ) : null}
              <MDXPostComponent post={post} navigation={navigation} />
            </div>
          </div>
        </div>
      </main>
    </ProjectDetailScroll>
  );
}
