import Link from 'next/link'
import { Frontmatter } from '@/lib/mdx'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

interface PostNavigationProps {
    prev: Frontmatter | null
    next: Frontmatter | null
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
    return (
        <nav className="flex justify-between mt-8 pt-8 border-t">
            {prev ? (
                <Link
                    href={`/projects/${prev.slug}`}
                    className="group flex items-center gap-2 hover:text-blue-500"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <div>
                        <div className="text-sm text-gray-500">上一篇</div>
                        <div className="font-medium group-hover:text-blue-500">
                            {prev.title}
                        </div>
                    </div>
                </Link>
            ) : (
                <div />
            )}

            {next ? (
                <Link
                    href={`/projects/${next.slug}`}
                    className="group flex items-center gap-2 text-right hover:text-blue-500"
                >
                    <div>
                        <div className="text-sm text-gray-500">下一篇</div>
                        <div className="font-medium group-hover:text-blue-500">
                            {next.title}
                        </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4" />
                </Link>
            ) : (
                <div />
            )}
        </nav>
    )
} 