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

    if (!mounted) {
        return (
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="w-4 h-4" />
            </button>
        )
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    {theme === 'light' && <SunIcon className="w-4 h-4" />}
                    {theme === 'dark' && <MoonIcon className="w-4 h-4" />}
                    {theme === 'system' && <DesktopIcon className="w-4 h-4" />}
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[8rem] rounded-lg p-1 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
                    align="end"
                >
                    <DropdownMenu.Item
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                        onClick={() => setTheme('light')}
                    >
                        <SunIcon className="w-4 h-4" />
                        <span>浅色</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                        onClick={() => setTheme('dark')}
                    >
                        <MoonIcon className="w-4 h-4" />
                        <span>深色</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                        onClick={() => setTheme('system')}
                    >
                        <DesktopIcon className="w-4 h-4" />
                        <span>系统</span>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
} 