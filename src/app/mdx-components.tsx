import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type MDXProps<T = unknown> = {
    children?: ReactNode
    className?: string
} & T

export function useMDXComponents(components: Record<string, React.ComponentType>): Record<string, React.ComponentType> {
    return {
        h1: ({ children, className, ...props }: ComponentProps<'h1'>) => (
            <h1 className={cn(
                "text-4xl font-bold mb-6 mt-12 first:mt-0",
                className
            )} {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, className, ...props }: ComponentProps<'h2'>) => (
            <h2 className={cn(
                "text-3xl font-bold mb-4 mt-10",
                className
            )} {...props}>
                {children}
            </h2>
        ),
        h3: ({ children, className, ...props }: ComponentProps<'h3'>) => (
            <h3 className={cn(
                "text-2xl font-semibold mb-3 mt-8",
                className
            )} {...props}>
                {children}
            </h3>
        ),
        p: ({ children, className, ...props }: ComponentProps<'p'>) => (
            <p className={cn(
                "mb-6 leading-7 text-gray-800 dark:text-gray-200",
                className
            )} {...props}>
                {children}
            </p>
        ),
        ul: ({ children, className, ...props }: ComponentProps<'ul'>) => (
            <ul className={cn(
                "list-disc pl-6 mb-6 space-y-2",
                className
            )} {...props}>
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
        li: ({ children, className, ...props }: ComponentProps<'li'>) => (
            <li className={cn(
                "text-gray-800 dark:text-gray-200",
                className
            )} {...props}>
                {children}
            </li>
        ),
        // @
        a: ({ children, href, className, ...props }: ComponentProps<'a'>) => (
            <Link
                href={href ?? ''}
                className={cn(
                    "font-medium text-primary hover:underline",
                    className
                )}
                {...props}
            >
                {children}
            </Link>
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