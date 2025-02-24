'use client';
import 'normalize.css/normalize.css';
import { useEffect } from 'react';

import { ThemeProvider } from '@/components/ThemeProvider';

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('animate'); // 触发动画
            observer.unobserve(img); // 仅触发一次
          }
        });
      },
      { threshold: 0.1 }
    ); // 当元素 10% 进入视口时触发

    // 监听所有 lazy-img 元素
    document.querySelectorAll('.lazy-img').forEach((img) => {
      observer.observe(img);
    });
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
