'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // 等待组件挂载后再渲染，避免服务端渲染时的主题不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  // 添加初始主题检测
  useEffect(() => {
    // 检查系统主题
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // 监听系统主题变化
    const handleChange = () => {
      document.documentElement.classList.toggle('dark', mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // 初始化时设置主题
    handleChange();

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}
