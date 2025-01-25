import { notFound } from 'next/navigation'
import { getMDXPost, getPostNavigation } from '@/lib/mdx'
import { MDXPost as MDXPostComponent } from '@/components/MDXPost'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ReadingProgress } from '@/components/ReadingProgress'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))



interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    // 获取 projects 目录下所有的 .mdx 文件
    const projectsDir = path.join(__dirname, '../../../content')
    const files = await fs.readdir(projectsDir)

    return files
        .filter(file => file.endsWith('.mdx'))
        .map(file => ({
            slug: file.replace(/\.mdx$/, '')
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