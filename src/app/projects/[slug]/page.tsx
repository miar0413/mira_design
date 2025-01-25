import { notFound } from 'next/navigation'
import { getMDXPost, getPostNavigation } from '@/lib/mdx'
import { MDXPost as MDXPostComponent } from '@/components/MDXPost'
import { use } from 'react'

interface PageProps {
    params: {
        slug: string
    }
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getMDXPost(slug)

    if (!post) {
        notFound()
    }

    const navigation = await getPostNavigation(slug)

    return (
        <MDXPostComponent
            post={post}
            navigation={navigation}
        />
    )
} 