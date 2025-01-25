import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type MDXProps<T = unknown> = {
    children?: ReactNode
    className?: string
} & T

export function useMDXComponents(components: Record<string, React.ComponentType>): Record<string, React.ComponentType> {
    return {
        ...components,
    }
} 