import { notFound } from 'next/navigation'
import { getMDXPost } from '@/lib/mdx'
import { MDXPost as MDXPostComponent } from '@/components/MDXPost'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const post = await getMDXPost(params.slug)

  if (!post) {
    notFound()
  }

  return <MDXPostComponent post={post} />
} 