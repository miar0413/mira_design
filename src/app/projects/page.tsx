import Link from 'next/link'
import { getAllMDXPosts } from '@/lib/mdx'
import { Breadcrumb } from '@/components/Breadcrumb'

export default async function ProjectsPage() {
    const posts = await getAllMDXPosts()

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Projects</h1>
            <div className="space-y-6">
                {posts.map((post) => (
                    <article key={post.slug} className="border-b pb-6">
                        <h2 className="text-2xl font-bold mb-2">
                            <Link
                                href={`/projects/${post.slug}`}
                                className="hover:text-blue-500"
                            >
                                {post.title}
                            </Link>
                        </h2>
                        <time className="text-gray-500">
                            {new Date(post.date).toLocaleDateString('zh-CN')}
                        </time>
                    </article>
                ))}
            </div>
        </div>
    )
}
