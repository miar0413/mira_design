import { notFound } from 'next/navigation'
import { getMDXPost, getPostNavigation } from '@/lib/mdx'
import { MDXPost as MDXPostComponent } from '@/components/MDXPost'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ReadingProgress } from '@/components/ReadingProgress'
import { glob } from 'glob'
import path from 'path'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    // 获取 projects 目录下所有的 .mdx 文件
    const files = await glob('content/projects/*.mdx')

    // 将文件路径转换为 slug 参数
    return files.map((file: string) => ({
        slug: path.basename(file, '.mdx')
    }))
}


export default async function ProjectPage(props: PageProps) {
    const params = await props.params;
    const post = await getMDXPost(params.slug)

    if (!post) {
        notFound()
    }

    const navigation = await getPostNavigation(params.slug)

    return (
        <>
            <ReadingProgress />
            <Breadcrumb />
            <MDXPostComponent
                post={post}
                navigation={navigation}
            />
        </>
    )
} 