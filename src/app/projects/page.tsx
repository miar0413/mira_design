import { readdir } from 'fs/promises'
import { join } from 'path'
import Link from 'next/link'

export default async function ProjectsPage() {
  const contentsPath = join(process.cwd(), 'contents')
  const files = await readdir(contentsPath)
  const mdxFiles = files.filter(file => file.endsWith('.mdx'))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <ul className="space-y-4">
        {mdxFiles.map((file) => {
          const slug = file.replace('.mdx', '')
          return (
            <li key={slug}>
              <Link 
                href={`/projects/${slug}`}
                className="text-blue-500 hover:underline"
              >
                {slug}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
} 