import { notFound } from 'next/navigation'
import { getMDXPost, getPostNavigation } from '@/lib/mdx'
import { MDXPost as MDXPostComponent } from '@/components/MDXPost'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ReadingProgress } from '@/components/ReadingProgress'

interface PageProps {
    params: Promise<{
        slug: string
    }>
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