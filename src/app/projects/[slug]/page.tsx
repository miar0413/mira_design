import { notFound } from 'next/navigation'
import { getMDXPost, getPostNavigation } from '@/lib/mdx'
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

  const navigation = await getPostNavigation(params.slug)

  return (
    <MDXPostComponent 
      post={post} 
      navigation={navigation}
    />
  )
} 