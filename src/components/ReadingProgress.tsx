'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            // 获取文档高度
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            // 获取当前滚动位置
            const currentProgress = window.scrollY
            // 计算百分比
            const progressPercentage = (currentProgress / totalHeight) * 100
            setProgress(progressPercentage)
        }

        // 添加滚动事件监听
        window.addEventListener('scroll', updateProgress)
        // 初始化进度
        updateProgress()

        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
            <div
                className="h-full bg-blue-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
} 