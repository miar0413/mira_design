'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRightIcon } from '@radix-ui/react-icons'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0% 0% -80% 0%',
        threshold: 1.0,
      }
    )

    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="fixed top-20 right-8 w-64 hidden xl:block">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full mb-4 hover:text-blue-500"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </motion.div>
          <h2 className="text-lg font-semibold">目录</h2>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && items.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <ul className="space-y-2 max-h-[calc(100vh-12rem)] overflow-auto">
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
                  >
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        'block py-1 text-sm transition-colors hover:text-blue-500',
                        activeId === item.id
                          ? 'text-blue-500 font-medium'
                          : 'text-gray-600 dark:text-gray-300'
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(item.id)?.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }}
                    >
                      {item.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
} 