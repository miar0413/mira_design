import type { ComponentProps, ReactNode } from 'react'

interface MDXProps {
  children: ReactNode
  href?: string
}

export function useMDXComponents(components: Record<string, React.ComponentType>): Record<string, React.ComponentType> {
  return {
    h1: ({ children }: MDXProps) => (
      <h1 className="text-4xl font-bold mb-6">{children}</h1>
    ),
    h2: ({ children }: MDXProps) => (
      <h2 className="text-2xl font-bold mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }: MDXProps) => (
      <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>
    ),
    p: ({ children }: MDXProps) => (
      <p className="mb-4 leading-7">{children}</p>
    ),
    ul: ({ children }: MDXProps) => (
      <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>
    ),
    li: ({ children }: MDXProps) => (
      <li>{children}</li>
    ),
    a: ({ children, href }: MDXProps) => (
      <a href={href} className="text-blue-500 hover:underline">
        {children}
      </a>
    ),
    ...components,
  }
} 