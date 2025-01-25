import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MDXProps {
  children: ReactNode
  href?: string
  className?: string
}

export function useMDXComponents(components: Record<string, React.ComponentType>): Record<string, React.ComponentType> {
  return {
    h1: ({ children, className }: MDXProps) => (
      <h1 className={cn(
        "text-4xl font-bold mb-6 mt-12 first:mt-0",
        className
      )}>
        {children}
      </h1>
    ),
    h2: ({ children, className }: MDXProps) => (
      <h2 className={cn(
        "text-3xl font-bold mb-4 mt-10",
        className
      )}>
        {children}
      </h2>
    ),
    h3: ({ children, className }: MDXProps) => (
      <h3 className={cn(
        "text-2xl font-semibold mb-3 mt-8",
        className
      )}>
        {children}
      </h3>
    ),
    p: ({ children, className }: MDXProps) => (
      <p className={cn(
        "mb-6 leading-7 text-gray-800 dark:text-gray-200",
        className
      )}>
        {children}
      </p>
    ),
    ul: ({ children, className }: MDXProps) => (
      <ul className={cn(
        "list-disc pl-6 mb-6 space-y-2",
        className
      )}>
        {children}
      </ul>
    ),
    ol: ({ children, className }: MDXProps) => (
      <ol className={cn(
        "list-decimal pl-6 mb-6 space-y-2",
        className
      )}>
        {children}
      </ol>
    ),
    li: ({ children, className }: MDXProps) => (
      <li className={cn(
        "text-gray-800 dark:text-gray-200",
        className
      )}>
        {children}
      </li>
    ),
    a: ({ children, href, className }: MDXProps) => (
      <a 
        href={href} 
        className={cn(
          "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline",
          className
        )}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, className }: MDXProps) => (
      <blockquote className={cn(
        "border-l-4 border-gray-200 dark:border-gray-700 pl-4 mb-6 italic text-gray-700 dark:text-gray-300",
        className
      )}>
        {children}
      </blockquote>
    ),
    code: ({ children, className }: MDXProps) => (
      <code className={cn(
        "bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono",
        className
      )}>
        {children}
      </code>
    ),
    pre: ({ children, className }: MDXProps) => (
      <pre className={cn(
        "bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto",
        className
      )}>
        {children}
      </pre>
    ),
    ...components,
  }
} 