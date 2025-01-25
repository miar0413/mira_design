'use client'

import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = () => {
            if (theme === 'system') {
                document.documentElement.classList.toggle('dark', mediaQuery.matches)
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [theme])

    if (!mounted) {
        return (
            <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
        )
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
                        flex items-center justify-center 
                        rounded-md 
                        hover:bg-gray-100 dark:hover:bg-gray-800 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                        transition-all
                        active:scale-95"
                    aria-label="切换主题"
                >
                    {theme === 'light' && <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {theme === 'dark' && <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {theme === 'system' && <DesktopIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[8rem] sm:min-w-[9rem] md:min-w-[10rem]
                        rounded-lg p-1.5 
                        bg-white dark:bg-gray-800 
                        shadow-lg 
                        border border-gray-200 dark:border-gray-700
                        backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90
                        animate-in slide-in-from-top-2 
                        z-50"
                    align="end"
                    sideOffset={8}
                >
                    <DropdownMenu.Item
                        className="flex items-center gap-2 
                            px-2.5 py-2 sm:py-2.5
                            text-sm sm:text-base
                            hover:bg-gray-100 dark:hover:bg-gray-700 
                            rounded-md cursor-pointer outline-none
                            transition-colors
                            select-none"
                        onClick={() => setTheme('light')}
                    >
                        <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>浅色</span>
                        {theme === 'light' && (
                            <span className="ml-auto text-blue-500 dark:text-blue-400">
                                <CheckIcon className="w-4 h-4" />
                            </span>
                        )}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="flex items-center gap-2 
                            px-2.5 py-2 sm:py-2.5
                            text-sm sm:text-base
                            hover:bg-gray-100 dark:hover:bg-gray-700 
                            rounded-md cursor-pointer outline-none
                            transition-colors
                            select-none"
                        onClick={() => setTheme('dark')}
                    >
                        <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>深色</span>
                        {theme === 'dark' && (
                            <span className="ml-auto text-blue-500 dark:text-blue-400">
                                <CheckIcon className="w-4 h-4" />
                            </span>
                        )}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="flex items-center gap-2 
                            px-2.5 py-2 sm:py-2.5
                            text-sm sm:text-base
                            hover:bg-gray-100 dark:hover:bg-gray-700 
                            rounded-md cursor-pointer outline-none
                            transition-colors
                            select-none"
                        onClick={() => setTheme('system')}
                    >
                        <DesktopIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>跟随系统</span>
                        {theme === 'system' && (
                            <span className="ml-auto text-blue-500 dark:text-blue-400">
                                <CheckIcon className="w-4 h-4" />
                            </span>
                        )}
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

// 添加 CheckIcon 组件
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
} 