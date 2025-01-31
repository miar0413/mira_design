'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY;
      const progressPercentage = Math.min(
        Math.round((currentProgress / totalHeight) * 100),
        100
      );

      // 只有当滚动超过 50px 时才显示进度条
      setIsVisible(currentProgress > 50);
      setProgress(progressPercentage);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 背景条 */}
      <div className="h-1 bg-gray-100/30 dark:bg-gray-800/30 backdrop-blur-sm" />

      {/* 进度条 */}
      <div
        className="absolute top-0 left-0 h-1 
                    bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500
                    dark:from-blue-400 dark:via-blue-500 dark:to-blue-400
                    transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow:
            progress > 0
              ? '0 0 8px rgba(59, 130, 246, 0.5), 0 0 3px rgba(59, 130, 246, 0.3)'
              : 'none',
        }}
      >
        {/* 光晕效果 */}
        <div
          className="absolute right-0 top-0 h-full w-20 
                        bg-gradient-to-r from-transparent to-white/20 dark:to-white/10"
          style={{
            opacity: progress > 5 ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      </div>
    </div>
  );
}
